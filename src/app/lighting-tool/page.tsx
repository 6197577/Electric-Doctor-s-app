"use client"

import { useState } from "react"
import { Sun, Upload, Camera, Loader2, Lightbulb, Zap, Info, CheckCircle2, AlertCircle } from "lucide-react"
import { analyzeLighting, AnalyzeLightingOutput } from "@/ai/flows/lighting-analyzer-flow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LightingToolPage() {
  const [file, setFile] = useState<string | null>(null)
  const [roomType, setRoomType] = useState("living-room")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalyzeLightingOutput | null>(null)
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
      toast({ title: "Error", description: "Please upload a photo of your lighting.", variant: "destructive" })
      return
    }

    setIsAnalyzing(true)
    try {
      const analysis = await analyzeLighting({
        photoDataUri: file,
        roomType: roomType
      })
      setResults(analysis)
    } catch (error) {
      toast({ title: "Error", description: "Lighting analysis failed. Please try again.", variant: "destructive" })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Lighting Analyzer</h1>
        <p className="text-muted-foreground">Discover the lumens and color temperature of your home lighting with AI.</p>
      </div>

      {!results ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <Sun className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Snap your light source</p>
                  <p className="text-sm text-muted-foreground">Point your camera at the bulb or room</p>
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
              <CardTitle>Room Context</CardTitle>
              <CardDescription>Select the room type to help the AI evaluate lighting adequacy.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
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

              <Button 
                className="w-full font-bold" 
                size="lg"
                disabled={!file || isAnalyzing}
                onClick={startAnalysis}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating Lumens...
                  </>
                ) : (
                  <>
                    Analyze Lighting
                    <Sun className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Lumens Card */}
            <Card className="orange-glow border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Estimated Lumens
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-6">
                <span className="text-5xl font-black tracking-tighter text-primary">
                  {results.estimatedLumens.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground uppercase mt-2">Total Output</span>
              </CardContent>
            </Card>

            {/* Color Temp Card */}
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Color Temperature
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-6">
                <span className="text-5xl font-black tracking-tighter">
                  {results.colorTemperatureK}K
                </span>
                <Badge variant="secondary" className="mt-2">{results.colorCategory}</Badge>
              </CardContent>
            </Card>

            {/* Adequacy Card */}
            <Card className={results.isAdequate ? "border-green-500/20" : "border-amber-500/20"}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {results.isAdequate ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                  Room Adequacy
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-6">
                <span className={`text-2xl font-bold ${results.isAdequate ? "text-green-500" : "text-amber-500"}`}>
                  {results.isAdequate ? "Adequate" : "Low Light"}
                </span>
                <span className="text-[10px] text-muted-foreground text-center mt-2 px-4 italic leading-tight">
                  For a {roomType.replace('-', ' ')} setting.
                </span>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
              <CardDescription>AI insight into your lighting environment</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="p-4 bg-muted/30 rounded-lg border">
                <h4 className="font-bold text-sm mb-2">Lighting Summary</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{results.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-3">Improvement Roadmap</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex gap-3 p-3 rounded-lg border bg-card text-xs">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-primary">{idx + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-primary/5 p-3 rounded-md border border-primary/10">
                <Info className="w-3 h-3 text-primary" />
                <span>Note: This is an AI estimation based on visual data. For critical applications, use a calibrated lux meter.</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-4">
            <Button variant="ghost" onClick={() => { setResults(null); setFile(null); }}>
              New Measurement
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
