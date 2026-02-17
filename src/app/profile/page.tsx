"use client"

import { User, Settings, CreditCard, History, Shield, LogOut, Zap, Bell, Crown, Calculator, Briefcase, Calendar as CalendarIcon, RefreshCw, BarChart3, TrendingUp, DollarSign, Lock, ArrowUpRight, Globe, Video, Star, ExternalLink, ShieldCheck } from "lucide-react"
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

export default function ProfilePage() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [userPlan, setUserPlan] = useState<"pay-as-you-go" | "monthly-elite">("pay-as-you-go") 
  const [hasCalendarAddon, setHasCalendarAddon] = useState(false)
  const [gmbLink, setGmbLink] = useState("")
  const [isOnCall, setIsOnCall] = useState(true)
  const { toast } = useToast()

  const canUseCalendar = userPlan === "monthly-elite" || hasCalendarAddon

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
          <AvatarImage src="https://picsum.photos/seed/user_p/200/200" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">John Doe</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Crown className="w-3 h-3 mr-1" />
              Verified Master Electrician
            </Badge>
            <span className="text-sm text-muted-foreground">johndoe@example.com</span>
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
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 hover:bg-muted/30">
                <Shield className="w-4 h-4 text-primary" /> Security
              </Button>
              <div className="my-2 border-t border-border" />
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 text-destructive hover:bg-destructive/10">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </nav>
          </Card>

          {/* Lead Quota Card */}
          <Card className="bg-primary/5 border-primary/20">
             <CardHeader className="pb-2">
               <CardTitle className="text-sm flex items-center gap-2">
                 <Zap className="w-4 h-4 text-primary fill-primary" />
                 Pro Access Status
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black uppercase">
                    <span>AI Diagnostic Scans</span>
                    <span className="text-primary text-xs italic">{userPlan === 'monthly-elite' ? 'UNLIMITED' : '100 / MO'}</span>
                  </div>
                  <Progress value={userPlan === 'monthly-elite' ? 100 : 45} className="h-1.5" />
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Plan: <b>{userPlan === 'monthly-elite' ? 'Monthly Elite ($499/mo)' : 'Pay As You Go'}</b>
                  </p>
                  {hasCalendarAddon && userPlan !== 'monthly-elite' && (
                    <Badge variant="outline" className="text-[9px] border-green-500 text-green-500 uppercase h-4">Pro-Sync Add-on Active</Badge>
                  )}
               </div>
               <Button 
                size="sm" 
                variant="outline" 
                className="w-full text-[10px] font-black uppercase tracking-widest h-8 border-primary/20 text-primary"
                onClick={() => setUserPlan(userPlan === 'monthly-elite' ? 'pay-as-you-go' : 'monthly-elite')}
               >
                 {userPlan === 'monthly-elite' ? 'Downgrade Plan' : 'Upgrade to Elite'}
               </Button>
             </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 flex flex-col gap-6">
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

                {!canUseCalendar && (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3">
                    <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Calendar Sync required for <b>Automatic Scheduling</b> of follow-up visits. Upgrade to Monthly Elite to unlock full automation.
                    </p>
                  </div>
                )}
             </CardContent>
           </Card>

           {/* Business Legitimacy Card (GMB Integration) */}
           <Card className="border-border bg-card/50 overflow-hidden">
             <div className="bg-muted/30 px-6 py-3 border-b border-border flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Globe className="w-3 h-3" />
                  Business Legitimacy
                </span>
                {gmbLink && <Badge variant="outline" className="text-[9px] border-blue-500 text-blue-500 uppercase h-4">GMB Verified</Badge>}
             </div>
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-xl font-black italic tracking-tighter">
                 Verified Ratings Sync
               </CardTitle>
               <CardDescription>Link your Google My Business page to display external verified ratings on your marketplace profile.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-6">
                <div className="space-y-2">
                   <Label htmlFor="gmb" className="text-xs font-bold uppercase tracking-widest">GMB Profile Link</Label>
                   <div className="flex gap-2">
                      <Input 
                        id="gmb" 
                        placeholder="https://g.page/your-business-name" 
                        value={gmbLink}
                        onChange={(e) => setGmbLink(e.target.value)}
                        className="bg-background border-primary/20"
                      />
                      <Button onClick={handleSaveGMB} className="font-bold">Sync Stars</Button>
                   </div>
                </div>

                {gmbLink ? (
                  <div className="p-6 rounded-[2rem] border-2 border-blue-500/20 bg-blue-500/5 flex flex-col gap-4 animate-in zoom-in-95 duration-500">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                              <svg viewBox="0 0 24 24" className="w-8 h-8">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-3.3 3.28-8.19 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                              </svg>
                           </div>
                           <div>
                              <p className="font-black text-lg">Google My Business Sync</p>
                              <div className="flex items-center gap-1 mt-1">
                                 {[...Array(5)].map((_, i) => (
                                   <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
                                 ))}
                                 <span className="text-xs font-black text-blue-700 ml-2">4.9 / 5.0 Rating</span>
                              </div>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-2xl font-black text-blue-600">124</p>
                           <p className="text-[10px] font-bold uppercase text-blue-400">Total Reviews</p>
                        </div>
                     </div>
                     <p className="text-xs text-muted-foreground italic bg-background/50 p-3 rounded-lg border border-blue-500/10">
                       "Your verified Google rating is now live on the marketplace. This is providing a 42% increase in consumer trust for your profile."
                     </p>
                  </div>
                ) : (
                  <div className="p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center gap-4 bg-muted/10 opacity-60">
                     <Globe className="w-12 h-12 text-muted-foreground" />
                     <div>
                        <p className="font-bold">No external legitimacy linked</p>
                        <p className="text-xs text-muted-foreground">Link GMB to show your real-world ratings to potential customers.</p>
                     </div>
                  </div>
                )}
             </CardContent>
           </Card>

           {/* Calendar Sync - Plan Restricted */}
           <Card className={canUseCalendar ? 'border-primary/20' : 'bg-muted/10'}>
             <CardHeader>
               <div className="flex items-center justify-between">
                 <div>
                   <CardTitle className="flex items-center gap-2">
                     <CalendarIcon className="w-5 h-5 text-primary" />
                     Google Calendar Sync
                   </CardTitle>
                   <CardDescription>
                     {canUseCalendar 
                       ? "Connect your external calendar to manage availability."
                       : "Automate your bookings with our Pro-Sync plugin."}
                   </CardDescription>
                 </div>
                 <Badge variant={canUseCalendar ? 'outline' : 'destructive'} className={canUseCalendar ? 'border-primary text-primary' : ''}>
                   {userPlan === 'monthly-elite' ? 'ELITE INCLUDED' : hasCalendarAddon ? 'ADD-ON ACTIVE' : 'LOCKED'}
                 </Badge>
               </div>
             </CardHeader>
             <CardContent>
                <div className="p-4 rounded-xl border border-dashed bg-muted/20 flex flex-col items-center gap-4 text-center relative">
                   {!canUseCalendar && (
                     <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-xl p-4">
                        <Lock className="w-8 h-8 text-primary mb-2" />
                        <p className="font-black text-sm uppercase tracking-widest mb-1">Automation Restricted</p>
                        <p className="text-[10px] text-muted-foreground mb-4 max-w-[200px]">Unlock automated scheduling for $49/mo or upgrade to Pro Elite.</p>
                        <div className="flex flex-col w-full gap-2 px-8">
                          <Button 
                            size="sm"
                            className="font-black h-10 bg-primary text-black hover:bg-primary/90 rounded-lg w-full"
                            onClick={handleUnlockAddon}
                          >
                            Unlock Plugin ($49/mo)
                          </Button>
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="font-black h-10 text-xs opacity-70 w-full"
                            onClick={() => setUserPlan('monthly-elite')}
                          >
                            Upgrade to Elite ($499/mo)
                          </Button>
                        </div>
                     </div>
                   )}
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-sm font-bold">No external calendar connected</p>
                      <p className="text-xs text-muted-foreground max-w-xs">Connecting Google Calendar allows customers to book you only when you are truly free.</p>
                   </div>
                   <Button 
                    variant="outline" 
                    className="font-bold border-primary text-primary hover:bg-primary/10"
                    onClick={handleCalendarSync}
                    disabled={isSyncing || !canUseCalendar}
                   >
                      {isSyncing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : "Connect Google Calendar"}
                   </Button>
                </div>
             </CardContent>
           </Card>

           {/* History */}
           <Card>
             <CardHeader>
               <CardTitle>Recent Projects</CardTitle>
               <CardDescription>Your last 3 estimated or completed jobs.</CardDescription>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y border-t">
                   <div className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary" />
                         </div>
                         <div>
                            <p className="text-sm font-bold">EV Charger Install ($842.00)</p>
                            <p className="text-xs text-muted-foreground">Estimated • 2 hours ago</p>
                         </div>
                      </div>
                      <Link href="/pro/estimate">
                        <Button variant="ghost" size="sm">View Estimate</Button>
                      </Link>
                   </div>
                   <div className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary" />
                         </div>
                         <div>
                            <p className="text-sm font-bold">Main Panel Retrofit</p>
                            <p className="text-xs text-muted-foreground">Completed • Sept 22, 2023</p>
                         </div>
                      </div>
                      <Button variant="ghost" size="sm">View Job</Button>
                   </div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
