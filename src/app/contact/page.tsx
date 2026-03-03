
"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, MessageSquare, Zap, Clock, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    toast({
      title: "Message Transmitted",
      description: "Our support dispatch team has received your inquiry.",
    })
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 py-12 pb-24">
      <div className="flex flex-col gap-4 max-w-2xl">
        <Badge variant="outline" className="w-fit border-primary text-primary px-4 py-1 uppercase tracking-widest text-[10px] font-black">Support Hub</Badge>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
          How can we <span className="text-primary italic">help?</span>
        </h1>
        <p className="text-muted-foreground text-xl leading-relaxed font-medium">
          Whether you're facing a critical emergency or need guidance on your Smart Panel upgrade, our team is standing by.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-xl">
            <form onSubmit={handleSubmit}>
              <CardHeader className="border-b border-white/5 pb-8">
                <CardTitle className="text-2xl font-black italic flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Direct Inquiry
                </CardTitle>
                <CardDescription>Send a detailed message to our technical support team.</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required className="bg-background/50 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required className="bg-background/50 border-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="e.g. Smart Panel Installation Inquiry" required className="bg-background/50 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we assist you today?" 
                    className="min-h-[150px] bg-background/50 border-white/10" 
                    required 
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-white/5 p-8 border-t border-white/5">
                <Button className="w-full h-14 font-black text-lg bg-primary text-black hover:bg-primary/90 rounded-xl shadow-xl" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Transmit Message <ArrowRight className="ml-2 w-5 h-5" /></>}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          {/* Emergency Box */}
          <Card className="bg-red-500 text-white border-red-600 shadow-2xl relative overflow-hidden group">
            <Zap className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
            <CardHeader>
              <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-5 h-5" /> Emergency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-bold text-lg leading-tight">If you see smoke or active sparking, disconnect main power and call us immediately.</p>
              <div className="p-4 bg-black/20 rounded-2xl border border-white/10">
                <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-1">Emergency Dispatch</p>
                <p className="text-2xl font-black">304-410-9208</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="bg-card/50 border-white/5">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-widest">Office HQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-sm font-bold">New York City</p>
                  <p className="text-xs text-muted-foreground">One World Trade Center, Suite 85, NY 10007</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-sm font-bold">Email Support</p>
                  <p className="text-xs text-muted-foreground">support@emergencyelectricrepair.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-sm font-bold">Response Time</p>
                  <p className="text-xs text-muted-foreground">AI Diagnosis: Instant<br/>Human Support: &lt; 4 Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust Badge */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">NEC Certified</p>
                  <p className="text-[10px] text-muted-foreground italic leading-tight">All support technicians are licensed Master Electricians.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
