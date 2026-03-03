
import Link from "next/link"
import { Zap, ShieldCheck, BatteryCharging, Video, Stethoscope, BarChart3, ArrowRight, Cpu, Building2, Factory, Plus, Search, CheckCircle2, MessageSquare, Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-card p-12 md:p-24 border border-primary/20 orange-glow">
        <div className="relative z-10 flex flex-col gap-8 max-w-4xl">
          <Badge variant="outline" className="w-fit border-primary text-primary px-6 py-1.5 uppercase tracking-[0.3em] text-[10px] font-black bg-primary/5">
            World-Class Emergency Care
          </Badge>
          <h1 className="text-6xl md:text-9xl font-black font-headline leading-[0.8] tracking-tighter">
            Electrical Emergency? <br />
            <span className="text-primary italic">Talk to a Doctor.</span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl leading-relaxed font-medium">
            The world's first AI platform that "listens" to your wiring. Instant diagnostics, $97 Master consultations, and multi-property safety tracking.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/video-consult">
              <Button size="lg" className="font-black group h-16 px-10 bg-primary text-black hover:bg-primary/90 text-lg rounded-2xl shadow-2xl">
                <Video className="mr-3 w-6 h-6" />
                Emergency Video Consult
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/diagnose">
              <Button size="lg" variant="outline" className="font-black h-16 px-10 border-primary/40 text-primary hover:bg-primary/10 text-lg rounded-2xl">
                <Zap className="mr-3 w-6 h-6" />
                Run Free AI Scan
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-10%] opacity-[0.03] pointer-events-none">
          <Stethoscope className="w-[1000px] h-[1000px] text-primary" />
        </div>
      </section>

      {/* Trust Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/5">
        {[
          { label: "AI Scans Run", val: "150k+" },
          { label: "Fires Prevented", val: "8,400" },
          { label: "Master Pros", val: "1,200" },
          { label: "Avg. ROI", val: "12.4x" }
        ].map((s, i) => (
          <div key={i} className="text-center space-y-1">
            <p className="text-4xl font-black text-white tracking-tighter">{s.val}</p>
            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      {/* How it Works */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">How to Stabilize Your Home</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Three steps to move from "Potential Malfunction" to "Certified Safety."</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: "01", icon: Zap, title: "AI Diagnostic Scan", desc: "Hold your phone near the outlet or panel. Our AI listens for 50/60Hz arcing signatures and evaluates visual heat damage." },
            { step: "02", icon: Video, title: "Video Consultation", desc: "Connect with a Master Electrician in < 2 minutes. Get immediate DIY safety steps to stabilize the issue before dispatch." },
            { step: "03", icon: MapPin, title: "Verified Pro Dispatch", desc: "If repair is needed, we dispatch a local verified pro who arrives already briefed with your AI diagnostic data." }
          ].map((s, i) => (
            <div key={i} className="relative space-y-6 group">
              <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4 group-hover:text-primary/10 transition-colors">{s.step}</div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center relative z-10">
                <s.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl font-black italic tracking-tight">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter uppercase">The Platform Suite</h2>
            <p className="text-muted-foreground">Professional-grade tools for residential and commercial assets.</p>
          </div>
          <Link href="/subscriptions">
            <Button variant="link" className="text-primary font-black uppercase tracking-widest gap-2">View All Plans <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Video, title: "Video Doctor", desc: "Instant Master Access", href: "/video-consult", label: "Start Call", badge: "$97.00" },
            { icon: Factory, title: "Commercial Audit", desc: "Enterprise Compliance", href: "/commercial-audit", label: "Book Audit", badge: "from $47" },
            { icon: BatteryCharging, title: "EV Readiness", desc: "Capacity Calculation", href: "/ev-readiness", label: "Get report", badge: "$29.99" },
            { icon: ShieldCheck, title: "Safety Audit", desc: "Residential NEC Check", href: "/audit", label: "Book Audit", badge: "from $47" }
          ].map((service, i) => (
            <Card key={i} className="group hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden bg-card/30 backdrop-blur-sm">
              {service.badge && (
                <Badge className="absolute top-3 right-3 bg-primary text-black font-black text-[10px] px-3">{service.badge}</Badge>
              )}
              <CardHeader className="pt-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-black tracking-tight">{service.title}</CardTitle>
                <CardDescription className="font-medium">{service.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={service.href}>
                  <Button variant="link" className="p-0 text-primary h-auto font-black text-sm uppercase tracking-widest">
                    {service.label} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Product Spotlight */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-primary/5 rounded-[3rem] p-12 md:p-24 border border-primary/20">
         <div className="space-y-8">
            <Badge className="bg-primary text-black font-black">PRODUCT SPOTLIGHT</Badge>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              Control Your Power. <br/><span className="text-primary italic">Avoid the Emergency.</span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed font-medium">
              A **Smart Panel Upgrade** doesn't just manage your EV charging; it uses internal AI to detect loose connections and wiring degradation *months* before they lead to a malfunction.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "30% IRA Federal Tax Credit",
                "Remote Circuit Control",
                "Built-in Arc-Fault Detection",
                "Avoid $10k Service Upgrades"
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-4 pt-4">
              <Link href="/products/smart-panels">
                <Button size="lg" className="h-16 px-10 font-black bg-white text-black hover:bg-white/90 rounded-2xl">
                  Explore Smart Panels
                </Button>
              </Link>
            </div>
         </div>
         <div className="relative aspect-square rounded-[3rem] overflow-hidden border-4 border-primary/20 shadow-2xl orange-glow">
            <Image 
              src="https://picsum.photos/seed/smart_p1/1000/1000" 
              alt="Smart Panel Interface" 
              fill 
              className="object-cover"
              data-ai-hint="smart panel"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
               <div className="p-8 bg-black/80 backdrop-blur-2xl rounded-3xl border border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-black uppercase text-primary tracking-widest">Active Monitoring</p>
                    <Badge variant="outline" className="text-green-500 border-green-500">SAFE</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black">0.4kW</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black">Current Home Load</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-8 py-12">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Ready to secure your home?</h2>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Join the network of safety-first homeowners and facility managers using AI to stay ahead of electrical failures.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/diagnose">
            <Button size="lg" className="h-16 px-12 font-black text-xl bg-primary text-black hover:bg-primary/90 rounded-2xl">
              Start Free Diagnosis
            </Button>
          </Link>
          <Link href="/subscriptions">
            <Button size="lg" variant="outline" className="h-16 px-12 font-black text-xl border-primary/20 text-primary hover:bg-primary/10 rounded-2xl">
              View Audit Packs
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
