import Link from "next/link"
import { Zap, ShieldAlert, ShoppingBag, ArrowRight, Activity, MapPin, Sun, ClipboardList, ShieldCheck, Globe, BatteryCharging } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TOP_50_CITIES_PRICING } from "@/lib/pricing-data"

export default function Home() {
  const featuredCities = TOP_50_CITIES_PRICING.slice(0, 12);

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero / Quick Action */}
      <section className="relative overflow-hidden rounded-3xl bg-card p-12 border border-primary/20 orange-glow">
        <div className="relative z-10 flex flex-col gap-6 max-w-2xl">
          <Badge variant="outline" className="w-fit border-primary text-primary px-4 py-1 uppercase tracking-widest text-[10px] font-bold">AI-Powered Electrical Care</Badge>
          <h1 className="text-5xl md:text-7xl font-black font-headline leading-[0.9] tracking-tighter">
            Stop Guessing. <br />
            <span className="text-primary">Start Fixing.</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-lg leading-relaxed">
            Revolutionary AI diagnostics, NEC safety audits, and localized pro marketplaces—all in one secure platform.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/diagnose">
              <Button size="lg" className="font-bold group h-14 px-8">
                Instant AI Scan
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/ev-readiness">
              <Button size="lg" variant="outline" className="font-bold h-14 px-8 border-primary text-primary hover:bg-primary/10">
                EV Capacity Tool
                <BatteryCharging className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-[-5%] top-[-10%] opacity-5 pointer-events-none">
          <Zap className="w-[600px] h-[600px] text-primary" />
        </div>
      </section>

      {/* Grid of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: BatteryCharging, title: "EV Readiness", desc: "Capacity Calculation", href: "/ev-readiness", label: "Get report", badge: "$29.99" },
          { icon: Sun, title: "Lighting Tool", desc: "Lumens & Quality", href: "/lighting-tool", label: "Test bulbs" },
          { icon: ClipboardList, title: "Generator Log", desc: "Maintenance Tracker", href: "/generator-logs", label: "View logs" },
          { icon: MapPin, title: "Marketplace", desc: "Verified Pros", href: "/marketplace", label: "Browse pros" }
        ].map((service, i) => (
          <Card key={i} className="group hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
            {service.badge && (
              <Badge className="absolute top-2 right-2 bg-primary text-black font-bold text-[10px]">{service.badge}</Badge>
            )}
            <CardHeader>
              <service.icon className="w-10 h-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              <CardDescription>{service.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={service.href}>
                <Button variant="link" className="p-0 text-primary h-auto font-bold text-sm">
                  {service.label} &rarr;
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SEO Section - Service Areas */}
      <section className="flex flex-col gap-8 py-8 border-t border-border">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
            <Globe className="w-8 h-8 text-primary" />
            Localized Service Areas
          </h2>
          <p className="text-muted-foreground">Expert electrical support across the United States. Select your city for localized pricing and pro matching.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {featuredCities.map((city) => (
            <Link 
              key={city.city} 
              href={`/services/marketplace/${city.city.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-3 rounded-xl border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-bold flex items-center justify-between group"
            >
              <span>{city.city}</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </Link>
          ))}
        </div>
        <Link href="/marketplace" className="text-primary font-bold flex items-center gap-2 hover:underline">
          View all 50+ service regions <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-6">
        <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
          <Activity className="w-8 h-8 text-primary" />
          Recent Network Activity
        </h2>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y border-t border-border">
              <div className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="font-bold">EV Load Calculation Generated</span>
                  <span className="text-xs text-muted-foreground">Today • 200A Panel • San Francisco, CA</span>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 font-bold uppercase text-[10px]">View Report</Badge>
              </div>
              <div className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="font-bold">100-Point Audit Completed</span>
                  <span className="text-xs text-muted-foreground">Today • Safety Score: 84/100 • New York, NY</span>
                </div>
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 font-bold uppercase text-[10px]">Review Report</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
