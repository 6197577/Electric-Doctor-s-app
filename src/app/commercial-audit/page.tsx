
"use client"

import { useState } from "react"
import { Building2, ShieldCheck, ClipboardCheck, AlertTriangle, FileText, ChevronDown, CheckCircle2, Info, ArrowRight, Zap, Download, CreditCard, Lock, Factory, HardHat, Calculator, TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { collection, addDoc, serverTimestamp, query } from "firebase/firestore"
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const DOWNTIME_DATA = [
  { month: "M1", loss: 5000, plan: 1500 },
  { month: "M2", loss: 12000, plan: 1500 },
  { month: "M3", loss: 85000, plan: 1500 },
  { month: "M4", loss: 15000, plan: 1500 },
  { month: "M5", loss: 22000, plan: 1500 },
  { month: "M6", loss: 140000, plan: 1500 },
]

const chartConfig = {
  loss: {
    label: "Unplanned Loss ($)",
    color: "#ff4d4d",
  },
  plan: {
    label: "NFPA Compliance Plan",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const COMMERCIAL_CATEGORIES = [
  {
    id: "compliance",
    title: "NFPA 70E Safety Protocol",
    points: 25,
    items: [
      "Arc Flash Hazard Analysis & Labeling (NFPA 70E 130.5)",
      "Establishment of limited & restricted approach boundaries",
      "Verification of PPE categories for all active panels",
      "Hazardous (classified) locations identification",
      "Qualified person training records & LOTO hardware presence"
    ]
  },
  {
    id: "infrastructure",
    title: "NEC 2023 Switchgear Standards",
    points: 20,
    items: [
      "Main switchgear thermal scan (signs of overheating)",
      "Grounding electrode system for high-voltage feed",
      "NEC 2023 Article 230 Clearance Verification",
      "Transformer vault ventilation and security",
      "Capacitor bank inspection and safety signs"
    ]
  },
  {
    id: "safety-systems",
    title: "Life Safety & NFPA 101",
    points: 25,
    items: [
      "Emergency lighting battery backup functional test",
      "Exit sign visibility and illumination (NFPA 101)",
      "Fire alarm system power supply and dedicated circuits",
      "Generator transfer switch functionality (NFPA 110)",
      "Emergency power-off (EPO) buttons for data rooms/kitchens"
    ]
  },
  {
    id: "load-management",
    title: "Load Calculation (NEC Article 220)",
    points: 30,
    items: [
      "Motor control center (MCC) demand factor check",
      "Harmonic distortion analysis for industrial electronics",
      "Surge protection for sensitive industrial electronics",
      "Power factor monitoring presence",
      "Branch circuit labeling for critical machinery"
    ]
  }
]

const PRICING_TIERS = [
  { id: "single", name: "NFPA 70E Snapshot", price: 47, count: 1, desc: "Immediate risk assessment." },
  { id: "bundle", name: "Commercial 3-Pack", price: 97, count: 3, desc: "Quarterly NEC compliance.", popular: true },
  { id: "enterprise", name: "Industrial Fleet (10)", price: 197, count: 10, desc: "Full asset monitoring fleet." }
]

export default function CommercialAuditPage() {
  const { user } = useUser()
  const db = useFirestore()
  const [activeStep, setActiveStep] = useState<"discovery" | "intro" | "payment" | "form" | "report">("discovery")
  const [selectedTier, setSelectedTier] = useState(PRICING_TIERS[1])
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)
  
  const [hourlyRevenue, setHourlyRevenue] = useState(2500)
  const [systemAge, setSystemAge] = useState(20)
  
  const { toast } = useToast()

  const propsQuery = useMemoFirebase(() => {
    if (!user || !db) return null
    return query(collection(db, 'users', user.uid, 'properties'))
  }, [user, db])

  const { data: properties, loading: propsLoading } = useCollection(propsQuery)

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
    if (!selectedPropertyId) {
      toast({ title: "Property Required", description: "Select a facility to audit.", variant: "destructive" })
      return
    }
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsProcessing(false)
    toast({ title: "Payment Successful", description: `${selectedTier.name} unlocked via Stripe Secure.` })
    setActiveStep("form")
  }

  const generateReport = () => {
    const score = calculateScore()
    const status = score > 90 ? "NFPA COMPLIANT" : score > 70 ? "NEEDS REMEDIATION" : "HIGH RISK"

    if (user && db && selectedPropertyId) {
      const auditData = {
        date: format(new Date(), 'yyyy-MM-dd'),
        type: 'commercial',
        overallScore: score,
        status: status,
        checkedItems: checkedItems,
        createdAt: serverTimestamp()
      }
      const colRef = collection(db, 'users', user.uid, 'properties', selectedPropertyId, 'audits')
      addDoc(colRef, auditData).catch(async () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: auditData
        }));
      })
    }

    setActiveStep("report")
    toast({ title: "Audit Complete", description: "Facility safety score and NFPA 70E compliance report generated." })
  }

  const score = calculateScore()
  const status = score > 90 ? "NFPA COMPLIANT" : score > 70 ? "NEEDS REMEDIATION" : "HIGH RISK"

  const calculatedRisk = (systemAge * 0.08).toFixed(1)
  const estimatedAnnualLoss = (hourlyRevenue * 4.5 * (systemAge / 10)).toLocaleString()

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tighter uppercase">AI Commercial Compliance Engine</h1>
        <p className="text-muted-foreground text-lg italic">Certified NFPA 70E Risk Discovery & NEC 2023 Asset Auditing.</p>
      </div>

      {activeStep === "discovery" && (
        <div className="flex flex-col gap-12 animate-in fade-in duration-700">
          <section className="text-center space-y-4 pt-4">
            <Badge variant="outline" className="border-primary text-primary px-6 py-1.5 uppercase tracking-widest text-[10px] font-black animate-pulse">
              NFPA 70E Arc Flash Discovery
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
              Non-Compliance is <span className="text-primary italic">Catastrophic.</span><br />Prevention is Profitable.
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Failure to perform an <strong>NFPA 70E Arc Flash Analysis</strong> can result in <span className="text-red-500 font-bold">$13,000+ per day</span> in OSHA fines alone.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-primary/20 bg-card/50 backdrop-blur-xl orange-glow">
              <CardHeader className="border-b border-white/5 pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-2xl font-black">
                    <Calculator className="w-6 h-6 text-primary" />
                    Operational Risk Simulator
                  </CardTitle>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-black">NFPA 70E Hazard Index</p>
                    <Badge variant="destructive" className="font-black uppercase">{calculatedRisk}% Probability</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8 space-y-12">
                <div className="h-[300px] w-full">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <AreaChart data={DOWNTIME_DATA}>
                      <defs>
                        <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPlan" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.05} vertical={false} />
                      <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="loss" stroke="#ff4d4d" fillOpacity={1} fill="url(#colorLoss)" strokeWidth={3} />
                      <Area type="monotone" dataKey="plan" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorPlan)" strokeWidth={3} />
                    </AreaChart>
                  </ChartContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="font-black uppercase tracking-widest text-xs flex justify-between">
                        Hourly OpEx/Revenue <span>${hourlyRevenue.toLocaleString()}</span>
                      </Label>
                      <Slider value={[hourlyRevenue]} onValueChange={(v) => setHourlyRevenue(v[0])} min={500} max={50000} step={100} />
                    </div>
                    <div className="space-y-4">
                      <Label className="font-black uppercase tracking-widest text-xs flex justify-between">
                        Infrastructure Age <span>{systemAge} Years</span>
                      </Label>
                      <Slider value={[systemAge]} onValueChange={(v) => setSystemAge(v[0])} min={1} max={60} step={1} />
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-3xl p-8 border border-primary/20 flex flex-col justify-center relative overflow-hidden group">
                    <Activity className="absolute -right-4 -bottom-4 w-32 h-32 text-primary/5 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Est. Unplanned Downtime Loss</span>
                    <span className="text-5xl font-black text-primary tracking-tighter mt-1">${estimatedAnnualLoss}</span>
                    <p className="text-[10px] text-primary/70 font-bold mt-4 uppercase flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Compliance ROI: 42.1x
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-white/5 p-6 border-t border-white/5 flex items-center gap-4">
                <Flame className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                  Your profile indicates a <span className="text-red-500 font-bold">{calculatedRisk}% risk of Arc Flash or switchgear failure</span>. Immediate <strong>NFPA 70E Labeling</strong> recommended.
                </p>
              </CardFooter>
            </Card>

            <div className="flex flex-col gap-6">
              <Card className="bg-primary text-black orange-glow">
                <CardHeader>
                  <CardTitle className="text-2xl font-black tracking-tight italic">Secure Your Facility</CardTitle>
                  <CardDescription className="text-black/70 font-medium">Compliance certification for corporate facilities.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full h-16 bg-black text-white font-black text-xl rounded-2xl hover:bg-black/90 shadow-2xl transition-transform hover:scale-[1.02]" onClick={() => setActiveStep("intro")}>
                    Run Facility Audit
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
                    <ShieldCheck className="w-4 h-4" />
                    NFPA 70E & NEC 2023 READY
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest">Agency Standards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <HardHat className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold">NFPA 70E Compliance</p>
                      <p className="text-xs text-muted-foreground leading-tight">Legally required safety boundaries and PPE protocols for employees.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold">NEC 2023 Alignment</p>
                      <p className="text-xs text-muted-foreground leading-tight">Verify that all branch wiring and feeders meet the latest national codes.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-[11px] font-medium leading-relaxed italic">
                    "Predictive auditing reduces insurance liability premiums by an average of 18%."
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeStep === "intro" && (
        <div className="flex flex-col gap-8 animate-in slide-in-from-right-4 duration-500">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">1. Select Target Facility</label>
            <Select value={selectedPropertyId || ""} onValueChange={setSelectedPropertyId}>
              <SelectTrigger className="h-14 border-primary/30 bg-card">
                <SelectValue placeholder={propsLoading ? "Loading properties..." : "Pick a facility to audit"} />
              </SelectTrigger>
              <SelectContent>
                {properties && properties.length > 0 ? (
                  properties.filter((p:any) => p.propertyType !== 'Residential').map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>{p.nickname} ({p.address})</SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs italic">
                    No commercial facilities found. <Link href="/properties" className="text-primary underline">Add one first.</Link>
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier) => (
              <Card 
                key={tier.id} 
                className={`cursor-pointer transition-all border-2 relative overflow-hidden ${selectedTier.id === tier.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                onClick={() => setSelectedTier(tier)}
              >
                {tier.popular && (
                  <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-black font-black uppercase text-[10px]">Agency Preferred</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-black">{tier.name}</CardTitle>
                  <CardDescription className="text-xs">{tier.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-black text-primary">${tier.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/20 bg-primary/5 overflow-hidden">
            <div className="bg-primary/10 px-6 py-3 border-b border-primary/20 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" />
                Agency Compliance Protocol
              </span>
              <Badge variant="outline" className="border-primary text-primary text-[10px]">NFPA + NEC + OSHA</Badge>
            </div>
            <CardHeader>
              <Factory className="w-16 h-16 text-primary mb-4" />
              <CardTitle className="text-3xl font-black italic tracking-tighter">{selectedTier.name}</CardTitle>
              <CardDescription className="text-base">
                Professional grade facility mapping based on NFPA 70E boundaries and NEC 2023 wiring codes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 bg-background/50 rounded-2xl border border-white/5">
                  <HardHat className="w-6 h-6 text-primary shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold">NFPA 70E PPE Mapping</p>
                    <p className="text-muted-foreground">Certified mapping of required PPE for maintenance tasks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-background/50 rounded-2xl border border-white/5">
                  <Zap className="w-6 h-6 text-primary shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold">NEC Load Verification</p>
                    <p className="text-muted-foreground">Article 220 demand factor verification for industrial motors.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button variant="ghost" className="font-bold" onClick={() => setActiveStep("discovery")}>Back to Simulator</Button>
              <Button className="flex-1 h-16 text-xl font-black bg-primary text-black hover:bg-primary/90 rounded-2xl shadow-xl" onClick={() => setActiveStep("payment")} disabled={!selectedPropertyId}>
                Unlock {selectedTier.name}
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {activeStep === "payment" && (
        <Card className="max-w-md mx-auto animate-in zoom-in-95 duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-black">
              <Lock className="w-6 h-6 text-primary" />
              Secure Enterprise Payout
            </CardTitle>
            <CardDescription>{selectedTier.name} (${selectedTier.price}.00)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="font-bold">{selectedTier.name}</span>
              </div>
              <span className="font-black text-lg">${selectedTier.price}.00</span>
            </div>
            <div className="p-4 border rounded-xl flex items-center gap-4 bg-primary/5 border-primary/20">
              <CreditCard className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <p className="font-bold text-sm">Corporate Amex ending in 8899</p>
                <p className="text-xs text-muted-foreground">Stripe Secure B2B Gateway</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button className="w-full h-14 font-black text-lg" onClick={processPayment} disabled={isProcessing}>
              {isProcessing ? "Authorizing Stripe..." : `Pay $${selectedTier.price}.00 & Begin Audit`}
            </Button>
            <Button variant="ghost" className="w-full font-bold opacity-60" onClick={() => setActiveStep("intro")}>Cancel</Button>
          </CardFooter>
        </Card>
      )}

      {activeStep === "form" && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
          <Card className="sticky top-20 z-10 border-primary/40 bg-background/80 backdrop-blur-xl">
            <CardContent className="py-6 flex items-center gap-6">
               <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                    <span>Agency Compliance Progress</span>
                    <span className="text-primary">{Math.round((Object.keys(checkedItems).length / 20) * 100)}%</span>
                  </div>
                  <Progress value={(Object.keys(checkedItems).length / 20) * 100} className="h-3" />
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
            Certify NFPA & NEC Audit
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
                  <CardTitle className="text-3xl font-black italic">Agency Safety Index</CardTitle>
                  <CardDescription className="text-base font-medium">NFPA 70E & NEC 2023 Certified Rating</CardDescription>
                </div>
                <Badge variant={status === 'NFPA COMPLIANT' ? 'default' : 'destructive'} className="uppercase px-6 py-2 text-[10px] font-black tracking-widest">
                  {status}
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
                    Standard Category Breakdown
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
                  <CardTitle className="text-xl font-black italic">B2B Action Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-2xl bg-black/10 border border-black/10 text-sm font-bold leading-relaxed">
                    {score < 100 
                      ? "Facility identified with NFPA 70E Arc Flash violations. Immediate LOTO labeling and PPE boundary markers required." 
                      : "Outstanding facility management. Maintain NEC 2023 logging schedule."}
                  </div>
                  <Button className="w-full h-14 bg-black text-white hover:bg-black/90 font-black rounded-xl">Book Agency Pro</Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-black uppercase flex items-center gap-2 tracking-widest">
                    Standard Credits
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[11px] font-bold">
                  {selectedTier.count - 1} Audits Remaining in Pack
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="flex justify-center pt-8">
            <Button variant="ghost" className="font-bold opacity-50 hover:opacity-100" onClick={() => setActiveStep("discovery")}>Run New Agency Audit</Button>
          </div>
        </div>
      )}
    </div>
  )
}
