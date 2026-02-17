
"use client"

import { User, Settings, CreditCard, History, Shield, LogOut, Zap, Bell, Crown, Calculator, Briefcase, Calendar as CalendarIcon, RefreshCw, BarChart3, TrendingUp, DollarSign, Lock, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [userPlan, setUserPlan] = useState<"pay-as-you-go" | "monthly-elite">("pay-as-you-go") 
  const [hasCalendarAddon, setHasCalendarAddon] = useState(false)
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
    // Simulate activation for demo purposes
    setTimeout(() => setHasCalendarAddon(true), 2000)
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
           {/* Performance Stats */}
           <Card className="border-primary/20 bg-card/50 overflow-hidden relative">
             <div className="absolute right-0 top-0 p-4">
                <Badge className="bg-green-500 text-black font-bold uppercase tracking-tighter">Verified Pro</Badge>
             </div>
             <CardHeader>
               <CardTitle className="text-2xl font-black italic tracking-tighter">Business Dashboard</CardTitle>
               <CardDescription>Real-time earnings and lead overhead tracking.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col p-4 rounded-2xl bg-background border border-white/5 relative group overflow-hidden">
                    <TrendingUp className="absolute -right-2 -bottom-2 w-12 h-12 text-green-500 opacity-5 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Leads Won</span>
                    <span className="text-3xl font-black">42</span>
                  </div>
                  <div className="flex flex-col p-4 rounded-2xl bg-background border border-white/5 relative group overflow-hidden">
                    <DollarSign className="absolute -right-2 -bottom-2 w-12 h-12 text-primary opacity-5 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Gross Rev</span>
                    <span className="text-3xl font-black text-primary">$12.4k</span>
                  </div>
                  <div className="flex flex-col p-4 rounded-2xl bg-background border border-white/5 relative group overflow-hidden">
                    <Zap className="absolute -right-2 -bottom-2 w-12 h-12 text-amber-500 opacity-5 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Lead Costs</span>
                    <span className="text-3xl font-black text-amber-500">{userPlan === 'monthly-elite' ? '$499' : '$924'}</span>
                  </div>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                         <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-sm font-bold">ROI Efficiency</p>
                         <p className="text-[10px] text-muted-foreground uppercase font-black">{userPlan === 'monthly-elite' ? '24.8x' : '13.4x'} return on lead spend</p>
                      </div>
                   </div>
                   <Link href="/pro/estimate">
                     <Button className="font-black h-10 px-6 bg-primary text-black hover:bg-primary/90 rounded-lg">New AI Estimate</Button>
                   </Link>
                </div>
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

           {/* Notifications */}
           <Card>
             <CardHeader>
               <CardTitle>Pro Notifications</CardTitle>
               <CardDescription>Manage your high-priority lead alerts.</CardDescription>
             </CardHeader>
             <CardContent className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                   <div className="flex flex-col gap-1">
                      <Label className="font-bold">Urgent Lead Alerts</Label>
                      <p className="text-xs text-muted-foreground">Get notified within seconds of emergency video consult requests.</p>
                   </div>
                   <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex flex-col gap-1">
                      <Label className="font-bold">Estimator AI Updates</Label>
                      <p className="text-xs text-muted-foreground">Receive updates when local material pricing indices change.</p>
                   </div>
                   <Switch defaultChecked />
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
