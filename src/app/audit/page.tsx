
"use client"

import { useState } from "react"
import { ShieldCheck, ClipboardCheck, AlertTriangle, FileText, ChevronDown, CheckCircle2, Info, ArrowRight, Zap, Download, CreditCard, Lock, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { collection, addDoc, serverTimestamp, query } from "firebase/firestore"
import { useFirestore, useUser, useCollection } from "@/firebase"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

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

const PRICING_TIERS = [
  { id: "single", name: "Single Audit", price: 47, count: 1, desc: "Perfect for a quick safety check." },
  { id: "bundle", name: "Value 3-Pack", price: 97, count: 3, desc: "Best for seasonal monitoring.", popular: true },
  { id: "enterprise", name: "10-Audit Pack", price: 197, count: 10, desc: "Professional asset management." }
]

export default function AuditPage() {
  const { user } = useUser()
  const db = useFirestore()
  const [activeStep, setActiveStep] = useState<"intro" | "payment" | "form" | "report">("intro")
  const [selectedTier, setSelectedTier] = useState(PRICING_TIERS[1])
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)
  const { toast } = useToast()

  const propsQuery = user && db ? query(collection(db, 'users', user.uid, 'properties')) : null
  const { data: properties, loading: propsLoading } = useCollection(propsQuery)

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const calculateScore = () => {
    const checkedCount = Object.values(checkedItems).filter(Boolean).length
    const totalItems = AUDIT_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0)
    return Math.round((checkedCount / totalItems) * 100)
  }

  const processPayment = async () => {
    if (!selectedPropertyId) {
      toast({ title: "Property Required", description: "Please select an asset to audit.", variant: "destructive" })
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
    const status = score > 85 ? "Safe" : score > 60 ? "Caution" : "Hazardous"

    // Persist to Firestore nested under property
    if (user && db && selectedPropertyId) {
      const auditData = {
        date: format(new Date(), 'yyyy-MM-dd'),
        type: 'residential',
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
    toast({ title: "Audit Complete", description: "Your safety score and report have been generated." })
  }

  const score = calculateScore()
  const status = score > 85 ? "Safe" : score > 60 ? "Caution" : "Hazardous"

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Professional Residential Audit</h1>
        <p className="text-muted-foreground">Comprehensive safety assessment based on the National Electrical Code (NEC).</p>
      </div>

      {activeStep === "intro" && (
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">1. Select Target Asset</label>
            <Select value={selectedPropertyId || ""} onValueChange={setSelectedPropertyId}>
              <SelectTrigger className="h-14 border-primary/30 bg-card">
                <SelectValue placeholder={propsLoading ? "Loading properties..." : "Pick a property to audit"} />
              </SelectTrigger>
              <SelectContent>
                {properties && properties.length > 0 ? (
                  properties.filter((p:any) => p.propertyType === 'Residential').map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>{p.nickname} ({p.address})</SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs italic">
                    No residential properties found. <Link href="/properties" className="text-primary underline">Add one first.</Link>
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
                  <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-black font-bold">BEST VALUE</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-black text-primary">${tier.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <ShieldCheck className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-2xl">Audit Professional Protocol</CardTitle>
              <CardDescription>
                Get {selectedTier.count} professional-grade {selectedTier.count > 1 ? 'audits' : 'audit'} starting at ${selectedTier.price}.
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
                    <p className="font-bold">{selectedTier.count} Audit Access</p>
                    <p className="text-muted-foreground">Transferable across properties.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold" size="lg" onClick={() => setActiveStep("payment")} disabled={!selectedPropertyId}>
                Unlock {selectedTier.name}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {activeStep === "payment" && (
        <Card className="animate-in fade-in zoom-in-95 duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Stripe Secure Checkout
            </CardTitle>
            <CardDescription>Confirm your {selectedTier.name} purchase (${selectedTier.price}.00).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium">{selectedTier.name}</span>
              </div>
              <span className="font-bold">${selectedTier.price}.00</span>
            </div>
            <div className="p-4 border rounded-lg flex items-center gap-4 bg-primary/5 border-primary/20">
              <CreditCard className="w-6 h-6 text-primary" />
              <div className="flex-1">
                <p className="font-bold text-sm">Stored Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/26</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button className="w-full h-12 font-bold" onClick={processPayment} disabled={isProcessing}>
              {isProcessing ? "Processing Stripe Payment..." : `Pay $${selectedTier.price}.00 & Begin Audit`}
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
                    {score < 100 ? "Your home has some non-compliant areas. We recommend prioritizing GFCI protection for immediate safety gains." : "Excellent work! Your home meets all checked NEC standards."}
                  </div>
                  <Button className="w-full font-bold">Book Fixes</Button>
                  <Button variant="outline" className="w-full gap-2 font-bold">
                    <Download className="w-4 h-4" />
                    PDF Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Pack Credits</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-[10px] text-muted-foreground uppercase font-black">{selectedTier.count - 1} Audits Remaining</p>
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
