
"use client"

import { useState, useEffect } from "react"
import { MapPin, MessageSquare, Phone, Clock, ShieldCheck, ChevronRight, Zap, FileSearch, Navigation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

/**
 * @fileOverview Live Dispatch Tracking Page.
 * Supports Google Maps API for real-time geolocation of professionals.
 */

export default function TrackingPage() {
  const [eta, setEta] = useState(12)
  const [progress, setProgress] = useState(65)
  const [mapsLoaded, setMapsLoaded] = useState(false)

  // Simulation for production logic
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => Math.max(2, prev - 1))
      setProgress(prev => Math.min(95, prev + 2))
    }, 15000)
    
    // Check if Google Maps is available
    if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      setMapsLoaded(true)
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-primary text-black font-bold">LIVE DISPATCH</Badge>
          <h1 className="text-3xl font-bold">Track Your Electrician</h1>
        </div>
        <Badge variant="outline" className="border-primary/30 text-primary text-[10px] uppercase tracking-widest px-4">
          Status: Alex is en route
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <Card className="lg:col-span-2 min-h-[450px] relative overflow-hidden bg-muted border-border group">
          {/* Real Map Integration Point */}
          {mapsLoaded ? (
            <div className="absolute inset-0 bg-muted-foreground/10 flex items-center justify-center">
               <p className="text-xs font-bold text-muted-foreground">Google Maps Layer Initialized...</p>
            </div>
          ) : (
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map_nyc/1200/800')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
          )}
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
             <div className="relative">
                <div className="w-16 h-16 rounded-full bg-primary/20 animate-ping absolute inset-0" />
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center relative border-4 border-black shadow-2xl">
                   <Navigation className="w-8 h-8 text-black fill-black" />
                </div>
             </div>
             <div className="bg-black/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-primary/30 text-center shadow-2xl">
                <p className="text-primary font-black italic">PRO IN MOTION</p>
                <p className="text-[10px] text-muted-foreground uppercase font-black">Alex Rivera • Master #9921</p>
             </div>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6 flex gap-3">
             <Card className="flex-1 glass-card p-4 flex items-center gap-4 border-white/5 shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                   <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-black">Est. Arrival</p>
                  <p className="font-black text-2xl tracking-tighter text-primary">{eta}m</p>
                </div>
             </Card>
             <Card className="flex-1 glass-card p-4 flex items-center gap-4 border-white/5 shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                   <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-black">AI Report</p>
                  <p className="font-black text-lg">Delivered</p>
                </div>
             </Card>
          </div>
        </Card>

        {/* Electrician & Contact */}
        <div className="flex flex-col gap-6">
          <Card className="border-primary/20 bg-primary/5 relative overflow-hidden">
            <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-primary opacity-5" />
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-primary/30">
                  <AvatarImage src="https://picsum.photos/seed/elec_p1/100/100" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-black italic">Alex Rivera</CardTitle>
                  <CardDescription className="flex items-center text-[10px] font-bold uppercase tracking-widest text-primary">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Verified Master Pro
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
               <div className="p-4 rounded-xl bg-background/80 border border-white/5 text-[11px] leading-relaxed italic shadow-inner">
                  "I've analyzed your 5 uploaded photos. It's a standard neutral-wire arc fault. I have the replacement breaker in the truck. See you in {eta} minutes."
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                   <span>Distance Completed</span>
                   <span className="text-primary">{progress}%</span>
                 </div>
                 <Progress value={progress} className="h-3 rounded-full" />
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                 <Button className="h-12 font-black gap-2 bg-primary text-black hover:bg-primary/90 rounded-xl">
                   <MessageSquare className="w-4 h-4" />
                   Chat
                 </Button>
                 <Button variant="outline" className="h-12 font-black gap-2 border-primary/20 hover:bg-primary/5 rounded-xl">
                   <Phone className="w-4 h-4" />
                   Call
                 </Button>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader className="pb-2 border-b border-white/5">
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-primary" />
                Dispatch Payload
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-4 pt-4">
               <div className="flex justify-between">
                 <span className="text-muted-foreground font-medium">Job Identification</span>
                 <span className="font-black text-primary">#ED-99212</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-muted-foreground font-medium">Diagnostic Pack</span>
                 <Badge variant="secondary" className="text-[9px] bg-green-500/10 text-green-500 border-green-500/20 font-black uppercase">5 PHOTOS SYNCED</Badge>
               </div>
               <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-[9px] leading-relaxed font-medium">
                 <p className="font-black uppercase mb-1">Privacy Notice</p>
                 Location data is shared only for the duration of this dispatch. Alex Rivera is an independent verified contractor.
               </div>
               <Button variant="link" className="w-full text-primary text-[10px] font-black uppercase tracking-[0.2em] h-auto">
                 View Assigned Diagnostic Report <ChevronRight className="w-3 h-3 ml-1" />
               </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
