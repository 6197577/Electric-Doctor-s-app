"use client"

import { useState } from "react"
import { Video, ShieldCheck, Zap, ArrowRight, Lock, CreditCard, MessageSquare, AlertCircle, Clock, Star, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export default function VideoConsultPage() {
  const [step, setStep] = useState<"intro" | "payment" | "waiting" | "call">("intro")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const startPayment = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsProcessing(false)
    toast({ title: "Payment Secure", description: "Connecting to the next available Master Electrician." })
    setStep("waiting")
    
    // Auto-advance to call after 3 seconds of "waiting"
    setTimeout(() => {
      setStep("call")
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Emergency Video Doctor</h1>
        <p className="text-muted-foreground">Talk to a Master Electrician in seconds for immediate safety guidance and DIY troubleshooting.</p>
      </div>

      {step === "intro" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-black tracking-tight uppercase">Instant Video Consult</CardTitle>
              <CardDescription>
                High-definition video support for urgent electrical issues.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm font-medium italic leading-relaxed">"90% of household electrical emergencies can be stabilized safely via video before a pro arrives."</p>
              </div>
              <div className="p-4 bg-background/50 rounded-xl border border-primary/20 flex items-center justify-between mt-4">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Consultation Fee</p>
                  <p className="text-3xl font-black text-primary">$49.00</p>
                </div>
                <Badge variant="outline" className="border-primary text-primary">STRIPE SECURE</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full h-12 font-bold" onClick={() => setStep("payment")}>
                Start Emergency Consult
                <Zap className="ml-2 w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Why Video Consult?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Average Wait Time: &lt; 2 Minutes</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Master Electricians Only (15+ yrs exp)</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">100% Credit towards on-site repair</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://picsum.photos/seed/doc1/100/100" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">Marcus Chen</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Master Electrician • On Call</p>
                  </div>
                  <Badge className="ml-auto bg-green-500 text-black font-black text-[10px]">AVAILABLE</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "I'll help you stabilize your panel and walk you through immediate safety steps before we dispatch a truck."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === "payment" && (
        <Card className="max-w-md mx-auto animate-in zoom-in-95 duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Stripe Secure Checkout
            </CardTitle>
            <CardDescription>Emergency Video Consultation ($49.00)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg flex justify-between items-center font-bold">
              <span>Emergency Session</span>
              <span>$49.00</span>
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
            <Button className="w-full h-12 font-bold" onClick={startPayment} disabled={isProcessing}>
              {isProcessing ? "Processing via Stripe..." : "Confirm & Connect Now"}
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setStep("intro")}>Cancel</Button>
          </CardFooter>
        </Card>
      )}

      {step === "waiting" && (
        <Card className="max-w-md mx-auto py-12 text-center animate-in fade-in duration-500">
          <CardContent className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <Video className="w-8 h-8 text-primary absolute inset-0 m-auto" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl">Connecting to Expert...</CardTitle>
              <CardDescription>Matching you with Marcus Chen (Master Electrician)</CardDescription>
            </div>
            <div className="w-full max-w-[200px] flex flex-col gap-2">
              <Progress value={65} className="h-2" />
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Signal Strength: Excellent</p>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "call" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-700">
          <Card className="lg:col-span-2 aspect-video bg-black relative overflow-hidden border-primary/30 orange-glow">
            {/* Main Video View - Placeholder */}
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/elec_p1/1200/800')] bg-cover bg-center opacity-80" />
            
            {/* Self View */}
            <div className="absolute top-4 right-4 w-32 aspect-video bg-muted rounded-lg border border-white/20 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/user_p/400/300')] bg-cover bg-center" />
            </div>

            {/* HUD / Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-primary">
                  <AvatarImage src="https://picsum.photos/seed/elec_p1/100/100" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-white">Marcus Chen (Master)</p>
                  <p className="text-[10px] text-primary font-black uppercase">LIVE • 02:45</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="destructive" size="icon" className="rounded-full h-12 w-12" onClick={() => setStep("intro")}>
                  <PhoneCall className="w-6 h-6 rotate-[135deg]" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                  <MessageSquare className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Safety Checklist</CardTitle>
                <CardDescription>Live guidance from Marcus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-medium line-through opacity-50">
                  <Badge className="bg-green-500 text-black">DONE</Badge>
                  <span>Identify Main Disconnect</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium">
                  <Badge variant="outline">PENDING</Badge>
                  <span>Check for burning smell</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium">
                  <Badge variant="outline">PENDING</Badge>
                  <span>Photograph Panel Labels</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/10 border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-primary">Emergency Tip</CardTitle>
              </CardHeader>
              <CardContent className="text-xs leading-relaxed font-medium">
                "If you see smoke, do not touch any switches. I'm initiating the dispatch for a local team right now while we stay on the line."
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
