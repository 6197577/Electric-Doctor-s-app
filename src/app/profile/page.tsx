
"use client"

import { User, Settings, CreditCard, History, Shield, LogOut, Zap, Bell, Crown, Calculator, Briefcase, Calendar as CalendarIcon, RefreshCw, BarChart3, TrendingUp, DollarSign, Lock, ArrowUpRight, Globe, Video, Star, ExternalLink, ShieldCheck, Building2, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { useUser, useCollection, useFirestore } from "@/firebase"
import { collection, query } from "firebase/firestore"

export default function ProfilePage() {
  const { user } = useUser()
  const db = useFirestore()
  const [isSyncing, setIsSyncing] = useState(false)
  const [userPlan, setUserPlan] = useState<"pay-as-you-go" | "monthly-elite">("pay-as-you-go") 
  const [hasCalendarAddon, setHasCalendarAddon] = useState(false)
  const [gmbLink, setGmbLink] = useState("")
  const [isOnCall, setIsOnCall] = useState(true)
  const { toast } = useToast()

  const canUseCalendar = userPlan === "monthly-elite" || hasCalendarAddon

  // Property count for limits
  const propsQuery = user && db ? query(collection(db, 'users', user.uid, 'properties')) : null
  const { data: properties } = useCollection(propsQuery)

  const handleCalendarSync = () => {
    if (!canUseCalendar) return;
    
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      toast({
        title: "Google Calendar Connected",
        description: "Your availability is now synced with Electric Doctor's booking engine.",
      })
    }, 2000)
  }

  const handleUnlockAddon = () => {
    toast({
      title: "Redirecting to Stripe",
      description: "Opening secure checkout for Pro-Sync Add-on ($49/mo).",
    })
    setTimeout(() => setHasCalendarAddon(true), 2000)
  }

  const handleSaveGMB = () => {
    toast({
      title: "GMB Link Verified",
      description: "Your Google My Business ratings are now legitimizing your profile.",
    })
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-12">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20 border-2 border-primary/20">
          <AvatarImage src={user?.photoURL || "https://picsum.photos/seed/user_p/200/200"} />
          <AvatarFallback>{user?.displayName?.[0] || "JD"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">{user?.displayName || "John Doe"}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Crown className="w-3 h-3 mr-1" />
              Verified Master Electrician
            </Badge>
            <span className="text-sm text-muted-foreground">{user?.email || "johndoe@example.com"}</span>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
           <Button variant="outline" size="sm">Edit Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Card className="p-2">
            <nav className="flex flex-col">
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 bg-muted/50">
                <User className="w-4 h-4 text-primary" /> Account Overview
              </Button>
              <Link href="/properties">
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium h-12 hover:bg-muted/30">
                  <Building2 className="w-4 h-4 text-primary" /> Managed Properties
                </Button>
              </Link>
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 hover:bg-muted/30">
                <Briefcase className="w-4 h-4 text-primary" /> Pro Leads
              </Button>
              <Link href="/pro/estimate">
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium h-12 hover:bg-muted/30">
                  <Calculator className="w-4 h-4 text-primary" /> AI Estimator
                </Button>
              </Link>
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 hover:bg-muted/30">
                <CreditCard className="w-4 h-4 text-primary" /> Lead Billing
              </Button>
              <div className="my-2 border-t border-border" />
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 text-destructive hover:bg-destructive/10">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </nav>
          </Card>

          {/* Asset Utilization Card */}
          <Card className="bg-primary/5 border-primary/20">
             <CardHeader className="pb-2">
               <CardTitle className="text-sm flex items-center gap-2">
                 <Building2 className="w-4 h-4 text-primary fill-primary" />
                 Asset Capacity
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black uppercase">
                    <span>Properties Tracked</span>
                    <span className="text-primary text-xs italic">{properties?.length || 0} / 5</span>
                  </div>
                  <Progress value={((properties?.length || 0) / 5) * 100} className="h-1.5" />
               </div>
               <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                 As a Verified Pro, you can manage up to 5 properties. Upgrade to Enterprise for unlimited asset tracking.
               </p>
               <Link href="/properties" className="block w-full">
                 <Button size="sm" variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest h-8 border-primary/20 text-primary">
                   Manage Assets
                 </Button>
               </Link>
             </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 flex flex-col gap-6">
           {/* Active Property Quick Access */}
           <Card className="border-border bg-card/50">
             <CardHeader className="flex flex-row items-center justify-between">
               <div>
                 <CardTitle className="text-lg">Property Quick Access</CardTitle>
                 <CardDescription>Jump to your registered assets and their logs.</CardDescription>
               </div>
               <Link href="/properties">
                 <Button variant="ghost" size="icon"><Plus className="w-5 h-5" /></Button>
               </Link>
             </CardHeader>
             <CardContent className="grid grid-cols-1 gap-2">
                {properties && properties.length > 0 ? (
                  properties.slice(0, 2).map((p:any) => (
                    <Link key={p.id} href={`/generator-logs?prop=${p.id}`}>
                      <div className="p-3 rounded-lg border bg-background hover:border-primary/50 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="text-sm font-bold">{p.nickname}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center border border-dashed rounded-lg">
                    <p className="text-xs text-muted-foreground">No properties found. Add your first home or facility to start tracking.</p>
                  </div>
                )}
             </CardContent>
           </Card>

           {/* Video Consult Dashboard */}
           <Card className="border-primary/40 orange-glow bg-card/50 overflow-hidden">
             <div className="bg-primary/10 px-6 py-3 border-b border-primary/20 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <Video className="w-3 h-3" />
                  Video Consultant Dashboard
                </span>
                <Badge variant={isOnCall ? 'default' : 'secondary'} className="text-[10px] uppercase font-black">
                  {isOnCall ? 'Live & On-Call' : 'Off Duty'}
                </Badge>
             </div>
             <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="font-black text-lg italic tracking-tight">Accept Emergency Calls</p>
                      <p className="text-xs text-muted-foreground">Toggle availability for instant $97 video consultations.</p>
                   </div>
                   <Switch checked={isOnCall} onCallChange={setIsOnCall} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-2xl bg-background border border-white/5 space-y-1">
                      <p className="text-[9px] font-black uppercase text-muted-foreground">Consults Completed</p>
                      <p className="text-2xl font-black">12</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-background border border-white/5 space-y-1">
                      <p className="text-[9px] font-black uppercase text-muted-foreground">Consult Revenue</p>
                      <p className="text-2xl font-black text-primary">$1,164</p>
                   </div>
                </div>
             </CardContent>
           </Card>

           {/* GMB Integration Card */}
           <Card className="border-border bg-card/50 overflow-hidden">
             <div className="bg-muted/30 px-6 py-3 border-b border-border flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Globe className="w-3 h-3" />
                  Business Legitimacy
                </span>
                {gmbLink && <Badge variant="outline" className="text-[9px] border-blue-500 text-blue-500 uppercase h-4">GMB Verified</Badge>}
             </div>
             <CardHeader>
               <CardTitle className="text-xl font-black italic">Verified Ratings Sync</CardTitle>
               <CardDescription>Link your Google My Business page to display verified stars on your profile.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex gap-2">
                   <Input 
                     placeholder="https://g.page/your-business-name" 
                     value={gmbLink}
                     onChange={(e) => setGmbLink(e.target.value)}
                     className="bg-background border-primary/20"
                   />
                   <Button onClick={handleSaveGMB} className="font-bold">Sync</Button>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
