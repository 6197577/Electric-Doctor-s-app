"use client"

import { useState } from "react"
import { ShieldCheck, Zap, BarChart3, AppWindow, Cpu, CheckCircle2, ArrowRight, Loader2, DollarSign, Activity, Settings, Power } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

const PANEL_FEATURES = [
  {
    title: "App-Based Control",
    desc: "Turn off any circuit in your home from anywhere in the world.",
    icon: AppWindow
  },
  {
    title: "Real-Time Monitoring",
    desc: "See exactly how much money each appliance is costing you in real-time.",
    icon: Activity
  },
  {
    title: "Automated Load Shedding",
    desc: "Automatically manage EV charging to prevent main breaker trips.",
    icon: Cpu
  },
  {
    title: "Predictive Safety",
    desc: "Built-in AI detects arc faults and loose connections before they cause fires.",
    icon: ShieldCheck
  }
]

export default function SmartPanelsPage() {
  const [isOrdering, setIsOrdering] = useState(false)
  const { toast } = useToast()

  const handleOrder = async () => {
    setIsOrdering(true)
    // Simulate Stripe Checkout for a high-ticket item
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsOrdering(false)
    toast({
      title: "Redirecting to Stripe",
      description: "Opening secure checkout for your Smart Panel upgrade.",
    })
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-card p-12 md:p-20 border border-primary/20 orange-glow flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 relative z-10">
          <Badge variant="outline" className="border-primary text-primary px-6 py-1.5 uppercase tracking-widest text-[10px] font-black bg-primary/5">
            The Future of Home Power
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
            The Last Panel <br/><span className="text-primary italic">You'll Ever Buy.</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-xl font-medium leading-relaxed">
            Upgrade to an AI-powered Smart Panel. Stop guessing about your energy use and start controlling your home with precision.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="h-16 px-10 font-black text-lg bg-primary text-black hover:bg-primary/90 rounded-2xl" onClick={handleOrder}>
              Buy Now — From $2,499
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 font-black text-lg border-primary/30 text-primary hover:bg-primary/10 rounded-2xl">
              Compare Models
            </Button>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="w-full aspect-square bg-muted/20 rounded-[2rem] border-2 border-primary/20 flex items-center justify-center relative overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/panel1/800/800" 
              alt="Smart Electrical Panel" 
              fill 
              className="object-cover opacity-80"
              data-ai-hint="smart electrical panel"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
               <div className="space-y-1">
                 <p className="text-xs font-black uppercase text-primary tracking-widest">Model X-1 Pro</p>
                 <p className="text-2xl font-black text-white">Digital Core</p>
               </div>
               <Badge className="bg-green-500 text-black font-black uppercase">In Stock</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PANEL_FEATURES.map((feature, i) => (
          <Card key={i} className="bg-card/30 backdrop-blur-sm border-white/5 hover:border-primary/40 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-black tracking-tight">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {feature.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* ROI Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-primary/5 rounded-[3rem] p-12 border border-primary/20">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Energy Independence <span className="text-primary italic">Starts Here.</span></h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The Smart Panel pays for itself. By optimizing your energy usage and identifying "vampire loads," the average homeowner saves <strong>$450/year</strong> on utility bills.
          </p>
          <div className="space-y-4">
             <div className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="p-3 rounded-full bg-green-500/10">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-bold">Utility Rebate Eligible</p>
                  <p className="text-xs text-muted-foreground">Qualifies for Federal & State electrification tax credits.</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="p-3 rounded-full bg-primary/10">
                  <Power className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold">EV Ready</p>
                  <p className="text-xs text-muted-foreground">Dynamic load balancing for up to 2 Level-2 chargers.</p>
                </div>
             </div>
          </div>
        </div>
        <Card className="bg-black/80 border-primary/20 p-8 shadow-2xl relative overflow-hidden group">
           <BarChart3 className="absolute -right-8 -bottom-8 w-64 h-64 text-primary/5 group-hover:scale-110 transition-transform" />
           <CardHeader className="p-0 mb-8">
             <CardTitle className="text-3xl font-black tracking-tight">Technical Specs</CardTitle>
           </CardHeader>
           <CardContent className="p-0 space-y-6">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-muted-foreground font-bold">Main Breaker</span>
                <span className="font-black text-primary">200A (Standard)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-muted-foreground font-bold">Smart Slots</span>
                <span className="font-black">Up to 48 Channels</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-muted-foreground font-bold">Connectivity</span>
                <span className="font-black">WiFi, Ethernet, Cell</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-muted-foreground font-bold">Safety Compliance</span>
                <span className="font-black">UL 67 / NEC 2023</span>
              </div>
              <div className="pt-8">
                <Button className="w-full h-14 font-black bg-white text-black hover:bg-white/90 rounded-xl" onClick={handleOrder} disabled={isOrdering}>
                  {isOrdering ? <Loader2 className="animate-spin" /> : "Secure My Unit"}
                </Button>
              </div>
           </CardContent>
        </Card>
      </section>

      {/* Trust & Payouts */}
      <section className="text-center py-12 space-y-4">
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Verified Installation Network</p>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto italic">
          "Buying the Smart Panel was the best decision for our EV transition. We didn't have to upgrade our service to 400A because the panel manages the load automatically."
        </p>
        <div className="flex justify-center gap-8 pt-8">
           <ShieldCheck className="w-12 h-12 text-primary opacity-50" />
           <Settings className="w-12 h-12 text-primary opacity-50" />
           <Zap className="w-12 h-12 text-primary opacity-50" />
        </div>
      </section>
    </div>
  )
}
