"use client"

import { User, Settings, CreditCard, History, Shield, LogOut, Zap, Bell, Crown, Calculator, Briefcase } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-12">
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
              Verified Electrician
            </Badge>
            <span className="text-sm text-muted-foreground">johndoe@example.com</span>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
           <Button variant="outline" size="sm">Edit Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <CreditCard className="w-4 h-4 text-primary" /> Billing
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

          <Card className="bg-primary/5 border-primary/20">
             <CardHeader className="pb-2">
               <CardTitle className="text-sm flex items-center gap-2">
                 <Zap className="w-4 h-4 text-primary fill-primary" />
                 Pro Access
               </CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-xs text-muted-foreground">
                 You have <b>Unlimited AI Scans</b> and full access to our project estimation suite.
               </p>
             </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
           <Card className="border-primary/20 bg-primary/5">
             <CardHeader>
               <div className="flex items-center justify-between">
                 <div>
                   <CardTitle>Professional Status</CardTitle>
                   <CardDescription>Network Tier: Master Electrician (High Volume)</CardDescription>
                 </div>
                 <Badge className="bg-primary text-black font-bold">VERIFIED</Badge>
               </div>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col p-3 rounded-lg bg-background border">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Leads Won</span>
                    <span className="text-xl font-bold">42</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-lg bg-background border">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">AI Scans (Mo)</span>
                    <span className="text-xl font-bold">Unlimited</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-lg bg-background border">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Earnings</span>
                    <span className="text-xl font-bold text-green-500">$12.4k</span>
                  </div>
                </div>
                <Link href="/pro/estimate">
                  <Button className="w-full font-bold bg-primary text-black hover:bg-primary/90">Open Project Estimator</Button>
                </Link>
             </CardContent>
           </Card>

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

           <Card>
             <CardHeader>
               <CardTitle>Recent Projects</CardTitle>
               <CardDescription>Your last 3 estimated or completed jobs.</CardDescription>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y border-t">
                   <div className="p-4 flex items-center justify-between">
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
                   <div className="p-4 flex items-center justify-between">
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
