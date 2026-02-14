"use client"

import { useState } from "react"
import { Sun, Upload, Camera, Loader2, Lightbulb, Zap, Info, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react"
import { analyzeLighting, AnalyzeLightingOutput } from "@/ai/flows/lighting-analyzer-flow"
import { detectOutages, DetectOutagesOutput } from "@/ai/flows/bulb-outage-detector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LightingToolPage() {
  const [file, setFile] = useState<string | null>(null)
  const [roomType, setRoomType] = useState("living-room")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [lightingResults, setLightingResults] = useState<AnalyzeLightingOutput | null>(null)
  const [outageResults, setOutageResults] = useState<DetectOutagesOutput | null>(null)
  const [activeTab, setActiveTab] = useState("lumens")
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
      if (activeTab === "lumens") {
        const analysis = await analyzeLighting({
          photoDataUri: file,
          roomType: roomType
        })
        setLightingResults(analysis)
        setOutageResults(null)
      } else {
        const outages = await detectOutages({
          photoDataUri: file
        })
        setOutageResults(outages)
        setLightingResults(null)
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
        <h1 className="text-3xl font-bold tracking-tight">Lighting & Outage Analyzer</h1>
        <p className="text-muted-foreground">Estimate lumens, color temperature, and detect bulb outages with AI.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lumens" className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Quality & Lumens
          </TabsTrigger>
          <TabsTrigger value="outages" className="flex items-center gap-2">
            <EyeOff className="w-4 h-4" />
            Outage Detector
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {(!lightingResults && !outageResults) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <Card className="border-dashed border-2 bg-muted/20 flex flex-col items-center justify-center p-8 min-h-[300px] text-center relative overflow-hidden">
            {file ? (
              <div className="relative w-full h-full min-h-[250px] rounded-lg overflow-hidden border border-primary/20">
                <Image src={file} alt="Preview" fill className="object-cover" />
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => setFile(null)}
                >
                  Change
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {activeTab === "lumens" ? <Sun className="w-8 h-8 text-primary" /> : <EyeOff className="w-8 h-8 text-primary" />}
                </div>
                <div>
                  <p className="font-semibold">{activeTab === "lumens" ? "Snap your light source" : "Snap your light fixture"}</p>
                  <p className="text-sm text-muted-foreground">Upload a photo for AI analysis</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => document.getElementById('fileInput')?.click()}>
                    <Upload className="w-4 h-4 mr-2" /> Upload
                  </Button>
                  <input id="fileInput" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
              </div>
            )}
          </Card>

          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{activeTab === "lumens" ? "Room Context" : "Outage Check"}</CardTitle>
              <CardDescription>
                {activeTab === "lumens" 
                  ? "Select the room type to help the AI evaluate lighting adequacy." 
                  : "AI will count bulbs and identify non-functioning ones."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {activeTab === "lumens" && (
                <Select value={roomType} onValueChange={setRoomType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kitchen">Kitchen (Task focus)</SelectItem>
                    <SelectItem value="living-room">Living Room (Ambient)</SelectItem>
                    <SelectItem value="office">Home Office (High concentration)</SelectItem>
                    <SelectItem value="bedroom">Bedroom (Relaxation)</SelectItem>
                    <SelectItem value="bathroom">Bathroom (Detail focus)</SelectItem>
                  </SelectContent>
                </Select>
              )}

              <Button 
                className="w-full font-bold" 
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
                    {activeTab === "lumens" ? "Analyze Lighting" : "Detect Outages"}
                    <Zap className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Lighting Results Display */}
          {lightingResults && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="orange-glow border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      Estimated Lumens
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center py-6">
                    <span className="text-5xl font-black tracking-tighter text-primary">
                      {lightingResults.estimatedLumens.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase mt-2">Total Output</span>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      Color Temperature
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center py-6">
                    <span className="text-5xl font-black tracking-tighter">
                      {lightingResults.colorTemperatureK}K
                    </span>
                    <Badge variant="secondary" className="mt-2">{lightingResults.colorCategory}</Badge>
                  </CardContent>
                </Card>

                <Card className={lightingResults.isAdequate ? "border-green-500/20" : "border-amber-500/20"}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      {lightingResults.isAdequate ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                      Room Adequacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center py-6">
                    <span className={`text-2xl font-bold ${lightingResults.isAdequate ? "text-green-500" : "text-amber-500"}`}>
                      {lightingResults.isAdequate ? "Adequate" : "Low Light"}
                    </span>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <p className="text-sm leading-relaxed">{lightingResults.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lightingResults.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex gap-3 p-3 rounded-lg border bg-card text-xs">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Outage Results Display */}
          {outageResults && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Bulb Health</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center py-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black tracking-tighter text-primary">{outageResults.workingBulbs}</span>
                      <span className="text-xl text-muted-foreground font-bold">/ {outageResults.totalBulbsFound}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase mt-2">Working Bulbs</span>
                  </CardContent>
                </Card>

                <Card className={outageResults.outageCount > 0 ? "border-destructive/30 bg-destructive/5" : "border-green-500/20"}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Outages Detected</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center py-6">
                    <span className={`text-5xl font-black tracking-tighter ${outageResults.outageCount > 0 ? "text-destructive" : "text-green-500"}`}>
                      {outageResults.outageCount}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase mt-2">Replace Soon</span>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Severity</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center py-6">
                    <Badge variant={outageResults.severity === 'hazardous' || outageResults.severity === 'significant' ? 'destructive' : 'default'} className="uppercase py-1 px-4">
                      {outageResults.severity}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Repair Guidance</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  {outageResults.outageLocations.length > 0 && (
                    <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                      <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        Detected Outage Locations
                      </h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {outageResults.outageLocations.map((loc, idx) => <li key={idx}>{loc}</li>)}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-bold text-sm mb-3">AI Recommendations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {outageResults.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex gap-3 p-3 rounded-lg border bg-card text-xs">
                          <Zap className="w-4 h-4 text-primary shrink-0" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <div className="flex justify-center mt-4 gap-4">
            <Button variant="ghost" onClick={() => { setLightingResults(null); setOutageResults(null); setFile(null); }}>
              Reset Analysis
            </Button>
            {outageResults && outageResults.outageCount > 0 && (
              <Button className="font-bold">Buy Replacement Bulbs</Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
