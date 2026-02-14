
"use client"

import { useState, useEffect } from "react"
import { MapPin, MessageSquare, Phone, Clock, ShieldCheck, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function TrackingPage() {
  const [eta, setEta] = useState(12)
  const [progress, setProgress] = useState(65)

  // Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => Math.max(2, prev - 1))
      setProgress(prev => Math.min(95, prev + 2))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-12">
      <div className="flex items-center gap-2">
        <Badge className="bg-primary text-black font-bold">LIVE</Badge>
        <h1 className="text-3xl font-bold">Track Your Electrician</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <Card className="lg:col-span-2 min-h-[400px] relative overflow-hidden bg-muted flex items-center justify-center border-border">
          <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover bg-center" />
          <div className="relative z-10 flex flex-col items-center gap-4">
             {/* Simple visual map marker representation */}
             <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary/20 animate-ping absolute inset-0" />
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center relative border-4 border-black">
                   <MapPin className="w-6 h-6 text-black" />
                </div>
             </div>
             <Badge className="bg-black/80 backdrop-blur text-white border-primary/50">Electrician is en route</Badge>
          </div>
          
          {/* Map Overlay Stats */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
             <Card className="flex-1 glass-card p-3 flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Estimated Arrival</p>
                  <p className="font-bold text-lg">{eta} mins</p>
                </div>
             </Card>
             <Card className="flex-1 glass-card p-3 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Distance</p>
                  <p className="font-bold text-lg">0.8 miles</p>
                </div>
             </Card>
          </div>
        </Card>

        {/* Electrician Info & Chat */}
        <div className="flex flex-col gap-6">
          <Card className="border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border border-primary/30">
                  <AvatarImage src="https://picsum.photos/seed/elec_p1/100/100" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">Alex Rivera</CardTitle>
                  <CardDescription className="flex items-center text-xs">
                    <ShieldCheck className="w-3 h-3 text-primary mr-1" />
                    Verified Master Electrician
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
               <div className="space-y-1">
                 <div className="flex justify-between text-xs font-medium">
                   <span>On the way</span>
                   <span>{progress}%</span>
                 </div>
                 <Progress value={progress} className="h-2" />
               </div>
               
               <div className="grid grid-cols-2 gap-2">
                 <Button className="font-bold gap-2">
                   <MessageSquare className="w-4 h-4" />
                   Chat
                 </Button>
                 <Button variant="outline" className="font-bold gap-2">
                   <Phone className="w-4 h-4" />
                   Call
                 </Button>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-3">
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Status</span>
                 <Badge variant="secondary" className="text-[10px]">Confirmed</Badge>
               </div>
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Type</span>
                 <span>Diagnostic Check</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Ref ID</span>
                 <span>#ED-99212</span>
               </div>
               <div className="pt-2 border-t border-border">
                 <Button variant="link" className="p-0 h-auto text-primary text-[10px]">
                   View original diagnosis report <ChevronRight className="w-3 h-3" />
                 </Button>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
