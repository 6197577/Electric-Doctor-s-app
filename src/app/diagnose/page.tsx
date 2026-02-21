
"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, Upload, AlertTriangle, CheckCircle, Zap, Loader2, ArrowRight, DollarSign, TrendingDown, Building2, Mic, MicOff, Video, X, Play } from "lucide-react"
import { aiDiagnosticAssistant, AiDiagnosticAssistantOutput } from "@/ai/flows/ai-diagnostic-assistant"
import { runSalesCloser, SalesCloserOutput } from "@/ai/flows/ai-sales-closer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import { collection, addDoc, serverTimestamp, query } from "firebase/firestore"
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function DiagnosePage() {
  const { user } = useUser()
  const db = useFirestore()
  const [file, setFile] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<AiDiagnosticAssistantOutput | null>(null)
  const [salesPitch, setSalesPitch] = useState<SalesCloserOutput | null>(null)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const [hasAVPermission, setHasAVPermission] = useState<boolean | null>(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const { toast } = useToast()

  const propsQuery = useMemoFirebase(() => {
    if (!user || !db) return null
    return query(collection(db, 'users', user.uid, 'properties'))
  }, [user, db])

  const { data: properties, loading: propsLoading } = useCollection(propsQuery)

  useEffect(() => {
    if (activeTab === "live" && !results) {
      startLiveStream()
    } else {
      stopLiveStream()
    }
    return () => stopLiveStream()
  }, [activeTab, results])

  const startLiveStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasAVPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Audio analysis for symptoms
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      const updateAudioLevel = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average);
        requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();

    } catch (error) {
      console.error('Error accessing hardware:', error);
      setHasAVPermission(false);
      toast({
        variant: 'destructive',
        title: 'Hardware Access Denied',
        description: 'Please enable camera and microphone permissions to use the live diagnostic tool.',
      });
    }
  };

  const stopLiveStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      const dataUri = canvas.toDataURL('image/jpeg');
      setFile(dataUri);
      setActiveTab("upload");
      toast({ title: "Frame Captured", description: "Analyzing live visual and audio metadata." });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFile(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const startAnalysis = async () => {
    if (!file) {
      toast({ title: "Error", description: "Please upload or capture a photo first.", variant: "destructive" })
      return
    }

    setIsAnalyzing(true)
    try {
      const diagnosis = await aiDiagnosticAssistant({
        photoDataUris: [file],
        description: description || "Electrical issue audio-visual analysis."
      })
      setResults(diagnosis)

      const sales = await runSalesCloser({
        diagnosis: diagnosis.overallDiagnosis,
        urgency: diagnosis.urgencyLevel
      })
      setSalesPitch(sales)

      if (user && db && selectedPropertyId) {
        const diagData = {
          diagnosis: diagnosis.overallDiagnosis,
          urgency: diagnosis.urgencyLevel,
          description: description,
          findings: diagnosis.identifiedParts,
          recommendations: diagnosis.safetyRecommendations,
          createdAt: serverTimestamp()
        }
        const colRef = collection(db, 'users', user.uid, 'properties', selectedPropertyId, 'diagnoses')
        addDoc(colRef, diagData).catch(async () => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: colRef.path,
            operation: 'create',
            requestResourceData: diagData
          }));
        })
      }
    } catch (error) {
      toast({ title: "Error", description: "Analysis failed. Please try again.", variant: "destructive" })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Diagnostic Assistant</h1>
        <p className="text-muted-foreground">Live audio-visual evaluation of electrical symptoms and potential malfunctions.</p>
      </div>

      {!results ? (
        <div className="flex flex-col gap-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="upload" className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Photo/Video
              </TabsTrigger>
              <TabsTrigger value="live" className="gap-2">
                <Video className="w-4 h-4" />
                Live Diagnostic Scan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-dashed border-2 bg-muted/20 flex flex-col items-center justify-center p-8 min-h-[300px] text-center relative overflow-hidden">
                  {file ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-primary/20">
                      <Image src={file} alt="Preview" fill className="object-cover" />
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={() => setFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Take a photo or upload</p>
                        <p className="text-sm text-muted-foreground">Supports JPG, PNG, and MP4</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => document.getElementById('fileInput')?.click()}>
                          <Upload className="w-4 h-4 mr-2" /> Upload
                        </Button>
                        <input id="fileInput" type="file" className="hidden" accept="image/*,video/*" onChange={handleFileUpload} />
                      </div>
                    </div>
                  )}
                </Card>

                <div className="flex flex-col gap-4">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs uppercase tracking-widest text-primary font-black">Target Asset</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select value={selectedPropertyId || ""} onValueChange={setSelectedPropertyId}>
                        <SelectTrigger className="bg-background border-primary/20">
                          <SelectValue placeholder={propsLoading ? "Loading properties..." : "Tie to a property..."} />
                        </SelectTrigger>
                        <SelectContent>
                          {properties && properties.length > 0 ? (
                            properties.map((p: any) => (
                              <SelectItem key={p.id} value={p.id}>{p.nickname}</SelectItem>
                            ))
                          ) : (
                            <div className="p-4 text-center text-xs italic">
                              No properties found. <Link href="/properties" className="text-primary underline">Add one.</Link>
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Describe symptoms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea 
                        placeholder="e.g., I hear a buzzing sound near the panel..."
                        className="min-h-[100px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <Button 
                        className="w-full font-bold h-12" 
                        disabled={!file || isAnalyzing}
                        onClick={startAnalysis}
                      >
                        {isAnalyzing ? <Loader2 className="animate-spin" /> : <><Zap className="w-4 h-4 mr-2" /> Analyze Symptoms</>}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="live" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black relative overflow-hidden aspect-video border-primary/30 orange-glow">
                  <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Overlay */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-red-500 text-white font-black animate-pulse">LIVE EVALUATION</Badge>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      <Mic className={`w-3.5 h-3.5 ${audioLevel > 20 ? 'text-primary' : 'text-white'}`} />
                      <div className="flex gap-0.5 h-3 items-center">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div 
                            key={i} 
                            className="w-1 bg-primary rounded-full transition-all duration-75" 
                            style={{ height: `${Math.min(100, (audioLevel / 50) * 100 * (i/5))}%` }}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-white uppercase">Acoustic Detect</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <Button 
                      size="lg" 
                      className="h-16 w-16 rounded-full bg-primary text-black border-4 border-black hover:scale-110 transition-transform"
                      onClick={captureFrame}
                    >
                      <Camera className="w-8 h-8" />
                    </Button>
                  </div>
                </Card>

                <div className="flex flex-col gap-6">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <Mic className="w-4 h-4 text-primary" />
                        Listening for Malfunctions
                      </CardTitle>
                      <CardDescription className="text-xs">
                        The AI is monitoring for the acoustic frequency of arcing, buzzing, and crackling wires.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="p-4 bg-background/50 rounded-xl border border-white/5 space-y-3">
                          <p className="text-xs font-medium italic opacity-70">"Hold your device near the area showing symptoms. Capture a frame when the symptom is visible or audible."</p>
                          <Progress value={(audioLevel / 100) * 100} className="h-1 bg-muted" />
                       </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Safety Protocol</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {[
                          "Do not touch exposed wiring",
                          "Keep distance from sparking components",
                          "Prepare to disconnect main power"
                        ].map((tip, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-medium">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-2xl">Diagnosis Report</CardTitle>
                  <CardDescription>Audio-Visual results generated by Dr. Electric AI</CardDescription>
                </div>
                <Badge 
                  variant={results.urgencyLevel === 'critical' || results.urgencyLevel === 'high' ? 'destructive' : 'default'}
                  className="uppercase px-4"
                >
                  {results.urgencyLevel} Urgency
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                  <h4 className="font-bold flex items-center gap-2 mb-2 text-primary">
                    <CheckCircle className="w-4 h-4" />
                    Overall Diagnosis
                  </h4>
                  <p className="text-sm leading-relaxed">{results.overallDiagnosis}</p>
                </div>

                <div>
                  <h4 className="font-bold mb-3 uppercase tracking-widest text-[10px] text-muted-foreground">Identified Faults</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {results.identifiedParts.map((part, idx) => (
                      <div key={idx} className="flex flex-col p-3 rounded-lg border border-border bg-background/50">
                        <span className="font-bold text-sm">{part.partName}</span>
                        <span className="text-xs text-primary font-medium">{part.condition}</span>
                        {part.location && <span className="text-[10px] text-muted-foreground italic mt-1">{part.location}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2 uppercase tracking-widest text-[10px] text-muted-foreground">Technical Breakdown</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {results.explanation}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6">
              {salesPitch && (
                <Card className="border-primary bg-primary text-black orange-glow relative overflow-hidden">
                  <Zap className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
                  <CardHeader>
                    <CardTitle className="text-xl font-black italic">Next Critical Step</CardTitle>
                    <CardDescription className="text-black/70 font-bold">AI Mitigation Advisor</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm font-black leading-tight">"{salesPitch.persuasiveHook}"</p>
                    <div className="space-y-2">
                       <p className="text-xs font-medium leading-relaxed">{salesPitch.riskAnalysis}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-3">
                    <Link href={salesPitch.recommendedAction.type === 'Video Consult' ? '/video-consult' : '/products/smart-panels'} className="w-full">
                      <Button className="w-full h-12 font-black bg-black text-white hover:bg-black/90 rounded-xl">
                        {salesPitch.recommendedAction.type}: {salesPitch.recommendedAction.pricePoint}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )}

              <Card className="bg-red-500/10 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-500 flex items-center gap-2 font-black uppercase text-sm">
                    <AlertTriangle className="w-5 h-5" />
                    Safety Protocol
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 text-xs flex flex-col gap-3 font-medium">
                    {results.safetyRecommendations.map((rec, idx) => (
                      <li key={idx} className="leading-snug">{rec}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="flex justify-center mt-4">
            <Button variant="ghost" onClick={() => { setResults(null); setSalesPitch(null); setFile(null); }}>
              Start New Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
