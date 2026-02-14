
"use client"

import { useState } from "react"
import { ShieldCheck, ClipboardCheck, AlertTriangle, FileText, ChevronDown, CheckCircle2, Info, ArrowRight, Zap, Download, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

const AUDIT_CATEGORIES = [
  {
    id: "service",
    title: "Service Entrance & Main Panel",
    points: 15,
    items: [
      "Service mast height and attachment (NEC 230.24)",
      "Main breaker sizing and rating matches feed",
      "Corrosion or arcing signs inside panel",
      "Correct labeling of all circuit breakers",
      "Dead front cover fit and hardware"
    ]
  },
  {
    id: "grounding",
    title: "Grounding & Bonding",
    points: 10,
    items: [
      "Main grounding electrode conductor connection",
      "Water pipe bonding presence and location",
      "Inter-system bonding bridge presence",
      "Ground rod location and depth"
    ]
  },
  {
    id: "protection",
    title: "GFCI & AFCI Protection",
    points: 20,
    items: [
      "Kitchen counter GFCI protection (NEC 210.8)",
      "Bathroom GFCI protection",
      "Outdoor receptacle protection and covers",
      "Bedroom AFCI protection presence",
      "Basement/Garage GFCI coverage"
    ]
  },
  {
    id: "wiring",
    title: "Branch Wiring & Devices",
    points: 25,
    items: [
      "No exposed bare wiring in living areas",
      "Junction box covers present throughout",
      "Receptacle polarity and ground testing",
      "Knob-and-tube or aluminum wiring identification",
      "Proper support of cables in attic/crawlspace"
    ]
  },
  {
    id: "safety",
    title: "Safety Devices",
    points: 30,
    items: [
      "Smoke detector placement and age",
      "CO detector presence near sleeping areas",
      "System-wide surge protection presence",
      "Emergency disconnect accessibility"
    ]
  }
]

export default function AuditPage() {
  const [activeStep, setActiveStep] = useState<"intro" | "payment" | "form" | "report">("intro")
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const calculateScore = () => {
    const totalPointsPossible = AUDIT_CATEGORIES.reduce((acc, cat) => acc + cat.points, 0)
    const checkedCount = Object.values(checkedItems).filter(Boolean).length
    const totalItems = AUDIT_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0)
    return Math.round((checkedCount / totalItems) * 100)
  }

  const processPayment = () => {
    toast({ title: "Payment Successful", description: "Standard Residential Audit unlocked for $47.93." })
    setActiveStep("form")
  }

  const generateReport = () => {
    setActiveStep("report")
    toast({ title: "Audit Complete", description: "Your safety score and report have been generated." })
  }

  const score = calculateScore()
  const status = score > 85 ? "Safe" : score > 60 ? "Caution" : "Hazardous"

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">100-Point Electrical Audit</h1>
        <p className="text-muted-foreground">Professional safety assessment based on the National Electrical Code (NEC).</p>
      </div>

      {activeStep === "intro" && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <ShieldCheck className="w-12 h-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Professional Residential Audit</CardTitle>
            <CardDescription>
              Comprehensive safety assessment for single-family homes. Unlock the full 100-point checklist today.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold">NEC Standards</p>
                  <p className="text-muted-foreground">Derived from modern electrical codes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-card rounded-lg border">
                <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold">Professional Report</p>
                  <p className="text-muted-foreground">Get a downloadable PDF for insurance or sales.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-background/50 rounded-xl border border-primary/20 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Single Use Price</p>
                <p className="text-3xl font-black text-primary">$47.93</p>
              </div>
              <Badge variant="outline" className="text-primary border-primary">Best Value</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full font-bold" size="lg" onClick={() => setActiveStep("payment")}>
              Unlock Audit Checklist
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeStep === "payment" && (
        <Card className="animate-in fade-in zoom-in-95 duration-300">
          <CardHeader>
            <CardTitle>Secure Checkout</CardTitle>
            <CardDescription>Confirm your residential audit purchase.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium">1x Residential 100-Point Audit</span>
              </div>
              <span className="font-bold">$47.93</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg flex items-center gap-4 cursor-pointer hover:border-primary transition-colors bg-primary/5">
                <CreditCard className="w-6 h-6 text-primary" />
                <div className="flex-1">
                  <p className="font-bold text-sm">Stored Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/26</p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button className="w-full h-12 font-bold" onClick={processPayment}>
              Pay $47.93 & Begin
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setActiveStep("intro")}>Cancel</Button>
          </CardFooter>
        </Card>
      )}

      {activeStep === "form" && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
          <Card className="sticky top-20 z-10 border-primary/40 bg-background/80 backdrop-blur">
            <CardContent className="py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold">Overall Progress</span>
                <span className="text-sm font-bold text-primary">{Math.round((Object.keys(checkedItems).length / 22) * 100)}%</span>
              </div>
              <Progress value={(Object.keys(checkedItems).length / 22) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {AUDIT_CATEGORIES.map((category) => (
              <AccordionItem key={category.id} value={category.id} className="border rounded-xl px-6 bg-card">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {category.points}
                    </div>
                    <div>
                      <p className="font-bold">{category.title}</p>
                      <p className="text-xs text-muted-foreground">{category.items.length} Checkpoints</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="flex flex-col gap-3 pt-2">
                    {category.items.map((item, idx) => {
                      const isChecked = checkedItems[`${category.id}-${idx}`]
                      return (
                        <div 
                          key={idx} 
                          className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${isChecked ? "border-primary/50 bg-primary/5" : "hover:bg-muted/50"}`}
                          onClick={() => toggleItem(category.id, idx)}
                        >
                          <span className="text-sm pr-4">{item}</span>
                          <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${isChecked ? "bg-primary border-primary text-black" : "border-muted-foreground/30"}`}>
                            {isChecked && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button className="w-full h-14 font-bold text-lg" onClick={generateReport}>
            Complete Audit & Generate Report
            <FileText className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}

      {activeStep === "report" && (
        <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-8 duration-700">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 border-primary/20 orange-glow">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Safety Report Summary</CardTitle>
                  <CardDescription>Based on NEC Standards Audit</CardDescription>
                </div>
                <Badge variant={status === 'Safe' ? 'default' : status === 'Caution' ? 'secondary' : 'destructive'} className="uppercase px-4">
                  {status} STATUS
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-8">
                <div className="flex flex-col items-center py-6 bg-muted/20 rounded-2xl border">
                  <span className="text-7xl font-black tracking-tighter text-primary">{score}</span>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-2">Overall Safety Index</span>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    Category Breakdown
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {AUDIT_CATEGORIES.map(cat => {
                      const catChecked = Object.keys(checkedItems).filter(k => k.startsWith(cat.id) && checkedItems[k]).length
                      const catTotal = cat.items.length
                      const catPercent = Math.round((catChecked / catTotal) * 100)
                      return (
                        <div key={cat.id} className="space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span>{cat.title}</span>
                            <span className={catPercent > 80 ? "text-green-500" : catPercent > 50 ? "text-amber-500" : "text-destructive"}>
                              {catPercent}%
                            </span>
                          </div>
                          <Progress value={catPercent} className="h-1.5" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-sm">Action Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-card border text-xs leading-relaxed">
                    {score < 100 ? "Your home has some non-compliant areas. We recommend prioritizing GFCI protection and Panel labeling for immediate safety gains." : "Excellent work! Your home meets all checked NEC standards."}
                  </div>
                  <Button className="w-full font-bold">Book Fixes</Button>
                  <Button variant="outline" className="w-full gap-2 font-bold">
                    <Download className="w-4 h-4" />
                    PDF Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-sm text-red-500 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Hazards Found
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[10px] text-muted-foreground">
                  {score < 70 ? "Critical issues detected. Do not attempt complex repairs yourself." : "No critical life-safety hazards detected during this check."}
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="flex justify-center">
            <Button variant="ghost" onClick={() => setActiveStep("intro")}>Start New Audit</Button>
          </div>
        </div>
      )}
    </div>
  )
}
