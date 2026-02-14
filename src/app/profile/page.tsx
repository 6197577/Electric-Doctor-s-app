
"use client"

import { User, Settings, CreditCard, History, Shield, LogOut, Zap, Bell, Crown } from "lucide-react"
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
              Standard Residential
            </Badge>
            <span className="text-sm text-muted-foreground">johndoe@example.com</span>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
           <Button variant="outline" size="sm">Edit Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Nav */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Card className="p-2">
            <nav className="flex flex-col">
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 bg-muted/50">
                <User className="w-4 h-4 text-primary" /> Account Overview
              </Button>
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 hover:bg-muted/30">
                <History className="w-4 h-4 text-primary" /> Job History
              </Button>
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 hover:bg-muted/30">
                <CreditCard className="w-4 h-4 text-primary" /> Payment Methods
              </Button>
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 hover:bg-muted/30">
                <Shield className="w-4 h-4 text-primary" /> Security & Privacy
              </Button>
              <Button variant="ghost" className="justify-start gap-3 font-medium h-12 hover:bg-muted/30">
                <Settings className="w-4 h-4 text-primary" /> App Settings
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
                 Pro Tip
               </CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-xs text-muted-foreground">
                 Upgrade to "Home Pro" to unlock predictive failure alerts and a 10% discount on all service calls.
               </p>
               <Link href="/subscriptions">
                <Button variant="link" className="p-0 h-auto text-[10px] text-primary mt-2">View Upgrade Options &rarr;</Button>
               </Link>
             </CardContent>
          </Card>
        </div>

        {/* Main Column - Settings/Overview */}
        <div className="md:col-span-2 flex flex-col gap-6">
           <Card className="border-primary/20 bg-primary/5">
             <CardHeader>
               <div className="flex items-center justify-between">
                 <div>
                   <CardTitle>Current Subscription</CardTitle>
                   <CardDescription>You are currently on the Home Standard plan.</CardDescription>
                 </div>
                 <Badge className="bg-primary text-black font-bold">ACTIVE</Badge>
               </div>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col p-3 rounded-lg bg-background border">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Audits Used</span>
                    <span className="text-xl font-bold">1/3</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-lg bg-background border">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">AI Scans</span>
                    <span className="text-xl font-bold">2/10</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-lg bg-background border">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Next Billing</span>
                    <span className="text-xl font-bold">Oct 12</span>
                  </div>
                </div>
                <Link href="/subscriptions">
                  <Button className="w-full font-bold">Manage or Change Plan</Button>
                </Link>
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
               <CardTitle>Notifications</CardTitle>
               <CardDescription>Manage how you receive alerts and updates.</CardDescription>
             </CardHeader>
             <CardContent className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                   <div className="flex flex-col gap-1">
                      <Label className="font-bold">Push Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive real-time tracking updates and safety alerts.</p>
                   </div>
                   <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex flex-col gap-1">
                      <Label className="font-bold">Predictive Maintenance Alerts</Label>
                      <p className="text-xs text-muted-foreground">AI warnings about potential system failures.</p>
                   </div>
                   <Switch defaultChecked />
                </div>
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
               <CardTitle>Recent Job Activity</CardTitle>
               <CardDescription>Your last 3 interactions with service pros.</CardDescription>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y border-t">
                   <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary" />
                         </div>
                         <div>
                            <p className="text-sm font-bold">Electrical Audit ($47.93)</p>
                            <p className="text-xs text-muted-foreground">Completed • Today</p>
                         </div>
                      </div>
                      <Button variant="ghost" size="sm">View Receipt</Button>
                   </div>
                   <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary" />
                         </div>
                         <div>
                            <p className="text-sm font-bold">Outlet Repair</p>
                            <p className="text-xs text-muted-foreground">Completed • Sept 22, 2023</p>
                         </div>
                      </div>
                      <Button variant="ghost" size="sm">View Receipt</Button>
                   </div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
