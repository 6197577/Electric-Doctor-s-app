"use client"

import { useState } from "react"
import { Calculator, ClipboardList, Zap, Loader2, Download, FileText, CheckCircle2, Info, MapPin, DollarSign, ShieldCheck, Upload, X, AlertTriangle, FileSearch } from "lucide-react"
import { generateEstimate, ElectricalEstimatorOutput } from "@/ai/flows/electrical-estimator-flow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TOP_50_CITIES_PRICING } from "@/lib/pricing-data"
import { formatCurrency } from "@/lib/pricing-engine"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

export default function ProEstimatePage() {
  const [description, setDescription] = useState("")
  const [city, setCity] = useState("New York")
  const [file, setFile] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ElectricalEstimatorOutput | null>(null)
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFile(reader.result as string)
      }
      reader.readAsDataURL(uploadedFile)
    }
  }

  const handleGenerate = async () => {
    if (!description || description.length < 10) {
      toast({ title: "Details Required", description: "Please provide a more detailed job description.", variant: "destructive" })
      return
    }

    setIsAnalyzing(true)
    try {
      const estimate = await generateEstimate({
        jobDescription: description,
        city: city,
        plansPhotoDataUri: file || undefined
      })
      setResults(estimate)
      toast({ title: "NEC Verification Complete", description: "AI has verified plans against NEC 2023 standards." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate estimate. Please try again.", variant: "destructive" })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
           <Badge className="bg-primary text-black font-black uppercase tracking-widest text-[10px]">NEC 2023 Guard</Badge>
           <h1 className="text-3xl font-bold tracking-tight">AI Plan Verifier & Estimator</h1>
        </div>
        <p className="text-muted-foreground">Upload blueprints for automated **NEC Article 220** load verification and material estimation.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-1 space-y-6">
          <Card className="border-primary/20 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Compliance Data</CardTitle>
              <CardDescription>Input description and site plans.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="city">Service City</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger id="city">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TOP_50_CITIES_PRICING.map((c) => (
                      <SelectItem key={c.city} value={c.city}>{c.city}, {c.state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Blueprints / Site Plans (Optional)</Label>
                {file ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-primary/20 bg-black">
                    <Image src={file} alt="Plan Preview" fill className="object-contain" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={() => setFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => document.getElementById('planInput')?.click()}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground text-center">Click to upload or drag blueprints</p>
                    <input id="planInput" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc">Job Description</Label>
                <Textarea 
                  id="desc" 
                  placeholder="e.g., Install a new 240V 50A circuit for an EV charger. Verify conduit fill per NEC Chapter 9."
                  className="min-h-[150px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button 
                className="w-full h-12 font-bold" 
                onClick={handleGenerate} 
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking NEC Codes...</>
                ) : (
                  <><Zap className="mr-2 h-4 w-4" /> Run Compliance Scan</>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
             <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  NEC 2023 Guard
                </CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  The AI automatically flags <strong>NEC Article 220</strong> violations and identifies incorrect symbols or wire gauges from your visual plans.
                </p>
             </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-3">
          {results ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Plan Verification Banner */}
              <Card className={`border-2 ${results.planVerification.loadVerified ? 'border-green-500/30 bg-green-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
                <CardContent className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${results.planVerification.loadVerified ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
                      <FileSearch className={`w-8 h-8 ${results.planVerification.loadVerified ? 'text-green-500' : 'text-amber-500'}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold italic tracking-tight">NEC Compliance Status</h3>
                      <p className="text-sm opacity-80">{results.planVerification.loadVerified ? 'Load calculations verified per NEC Article 220.' : 'Action required: NEC Article violations detected.'}</p>
                    </div>
                  </div>
                  <Badge variant={results.planVerification.loadVerified ? 'default' : 'secondary'} className="uppercase font-black px-6 py-2">
                    {results.planVerification.loadVerified ? 'CODE VERIFIED' : 'CODE CONFLICT'}
                  </Badge>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Discrepancies */}
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      NEC Code Conflicts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.planVerification.discrepanciesFound.length > 0 ? (
                      <ul className="space-y-2">
                        {results.planVerification.discrepanciesFound.map((d, i) => (
                          <li key={i} className="text-xs flex items-start gap-2">
                            <span className="text-red-500 font-black">•</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs italic text-muted-foreground">No NEC discrepancies found in site plans.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Safety Notes */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      Agency Safety Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      {results.planVerification.safetyNotes}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="orange-glow border-primary/30">
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-[10px] uppercase text-muted-foreground">Verified Estimate</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <p className="text-3xl font-black text-primary">{formatCurrency(results.totalEstimate)}</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-[10px] uppercase text-muted-foreground">Labor Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <p className="text-3xl font-black">{results.laborBreakdown.hours} hrs</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-[10px] uppercase text-muted-foreground">Agency Factor</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <p className="text-3xl font-black">{results.overheadAndProfit}%</p>
                  </CardContent>
                </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Bill of Materials (BOM)</CardTitle>
                    <CardDescription>Breakdown based on blueprints and scope.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" /> Export Proposal
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-bold text-[10px] uppercase tracking-widest">Description</TableHead>
                        <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right">Qty</TableHead>
                        <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right">Est. Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.materialBreakdown.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium text-xs">{item.item}</TableCell>
                          <TableCell className="text-right text-xs">{item.quantity} {item.unit}</TableCell>
                          <TableCell className="text-right text-xs font-bold">{formatCurrency(item.estimatedPrice)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-black">Labor ({results.laborBreakdown.hours}h @ {formatCurrency(results.laborBreakdown.rate)}/hr)</TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right font-black">{formatCurrency(results.laborBreakdown.totalLabor)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-primary" />
                      NEC 2023 References
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.necReferences.map((ref, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                          <span>{ref}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-muted/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest">Field Verification Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      {results.professionalNotes}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="h-full border-dashed border-2 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 grayscale hover:opacity-20 transition-opacity">
                <Image 
                  src="https://picsum.photos/seed/elec_hd12/1200/800" 
                  alt="Pro Training" 
                  fill 
                  className="object-cover" 
                  data-ai-hint="electrician tablet"
                />
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <FileSearch className="w-16 h-16 mb-4 text-muted-foreground" />
                <CardTitle>Agency Verification Pending</CardTitle>
                <CardDescription>Upload blueprints to trigger AI-driven **NEC 2023** compliance verification.</CardDescription>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
