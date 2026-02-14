
"use client"

import { useState } from "react"
import { Building2, ShieldCheck, ClipboardCheck, AlertTriangle, FileText, ChevronDown, CheckCircle2, Info, ArrowRight, Zap, Download, CreditCard, Lock, Factory, HardHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

const COMMERCIAL_CATEGORIES = [
  {
    id: "compliance",
    title: "OSHA 1910 Subpart S Compliance",
    points: 25,
    items: [
      "Access to electrical equipment (clearances per 1910.303)",
      "Marking of electrical disconnects and breakers",
      "Guarding of live parts (over 50V)",
      "Hazardous (classified) locations identification",
      "Lockout/Tagout (LOTO) procedures and hardware presence"
    ]
  },
  {
    id: "infrastructure",
    title: "Commercial Distribution & Switchgear",
    points: 20,
    items: [
      "Main switchgear thermal scan (signs of overheating)",
      "Grounding electrode system for high-voltage feed",
      "Phase balance testing on multi-phase systems",
      "Transformer vault ventilation and security",
      "Capacitor bank inspection and safety signs"
    ]
  },
  {
    id: "safety-systems",
    title: "Emergency & Life Safety Systems",
    points: 25,
    items: [
      "Emergency lighting battery backup functional test",
      "Exit sign visibility and illumination (NFPA 101)",
      "Fire alarm system power supply and dedicated circuits",
      "Generator transfer switch functionality (commercial grade)",
      "Emergency power-off (EPO) buttons for data rooms/kitchens"
    ]
  },
  {
    id: "load-management",
    title: "Equipment & Load Management",
    points: 30,
    items: [
      "Motor control center (MCC) inspection",
      "GFCI protection for required commercial outlets",
      "Surge protection for sensitive industrial electronics",
      "Power factor monitoring presence",
      "Branch circuit labeling for critical machinery"
    ]
  }
]

export default function CommercialAuditPage() {
  const [activeStep, setActiveStep] = useState<"intro" | "payment" | "form" | "report">("intro")
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const calculateScore = () => {
    const checkedCount = Object.values(checkedItems).filter(Boolean).length
    const totalItems = COMMERCIAL_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0)
    return Math.round((checkedCount / totalItems) * 100)
  }

  const processPayment = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsProcessing(false)
    toast({ title: "Payment Successful", description: "3-Pack Commercial Audit unlocked via Stripe Secure." })
    setActiveStep("form")
  }

  const generateReport = () => {
    setActiveStep("report")
    toast({ title: "Audit Complete", description: "Facility safety score and OSHA compliance report generated." })
  }

  const score = calculateScore()
  const status = score > 90 ? "Compliant" : score > 70 ? "Needs Improvement" : "High Risk"

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Professional AI Commercial Audit</h1>
        <p className="text-muted-foreground text-lg">Industrial-grade electrical safety and OSHA 1910 compliance for mission-critical facilities.</p>
      </div>

      {activeStep === "intro" && (
        <Card className="border-primary/20 bg-primary/5 overflow-hidden">
          <div className="bg-primary/10 px-6 py-3 border-b border-primary/20 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" />
              Enterprise Facility Protocol
            </span>
            <Badge variant="outline" className="border-primary text-primary text-[10px]">OSHA 1910 READY</Badge>
          </div>
          <CardHeader>
            <Factory className="w-16 h-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-black italic tracking-tighter">3-Audit Enterprise Pack</CardTitle>
            <CardDescription className="text-base">
              Establish a quarterly safety baseline. Our enterprise pack includes three full facility audits to ensure continuous compliance and risk mitigation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 bg-background/50 rounded-2xl border border-white/5">
                <HardHat className="w-6 h-6 text-primary shrink-0" />
                <div className="text-sm">
                  <p className="font-bold">NFPA 70E / OSHA Standards</p>
                  <p className="text-muted-foreground">Comprehensive coverage of commercial electrical safety requirements.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background/50 rounded-2xl border border-white/5">
                <Zap className="w-6 h-6 text-primary shrink-0" />
                <div className="text-sm">
                  <p className="font-bold">3 Full Audits Included</p>
                  <p className="text-muted-foreground">Certified digital reports for your liability insurance providers.</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-black text-white rounded-2xl border border-primary/40 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Enterprise Pack (3 Uses)</p>
                <p className="text-4xl font-black">$197.00</p>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <Badge className="bg-primary text-black font-black uppercase">Stripe Secure</Badge>
                <p className="text-[10px] opacity-60 italic">Tax-deductible business expense</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-16 text-xl font-black bg-primary text-black hover:bg-primary/90 rounded-2xl shadow-xl" onClick={() => setActiveStep("payment")}>
              Unlock Enterprise Pack
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeStep === "payment" && (
        <Card className="max-w-md mx-auto animate-in zoom-in-95 duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-black">
              <Lock className="w-6 h-6 text-primary" />
              Secure Payout
            </CardTitle>
            <CardDescription>Professional AI Commercial Audit Pack ($197.00)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="font-bold">3x Facility Compliance Audits</span>
              </div>
              <span className="font-black text-lg">$197.00</span>
            </div>
            <div className="p-4 border rounded-xl flex items-center gap-4 cursor-pointer hover:border-primary transition-all bg-primary/5 border-primary/20">
              <CreditCard className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <p className="font-bold text-sm">Stored Business Card ending in 8899</p>
                <p className="text-xs text-muted-foreground">Next Insurance • Powered by Stripe</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button className="w-full h-14 font-black text-lg" onClick={processPayment} disabled={isProcessing}>
              {isProcessing ? "Authorizing Stripe Transaction..." : "Pay $197.00 & Begin First Audit"}
            </Button>
            <Button variant="ghost" className="w-full font-bold opacity-60" onClick={() => setActiveStep("intro")}>Cancel</Button>
            <p className="text-[9px] text-muted-foreground text-center uppercase tracking-widest font-bold">256-bit Stripe encryption active</p>
          </CardFooter>
        </Card>
      )}

      {activeStep === "form" && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
          <Card className="sticky top-20 z-10 border-primary/40 bg-background/80 backdrop-blur-xl">
            <CardContent className="py-6 flex items-center gap-6">
               <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                    <span>Facility Compliance Progress</span>
                    <span className="text-primary">{Math.round((Object.keys(checkedItems).length / 20) * 100)}%</span>
                  </div>
                  <Progress value={(Object.keys(checkedItems).length / 20) * 100} className="h-3" />
               </div>
               <div className="hidden md:block text-right">
                  <p className="text-[10px] font-black uppercase opacity-60">Estimated Time</p>
                  <p className="text-lg font-black tracking-tighter">~12 MINS</p>
               </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {COMMERCIAL_CATEGORIES.map((category) => (
              <AccordionItem key={category.id} value={category.id} className="border border-white/5 rounded-2xl px-6 bg-card/50 overflow-hidden group">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-6 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl group-hover:scale-110 transition-transform">
                      {category.points}
                    </div>
                    <div>
                      <p className="text-xl font-black italic tracking-tight">{category.title}</p>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{category.items.length} Checkpoints</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8">
                  <div className="flex flex-col gap-3 pt-4">
                    {category.items.map((item, idx) => {
                      const isChecked = checkedItems[`${category.id}-${idx}`]
                      return (
                        <div 
                          key={idx} 
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${isChecked ? "border-primary/50 bg-primary/10" : "bg-background/40 hover:bg-muted/30"}`}
                          onClick={() => toggleItem(category.id, idx)}
                        >
                          <span className="text-sm font-medium leading-snug max-w-[85%]">{item}</span>
                          <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${isChecked ? "bg-primary border-primary text-black" : "border-white/10"}`}>
                            {isChecked && <CheckCircle2 className="w-5 h-5" />}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button className="w-full h-20 font-black text-2xl bg-primary text-black hover:bg-primary/90 rounded-[2rem] shadow-2xl" onClick={generateReport}>
            Certify Audit & Generate Report
            <FileText className="ml-3 w-8 h-8" />
          </Button>
        </div>
      )}

      {activeStep === "report" && (
        <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-8 duration-700">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-primary/20 orange-glow bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
                <div>
                  <CardTitle className="text-3xl font-black italic">Facility Safety Index</CardTitle>
                  <CardDescription className="text-base font-medium">OSHA Compliance Rating • NEC 2023</CardDescription>
                </div>
                <Badge variant={status === 'Compliant' ? 'default' : 'destructive'} className="uppercase px-6 py-2 text-[10px] font-black tracking-widest">
                  {status} STATUS
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-10 pt-10">
                <div className="flex flex-col items-center py-10 bg-primary/10 rounded-[3rem] border border-primary/30 relative overflow-hidden group">
                  <Zap className="absolute top-4 right-4 w-12 h-12 text-primary opacity-10 group-hover:rotate-12 transition-transform" />
                  <span className="text-9xl font-black tracking-tighter text-primary leading-none">{score}</span>
                  <span className="text-xs text-muted-foreground uppercase font-black tracking-[0.4em] mt-6">Compliance Score</span>
                </div>
                
                <div className="space-y-6">
                  <h4 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    Asset Category Breakdown
                  </h4>
                  <div className="grid grid-cols-1 gap-6">
                    {COMMERCIAL_CATEGORIES.map(cat => {
                      const catChecked = Object.keys(checkedItems).filter(k => k.startsWith(cat.id) && checkedItems[k]).length
                      const catTotal = cat.items.length
                      const catPercent = Math.round((catChecked / catTotal) * 100)
                      return (
                        <div key={cat.id} className="space-y-2">
                          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                            <span>{cat.title}</span>
                            <span className={catPercent > 85 ? "text-green-500" : catPercent > 60 ? "text-primary" : "text-destructive"}>
                              {catPercent}%
                            </span>
                          </div>
                          <Progress value={catPercent} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6">
              <Card className="bg-primary border-primary text-black">
                <CardHeader>
                  <CardTitle className="text-xl font-black italic">Strategic Action Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-2xl bg-black/10 border border-black/10 text-sm font-bold leading-relaxed">
                    {score < 100 
                      ? "Facility identified with critical OSHA 1910 violations. Immediate remediation of grounding and LOTO procedures required to avoid Tier 1 fines." 
                      : "Outstanding facility management. Maintain this level of compliance to qualify for premium insurance reductions."}
                  </div>
                  <Button className="w-full h-14 bg-black text-white hover:bg-black/90 font-black rounded-xl">Book Corporate Pro</Button>
                  <Button variant="outline" className="w-full h-14 border-black/20 font-black rounded-xl gap-2 hover:bg-black/5">
                    <Download className="w-5 h-5" />
                    Export compliance PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-black uppercase flex items-center gap-2 tracking-widest">
                    Enterprise Credits
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[11px] font-bold">
                  2 Audits Remaining in Pack
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="flex justify-center pt-8">
            <Button variant="ghost" className="font-bold opacity-50 hover:opacity-100" onClick={() => setActiveStep("intro")}>Run New Facility Audit</Button>
          </div>
        </div>
      )}
    </div>
  )
}
