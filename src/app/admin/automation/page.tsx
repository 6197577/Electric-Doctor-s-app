
"use client"

import { useState, useEffect } from "react"
import { Cpu, Zap, Settings, ShieldCheck, RefreshCw, MessageSquare, BarChart3, ArrowRight, Loader2, Globe, Database, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

export default function AutomationAdminPage() {
  const db = useFirestore()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)

  const configRef = useMemoFirebase(() => {
    if (!db) return null
    return doc(db, 'system', 'config')
  }, [db])

  const { data: config, loading } = useDoc(configRef)

  const handleToggleFeature = (feature: string, enabled: boolean) => {
    if (!db || !configRef) return
    setIsUpdating(true)
    
    const newFlags = { ...config?.featureFlags, [feature]: enabled }
    
    setDoc(configRef, {
      featureFlags: newFlags,
      updatedAt: serverTimestamp()
    }, { merge: true }).then(() => {
      toast({ title: "Autonomous State Updated", description: `${feature} is now ${enabled ? 'active' : 'disabled'} globally.` })
    }).finally(() => setIsUpdating(false))
  }

  if (loading) return (
    <div className="min-h-[60vh] flex flex-center justify-center items-center italic text-muted-foreground">
      Connecting to Autonomous Bridge...
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-primary text-black font-black uppercase tracking-widest text-[10px]">AI Orchestrator v1.0</Badge>
          <h1 className="text-3xl font-bold tracking-tight">Autonomous Command Center</h1>
        </div>
        <p className="text-muted-foreground text-lg">Manage your app's future without writing code. Control AI prompts, UI behavior, and dynamic features via remote configuration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-primary/40 orange-glow bg-card/50 backdrop-blur-xl">
          <CardHeader className="border-b border-white/5 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-2xl font-black italic">
                <Cpu className="w-6 h-6 text-primary" />
                Live System Flags
              </CardTitle>
              <Badge variant="outline" className="border-green-500/50 text-green-500 uppercase font-black text-[10px]">
                <Globe className="w-2.5 h-2.5 mr-1" /> Multi-Region Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {[
                { id: "ai_audio_analysis", label: "Autonomous Audio Forensics", desc: "Allows AI to listen for 50Hz/60Hz arcing signatures in real-time." },
                { id: "predictive_scheduling", label: "Predictive Routing Engine", desc: "AI automatically pre-routes electricians based on predicted failures." },
                { id: "dynamic_pricing", label: "Regional Demand Pricing", desc: "Adjusts marketplace rates based on live local emergency volume." },
                { id: "self_healing_ui", label: "Self-Healing UI Mode", desc: "AI automatically tweaks component layouts based on drop-off analytics." }
              ].map((flag) => (
                <div key={flag.id} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-white/5 group hover:border-primary/30 transition-all">
                  <div className="space-y-1">
                    <p className="font-bold text-lg">{flag.label}</p>
                    <p className="text-xs text-muted-foreground max-w-md">{flag.desc}</p>
                  </div>
                  <Switch 
                    checked={!!config?.featureFlags?.[flag.id]} 
                    onCheckedChange={(checked) => handleToggleFeature(flag.id, checked)}
                    disabled={isUpdating}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-white/5 p-6 border-t border-white/5 flex items-center gap-4">
            <Code className="w-5 h-5 text-primary" />
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
              Last Global Propagation: {config?.updatedAt ? new Date(config.updatedAt.seconds * 1000).toLocaleString() : 'Never'}
            </p>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="bg-primary text-black">
            <CardHeader>
              <CardTitle className="text-xl font-black italic">The Future Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs font-bold leading-relaxed">
                By using **Remote Config**, your AI can evolve its diagnostic logic and UI layouts based on performance metrics without a single Git commit.
              </p>
              <div className="p-3 bg-black/10 rounded-xl border border-black/10 text-[10px] font-black uppercase tracking-widest">
                0% Manual Code Dependency Target
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                Data Integrity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>Schema Drift</span>
                  <span className="text-green-500 italic">Aligned</span>
                </div>
                <Progress value={100} className="h-1 bg-muted" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>AI Prompt Version</span>
                  <span className="text-primary italic">v2.4 Remote</span>
                </div>
                <Progress value={85} className="h-1 bg-muted" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
