"use client"

import { useState } from "react"
import { Camera, Upload, AlertTriangle, CheckCircle, Zap, Loader2, ArrowRight, DollarSign, TrendingDown } from "lucide-react"
import { aiDiagnosticAssistant, AiDiagnosticAssistantOutput } from "@/ai/flows/ai-diagnostic-assistant"
import { smartRecommendations, SmartRecommendationsOutput } from "@/ai/flows/smart-recommendations"
import { runSalesCloser, SalesCloserOutput } from "@/ai/flows/ai-sales-closer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"

export default function DiagnosePage() {
  const [file, setFile] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<AiDiagnosticAssistantOutput | null>(null)
  const [salesPitch, setSalesPitch] = useState<SalesCloserOutput | null>(null)
  const { toast } = useToast()

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
      toast({ title: "Error", description: "Please upload a photo first.", variant: "destructive" })
      return
    }

    setIsAnalyzing(true)
    try {
      const diagnosis = await aiDiagnosticAssistant({
        photoDataUris: [file],
        description: description || "Electrical issue photo for analysis."
      })
      setResults(diagnosis)

      const sales = await runSalesCloser({
        diagnosis: diagnosis.overallDiagnosis,
        urgency: diagnosis.urgencyLevel
      })
      setSalesPitch(sales)
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
        <p className="text-muted-foreground">Capture or upload an image of the electrical issue for an instant expert analysis.</p>
      </div>

      {!results ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-dashed border-2 bg-muted/20 flex flex-col items-center justify-center p-8 min-h-[300px] text-center">
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
            <Card>
              <CardHeader>
                <CardTitle>Describe symptoms</CardTitle>
                <CardDescription>Tell us more about what you&apos;re seeing, hearing, or smelling.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="e.g., I heard a buzzing sound and saw a small spark when plugging in my kettle."
                  className="min-h-[120px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button 
                  className="w-full mt-6 font-bold" 
                  size="lg"
                  disabled={!file || isAnalyzing}
                  onClick={startAnalysis}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Problem
                      <Zap className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Analysis Results */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-2xl">Diagnosis Report</CardTitle>
                  <CardDescription>Results generated by Dr. Electric AI</CardDescription>
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
                    <CardDescription className="text-black/70 font-bold">Recommended by AI Sales Advisor</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm font-black leading-tight">"{salesPitch.persuasiveHook}"</p>
                    <div className="space-y-2">
                       <p className="text-xs font-medium leading-relaxed">{salesPitch.riskAnalysis}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                       <div className="bg-black/10 p-2 rounded-lg">
                          <p className="text-[9px] font-black uppercase tracking-tighter opacity-60">Emergency Avoidance</p>
                          <p className="text-sm font-black">${salesPitch.roiModeling.immediateSavings.toLocaleString()}</p>
                       </div>
                       <div className="bg-black/10 p-2 rounded-lg">
                          <p className="text-[9px] font-black uppercase tracking-tighter opacity-60">Value Protection</p>
                          <p className="text-sm font-black">${salesPitch.roiModeling.longTermValue.toLocaleString()}</p>
                       </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-3">
                    <Link href={salesPitch.recommendedAction.type === 'Video Consult' ? '/video-consult' : '/products/smart-panels'} className="w-full">
                      <Button className="w-full h-12 font-black bg-black text-white hover:bg-black/90 rounded-xl">
                        {salesPitch.recommendedAction.type}: {salesPitch.recommendedAction.pricePoint}
                      </Button>
                    </Link>
                    <p className="text-[10px] text-center font-bold italic">"{salesPitch.closingStatement}"</p>
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
