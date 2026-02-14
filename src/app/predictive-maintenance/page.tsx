"use client"

import { useState } from "react"
import { ShieldAlert, Zap, BarChart3, TrendingDown, ArrowRight, Loader2, CheckCircle2, Info, Calculator, Flame, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { predictMaintenanceNeeds, PredictiveMaintenanceOutput } from "@/ai/flows/predictive-maintenance-flow"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const costData = [
  { year: "Year 1", reactive: 200, predictive: 240, gap: 40 },
  { year: "Year 2", reactive: 450, predictive: 240, gap: 210 },
  { year: "Year 3", reactive: 1500, predictive: 240, gap: 1260 },
  { year: "Year 4", reactive: 600, predictive: 240, gap: 360 },
  { year: "Year 5", reactive: 2500, predictive: 240, gap: 2260 },
]

export default function PredictiveMaintenancePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<PredictiveMaintenanceOutput | null>(null)
  const [systemAge, setSystemAge] = useState(15)
  const [homeValue, setHomeValue] = useState(450000)
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

  const calculatedRisk = (systemAge * 0.05 * (homeValue / 100000)).toFixed(2)

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 pb-16">
      <section className="text-center space-y-6 pt-8">
        <Badge variant="outline" className="border-primary text-primary px-6 py-1.5 uppercase tracking-widest text-xs font-black animate-pulse">
          Live Price Discovery Engine
        </Badge>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
          Stop Paying for <br/><span className="text-primary italic">Emergency Failures.</span>
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
          The average emergency Sunday service call costs <span className="text-foreground font-bold">$1,500</span>. Our AI predicts failure <span className="text-primary font-bold italic">6 months</span> before it happens.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cost Discovery Calculator */}
        <Card className="lg:col-span-2 border-primary/20 bg-card/50 backdrop-blur-xl orange-glow">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl font-black">
                <Calculator className="w-6 h-6 text-primary" />
                Downtime Cost Discovery
              </CardTitle>
              <CardDescription>NEC-compliant risk modeling for residential assets.</CardDescription>
            </div>
            <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-black">Annual Risk Index</p>
                <p className="text-2xl font-black text-primary">High</p>
            </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-12">
             <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={costData}>
                    <defs>
                      <linearGradient id="colorReactive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPredictive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.05} vertical={false} />
                    <XAxis dataKey="year" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      content={<ChartTooltipContent />}
                      contentStyle={{ backgroundColor: "#000", border: "1px solid #333", borderRadius: "12px" }}
                    />
                    <Area type="monotone" dataKey="reactive" name="Emergency Cost" stroke="#ff4d4d" fillOpacity={1} fill="url(#colorReactive)" strokeWidth={3} />
                    <Area type="monotone" dataKey="predictive" name="Predictive Plan" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorPredictive)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label className="font-black uppercase tracking-widest text-xs">System Age: {systemAge} Years</Label>
                    </div>
                    <Slider 
                        value={[systemAge]} 
                        onValueChange={(v) => setSystemAge(v[0])} 
                        max={60} 
                        step={1} 
                        className="py-4"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label className="font-black uppercase tracking-widest text-xs">Home Value: ${homeValue.toLocaleString()}</Label>
                    </div>
                    <Slider 
                        value={[homeValue]} 
                        onValueChange={(v) => setHomeValue(v[0])} 
                        min={100000}
                        max={2000000} 
                        step={10000} 
                        className="py-4"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col justify-center bg-primary/10 rounded-3xl p-8 border border-primary/20 relative overflow-hidden group">
                   <DollarSign className="absolute -right-4 -bottom-4 w-32 h-32 text-primary/5 group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Estimated 5-Year Avoidance</span>
                   <span className="text-5xl font-black text-primary tracking-tighter mt-1">$4,130.00</span>
                   <p className="text-[10px] text-primary/70 font-bold mt-4 flex items-center gap-1 uppercase">
                      <TrendingDown className="w-3 h-3" />
                      Calculated ROI: 12.4x
                   </p>
                </div>
             </div>
          </CardContent>
          <CardFooter className="bg-white/5 p-6 border-t border-white/5 flex items-center gap-4">
             <div className="p-2 rounded-full bg-red-500/10">
                <AlertTriangle className="w-4 h-4 text-red-500" />
             </div>
             <p className="text-xs font-medium text-muted-foreground">
                Your current configuration indicates a <span className="text-red-500 font-bold">{calculatedRisk}% probability</span> of high-impact insulator failure this year.
             </p>
          </CardFooter>
        </Card>

        {/* Discovery Action */}
        <div className="flex flex-col gap-6">
          <Card className="orange-glow border-primary bg-primary text-black">
            <CardHeader>
              <CardTitle className="text-2xl font-black tracking-tight">Run Risk Scan</CardTitle>
              <CardDescription className="text-black/70 font-medium">Use computer vision to find invisible hazards.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary"
                className="w-full h-16 font-black text-xl shadow-xl hover:scale-[1.02] transition-transform bg-black text-white hover:bg-black/90" 
                onClick={handlePredict}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? <Loader2 className="animate-spin w-8 h-8" /> : "Initiate AI Scan"}
              </Button>
            </CardContent>
            <CardFooter className="pt-0">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-70">
                 <ShieldAlert className="w-4 h-4" />
                 Zero-Cost Price Discovery
               </div>
            </CardFooter>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-tighter">The Cost of Inaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 text-red-500" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-sm font-bold">Fire Risk Prevention</p>
                    <p className="text-xs text-muted-foreground">Predictive monitoring stops 85% of arc-fault ignitions.</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-sm font-bold">Insurance Leverage</p>
                    <p className="text-xs text-muted-foreground">Proof of maintenance can lower premiums by up to 12%.</p>
                 </div>
              </div>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-[11px] leading-relaxed italic">
                 "If you think predictive maintenance is expensive, try an unplanned outage at 2:00 AM on a Sunday."
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 duration-700">
          <Card className="border-primary/40 glass-card">
            <CardHeader className="border-b border-white/5 pb-6">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-black">System Health Index</CardTitle>
                  <CardDescription>Visualized degradation profile.</CardDescription>
                </div>
                <span className="text-5xl font-black text-primary">{results.healthScore}%</span>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                      <span>Operational Efficiency</span>
                      <span className="text-primary">{results.healthScore}% Stable</span>
                  </div>
                  <Progress value={results.healthScore} className="h-4" />
              </div>
              <div className="mt-12 space-y-4">
                 <h4 className="font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
                   <Flame className="w-4 h-4 text-red-500" />
                   High-Probability Failure Points
                 </h4>
                 {results.predictedFailurePoints.map((point, i) => (
                   <div key={i} className="p-5 rounded-2xl border bg-card/50 flex items-center justify-between group hover:border-primary/30 transition-all">
                      <div className="space-y-1">
                        <p className="font-black text-lg">{point.component}</p>
                        <p className="text-xs text-muted-foreground font-medium">Predicted window: {point.timeframe}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <Badge variant={point.riskLevel === 'Critical' ? 'destructive' : 'default'} className="uppercase text-[9px] font-black px-3 py-0.5">
                          {point.riskLevel} Risk
                        </Badge>
                        <p className="text-2xl font-black text-primary tracking-tighter">{point.probability}%</p>
                      </div>
                   </div>
                 ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="border-b border-white/5 pb-6">
              <CardTitle className="text-2xl font-black">AI Prevention Roadmap</CardTitle>
              <CardDescription>Strategic steps to mitigate your {results.healthScore < 80 ? "critical risk" : "stable system"}.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
               <div className="grid grid-cols-1 gap-4">
                 {results.preventionPlan.map((step, i) => (
                   <div key={i} className="flex gap-4 p-5 rounded-2xl border bg-background/50 text-sm font-medium shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-black shrink-0">{i+1}</div>
                      <span className="leading-relaxed">{step}</span>
                   </div>
                 ))}
               </div>
               <div className="p-8 bg-black text-white rounded-[2rem] border border-primary/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
                 <Zap className="absolute top-4 right-4 w-12 h-12 text-primary opacity-10" />
                 <h3 className="text-2xl font-black italic leading-tight">"The cheapest insurance you'll ever buy is the one that prevents the claim."</h3>
                 <div className="space-y-4">
                    <Button className="w-full bg-primary text-black hover:bg-primary/90 font-black h-14 text-lg rounded-xl">Activate 24/7 Protection</Button>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Cancel anytime • $19.99/mo</p>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Trust & Sales Features */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-t border-white/5">
        <div className="flex flex-col items-center text-center gap-2">
            <span className="text-3xl font-black">12.4x</span>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Average ROI</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
            <span className="text-3xl font-black">15k+</span>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Active Monitors</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
            <span className="text-3xl font-black">85%</span>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Fire Risk Reduction</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
            <span className="text-3xl font-black">$3.4M</span>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Losses Avoided</span>
        </div>
      </section>
    </div>
  )
}
