"use client"

import { useState } from "react"
import { ShieldAlert, Zap, BarChart3, TrendingDown, ArrowRight, Loader2, CheckCircle2, Info, Calculator, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { predictMaintenanceNeeds, PredictiveMaintenanceOutput } from "@/ai/flows/predictive-maintenance-flow"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const costData = [
  { year: "Year 1", reactive: 200, predictive: 240 },
  { year: "Year 2", reactive: 450, predictive: 240 },
  { year: "Year 3", reactive: 1500, predictive: 240 },
  { year: "Year 4", reactive: 600, predictive: 240 },
  { year: "Year 5", reactive: 2500, predictive: 240 },
]

export default function PredictiveMaintenancePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<PredictiveMaintenanceOutput | null>(null)
  const [systemAge, setSystemAge] = useState(15)
  const { toast } = useToast()

  const handlePredict = async () => {
    setIsAnalyzing(true)
    try {
      const data = await predictMaintenanceNeeds({
        ageOfHome: systemAge,
        auditHistory: ["Panel age 15+ years", "Minor corrosion on ground wire"],
        generatorLogs: ["124 total hours", "Last oil change 6 months ago"],
        observedAnomalies: "Slight flicker when AC starts."
      })
      setResults(data)
      toast({ title: "Analysis Complete", description: "Your predictive health report is ready." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to run simulation. Please try again.", variant: "destructive" })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 pb-16">
      <section className="text-center space-y-4">
        <Badge variant="outline" className="border-primary text-primary px-4 py-1 uppercase tracking-tighter">AI-Driven Price Discovery</Badge>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Predictive Maintenance <br/><span className="text-primary">& Failure Prevention</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Avoid the $2,500 emergency failure. Our AI predicts electrical degradation before it leads to fire or total power loss.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cost Discovery Calculator */}
        <Card className="lg:col-span-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Reactive vs. Predictive Cost Discovery
            </CardTitle>
            <CardDescription>See how much you save over 5 years by preventing emergency failures.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
             <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                    <XAxis dataKey="year" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#000", border: "1px solid #333", borderRadius: "8px" }}
                      itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                    />
                    <Line type="monotone" dataKey="reactive" name="Emergency Repairs" stroke="#ff4d4d" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="predictive" name="Predictive Plan" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-background/50 rounded-2xl border">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="font-bold">System Age: {systemAge} Years</Label>
                    <Badge variant="secondary">{systemAge > 20 ? "High Risk" : "Normal"}</Badge>
                  </div>
                  <Slider 
                    value={[systemAge]} 
                    onValueChange={(v) => setSystemAge(v[0])} 
                    max={50} 
                    step={1} 
                  />
                  <p className="text-[10px] text-muted-foreground">Systems over 20 years old have a 4x higher probability of insulator degradation.</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 text-center">
                   <span className="text-xs uppercase font-black text-muted-foreground">Estimated 5-Year Savings</span>
                   <span className="text-4xl font-black text-primary">$3,420.00</span>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Discovery Action */}
        <div className="flex flex-col gap-6">
          <Card className="orange-glow border-primary">
            <CardHeader>
              <CardTitle className="text-lg">Run Discovery Scan</CardTitle>
              <CardDescription>AI will analyze your house data to predict imminent risks.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full h-14 font-black text-lg" 
                onClick={handlePredict}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? <Loader2 className="animate-spin w-6 h-6" /> : "Start Prediction Scan"}
              </Button>
            </CardContent>
            <CardFooter className="flex-col gap-2">
               <div className="flex items-center gap-2 text-xs text-muted-foreground">
                 <ShieldAlert className="w-3 h-3 text-primary" />
                 Prevents 85% of arc-fault fires
               </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Why $19.99/mo?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <p>Predictive maintenance isn't just code; it's a 24/7 safety net. We monitor your system's digital footprint to ensure you never face a blackout or hazard.</p>
              <div className="flex items-center gap-2 text-foreground font-bold">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                No Emergency Dispatch Fees
              </div>
              <div className="flex items-center gap-2 text-foreground font-bold">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Insurance Premium Discounts
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 duration-700">
          <Card className="border-primary/40">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>System Health Index</CardTitle>
                <span className="text-4xl font-black text-primary">{results.healthScore}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={results.healthScore} className="h-3" />
              <div className="mt-8 space-y-4">
                 <h4 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                   <Flame className="w-4 h-4 text-red-500" />
                   Predicted Failure Points
                 </h4>
                 {results.predictedFailurePoints.map((point, i) => (
                   <div key={i} className="p-4 rounded-xl border bg-card flex items-center justify-between">
                      <div>
                        <p className="font-bold">{point.component}</p>
                        <p className="text-xs text-muted-foreground">Expected within {point.timeframe}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={point.riskLevel === 'Critical' ? 'destructive' : 'default'} className="uppercase text-[10px]">
                          {point.riskLevel} Risk
                        </Badge>
                        <p className="text-lg font-black mt-1">{point.probability}%</p>
                      </div>
                   </div>
                 ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>AI Prevention Plan</CardTitle>
              <CardDescription>Immediate steps to stabilize the {results.healthScore < 80 ? "at-risk" : "stable"} system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 gap-3">
                 {results.preventionPlan.map((step, i) => (
                   <div key={i} className="flex gap-4 p-4 rounded-xl border bg-background text-sm">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">{i+1}</div>
                      <span>{step}</span>
                   </div>
                 ))}
               </div>
               <div className="p-6 bg-primary text-black rounded-2xl text-center space-y-4">
                 <h3 className="text-xl font-black italic">"Predictive maintenance is the cheapest insurance you'll ever buy."</h3>
                 <Button className="w-full bg-black text-white hover:bg-black/90 font-bold h-12">Activate Full Protection</Button>
               </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
