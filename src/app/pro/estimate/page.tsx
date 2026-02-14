"use client"

import { useState } from "react"
import { Calculator, ClipboardList, Zap, Loader2, Download, FileText, CheckCircle2, Info, MapPin, DollarSign, ShieldCheck } from "lucide-react"
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

export default function ProEstimatePage() {
  const [description, setDescription] = useState("")
  const [city, setCity] = useState("New York")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ElectricalEstimatorOutput | null>(null)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!description || description.length < 10) {
      toast({ title: "Details Required", description: "Please provide a more detailed job description.", variant: "destructive" })
      return
    }

    setIsAnalyzing(true)
    try {
      const estimate = await generateEstimate({
        jobDescription: description,
        city: city
      })
      setResults(estimate)
      toast({ title: "Estimate Generated", description: "AI has calculated your project breakdown." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate estimate. Please try again.", variant: "destructive" })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
           <Badge className="bg-primary text-black font-black uppercase tracking-widest text-[10px]">Pro Tools</Badge>
           <h1 className="text-3xl font-bold tracking-tight">AI Electrical Estimator</h1>
        </div>
        <p className="text-muted-foreground">Assist your field work with instant, NEC-compliant project estimates and material lists.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-primary/20 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
              <CardDescription>Describe the scope of work and location.</CardDescription>
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
              <div className="space-y-2">
                <Label htmlFor="desc">Job Description</Label>
                <Textarea 
                  id="desc" 
                  placeholder="e.g., Install a new 240V 50A circuit for an EV charger in a garage. Requires 40ft of conduit and 6/3 wire."
                  className="min-h-[200px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-[10px] text-muted-foreground italic">Tip: Be specific about distances and materials for more accurate results.</p>
              </div>
              <Button 
                className="w-full h-12 font-bold" 
                onClick={handleGenerate} 
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating Costs...</>
                ) : (
                  <><Zap className="mr-2 h-4 w-4" /> Generate AI Estimate</>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
             <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  Estimator Logic
                </CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our AI uses standard industry labor units and local labor multipliers for <b>{city}</b>. Materials are estimated based on current national averages.
                </p>
             </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {results ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="orange-glow border-primary/30">
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-[10px] uppercase text-muted-foreground">Total Estimate</CardTitle>
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
                    <CardTitle className="text-[10px] uppercase text-muted-foreground">Suggested Margin</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <p className="text-3xl font-black">{results.overheadAndProfit}%</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Bill of Materials & Labor</CardTitle>
                    <CardDescription>Detailed breakdown for your proposal.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" /> Export CSV
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
                        <TableCell className="font-black">Total Labor Cost ({results.laborBreakdown.hours}h @ {formatCurrency(results.laborBreakdown.rate)}/hr)</TableCell>
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
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      NEC Compliance References
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
                    <CardTitle className="text-sm font-black uppercase tracking-widest">Pro Field Notes</CardTitle>
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
            <Card className="h-full border-dashed border-2 flex flex-col items-center justify-center p-12 text-center opacity-50">
              <Calculator className="w-16 h-16 mb-4 text-muted-foreground" />
              <CardTitle>Awaiting Project Data</CardTitle>
              <CardDescription>Fill out the project details to the left to generate a professional estimate.</CardDescription>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
