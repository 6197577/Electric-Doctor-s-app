import Link from "next/link"
import { Zap, ShieldCheck, BatteryCharging, Video, Stethoscope, BarChart3, ArrowRight, Cpu, Building2, Factory, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-24">
      {/* Hero / Quick Action */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-card p-12 md:p-20 border border-primary/20 orange-glow">
        <div className="relative z-10 flex flex-col gap-8 max-w-3xl">
          <Badge variant="outline" className="w-fit border-primary text-primary px-6 py-1.5 uppercase tracking-[0.3em] text-[10px] font-black bg-primary/5">
            World-Class Emergency Care
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black font-headline leading-[0.85] tracking-tighter">
            Electrical Emergency? <br />
            <span className="text-primary italic">Talk to a Doctor.</span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-xl leading-relaxed font-medium">
            Instant AI diagnostics, $97 Master Electrician video consults, and multi-property asset tracking for homeowners and pros.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/video-consult">
              <Button size="lg" className="font-black group h-16 px-10 bg-primary text-black hover:bg-primary/90 text-lg rounded-2xl shadow-2xl">
                <Video className="mr-3 w-6 h-6" />
                Emergency Video Consult
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/properties">
              <Button size="lg" variant="outline" className="font-black h-16 px-10 border-primary/40 text-primary hover:bg-primary/10 text-lg rounded-2xl">
                <Building2 className="mr-3 w-6 h-6" />
                Manage My Assets
                <Plus className="ml-3 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-10%] opacity-[0.03] pointer-events-none">
          <Stethoscope className="w-[800px] h-[800px] text-primary" />
        </div>
      </section>

      {/* Grid of services */}
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

      {/* Smart Panel Sales Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
         <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-primary/20 orange-glow">
            <Image 
              src="https://picsum.photos/seed/elec_hd11/800/600" 
              alt="Smart Electrical Panel Dashboard" 
              fill 
              className="object-cover"
              data-ai-hint="smart panel"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="p-6 bg-black/80 backdrop-blur-xl rounded-2xl border border-primary/30 text-center space-y-2">
                 <p className="text-4xl font-black text-primary">0%</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Main Breaker Load</p>
              </div>
            </div>
         </div>
         <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
              Upgrade to a <br/><span className="text-primary italic">Smart Panel.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              Control your home energy from your pocket. Detect faults, manage EV charging, and shed loads automatically to prevent main breaker trips.
            </p>
            <Link href="/products/smart-panels">
              <Button className="h-14 px-8 font-black bg-white text-black hover:bg-white/90 rounded-xl gap-3">
                <Cpu className="w-5 h-5" />
                Explore Smart Panels
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
         </div>
      </section>
    </div>
  )
}
