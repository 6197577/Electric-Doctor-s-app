"use client"

import { useState } from "react"
import { Zap, Camera, Upload, CheckCircle2, AlertTriangle, FileText, ArrowRight, Loader2, CreditCard, Lock, BatteryCharging } from "lucide-react"
import { calculateLoadCapacity, LoadCalculationOutput } from "@/ai/flows/load-calculation-flow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

const APPLIANCES = [
  "Electric Range/Oven",
  "Electric Clothes Dryer",
  "Central Air Conditioning",
  "Electric Water Heater",
  "Hot Tub/Spa",
  "Electric Heat/Furnace",
  "Pool Pump",
  "Secondary Fridge/Freezer"
]

export default function EVReadinessPage() {
  const [step, setStep] = useState<"intro" | "payment" | "inputs" | "results">("intro")
  const [file, setFile] = useState<string | null>(null)
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([])
  const [targetUpgrade, setTargetUpgrade] = useState("Level 2 EV Charger")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<LoadCalculationOutput | null>(null)
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setFile(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const toggleAppliance = (app: string) => {
    setSelectedAppliances(prev => 
      prev.includes(app) ? prev.filter(a => a !== app) : [...prev, app]
    )
  }

  const handleStartAnalysis = async () => {
    if (!file) {
      toast({ title: "Photo Required", description: "Please upload a clear photo of your electrical panel.", variant: "destructive" })
      return
    }
    setIsAnalyzing(true)
    try {
      const data = await calculateLoadCapacity({
        panelPhotoDataUri: file,
        appliances: selectedAppliances,
        targetUpgrade: targetUpgrade
      })
      setResults(data)
      setStep("results")
      toast({ title: "Analysis Complete", description: "Your capacity report is ready." })
    } catch (error) {
      toast({ title: "Error", description: "Could not complete calculation. Please try again.", variant: "destructive" })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">EV & Electrification Readiness</h1>
        <p className="text-muted-foreground">AI load calculation to see if your panel can handle an EV charger or Heat Pump.</p>
      </div>

      {step === "intro" && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <BatteryCharging className="w-12 h-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Digital Load Calculation Report</CardTitle>
            <CardDescription>
              Don't pay $150 for an on-site visit. Get a professional NEC-based load calculation for a fraction of the cost.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <p className="text-sm font-medium">NEC Article 220 Compliant</p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <p className="text-sm font-medium">Ready for Permits</p>
              </div>
            </div>
            <div className="p-4 bg-background/50 rounded-xl border border-primary/20 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase">One-Time Report Fee</p>
                <p className="text-3xl font-black text-primary">$29.99</p>
              </div>
              <Badge variant="outline" className="border-primary text-primary">STRIPE SECURE</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-12 font-bold" onClick={() => setStep("payment")}>
              Unlock Capacity Tool
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === "payment" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Stripe Secure Checkout
            </CardTitle>
            <CardDescription>Confirm your Load Calculation Report purchase ($29.99).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg flex justify-between items-center font-bold">
              <span>1x Capacity Report</span>
              <span>$29.99</span>
            </div>
            <div className="p-4 border rounded-lg flex items-center gap-4 bg-primary/5 border-primary/30">
              <CreditCard className="w-6 h-6 text-primary" />
              <div className="flex-1">
                <p className="font-bold text-sm">Stored Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/26</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button className="w-full h-12 font-bold" onClick={() => setStep("inputs")}>Pay & Start Analysis</Button>
            <p className="text-[10px] text-muted-foreground text-center italic">Payments processed via Stripe. Instant access granted.</p>
          </CardFooter>
        </Card>
      )}

      {step === "inputs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
          <Card className="border-dashed border-2 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
            {file ? (
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
                <Image src={file} alt="Panel" fill className="object-cover" />
                <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => setFile(null)}>Remove</Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Camera className="w-12 h-12 text-primary" />
                <p className="font-bold">Snap Electrical Panel</p>
                <p className="text-xs text-muted-foreground">Ensure labels and main breaker are clear.</p>
                <Button variant="outline" onClick={() => document.getElementById('panelInput')?.click()}>
                  <Upload className="w-4 h-4 mr-2" /> Upload Photo
                </Button>
                <input id="panelInput" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              </div>
            )}
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Home Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Major Appliances</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {APPLIANCES.map(app => (
                      <div key={app} className="flex items-center space-x-2">
                        <Checkbox id={app} checked={selectedAppliances.includes(app)} onCheckedChange={() => toggleAppliance(app)} />
                        <label htmlFor={app} className="text-sm font-medium leading-none cursor-pointer">{app}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">Target Upgrade</Label>
                  <Input id="target" value={targetUpgrade} onChange={e => setTargetUpgrade(e.target.value)} placeholder="e.g. 48A EV Charger" />
                </div>
                <Button className="w-full h-12 font-bold" disabled={isAnalyzing || !file} onClick={handleStartAnalysis}>
                  {isAnalyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating Load...</> : "Generate Capacity Report"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === "results" && results && (
        <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-8 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="orange-glow border-primary/30">
              <CardHeader className="pb-2 text-center">
                <CardTitle className="text-xs uppercase text-muted-foreground">Panel Size</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-4">
                <p className="text-5xl font-black text-primary">{results.estimatedPanelSize}A</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardHeader className="pb-2 text-center">
                <CardTitle className="text-xs uppercase text-muted-foreground">Remaining Capacity</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-4">
                <p className="text-5xl font-black">{results.remainingCapacity}A</p>
              </CardContent>
            </Card>
            <Card className={results.isReadyForUpgrade ? "border-green-500/30 bg-green-500/5" : "border-destructive/30 bg-destructive/5"}>
              <CardHeader className="pb-2 text-center">
                <CardTitle className="text-xs uppercase text-muted-foreground">Ready for {targetUpgrade}?</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-4">
                <p className={`text-3xl font-black ${results.isReadyForUpgrade ? "text-green-500" : "text-destructive"}`}>
                  {results.isReadyForUpgrade ? "YES" : "NO"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Professional Capacity Analysis</CardTitle>
                <CardDescription>Based on NEC Demand Factors & Computer Vision Analysis</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" /> Download PDF
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/30 rounded-lg border font-mono text-sm leading-relaxed">
                {results.technicalBreakdown}
              </div>
              <div className="space-y-4">
                <h4 className="font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  AI Recommendations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg border bg-card text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-primary/5 p-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm">Next Step: Verification</p>
                  <p className="text-xs text-muted-foreground">Hand this report to a licensed pro for final permit approval.</p>
                </div>
              </div>
              <Button className="font-bold px-8">Find Electrician Now</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
