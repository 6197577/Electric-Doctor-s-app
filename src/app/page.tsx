import Link from "next/link"
import { Zap, ShieldAlert, ShoppingBag, ArrowRight, Activity, MapPin, Sun, ClipboardList, ShieldCheck, Globe, BatteryCharging, Video, Stethoscope, BarChart3 } from "lucide-react"
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
          <Badge variant="outline" className="w-fit border-primary text-primary px-4 py-1 uppercase tracking-widest text-[10px] font-bold">World-Class Emergency Care</Badge>
          <h1 className="text-5xl md:text-7xl font-black font-headline leading-[0.9] tracking-tighter">
            Electrical Emergency? <br />
            <span className="text-primary">Talk to a Doctor.</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-lg leading-relaxed">
            Instant AI diagnostics, $49 Master Electrician video consults, and predictive maintenance to prevent fires.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/video-consult">
              <Button size="lg" className="font-bold group h-14 px-8 bg-primary text-black hover:bg-primary/90">
                <Video className="mr-2 w-5 h-5" />
                Emergency Video Consult
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/predictive-maintenance">
              <Button size="lg" variant="outline" className="font-bold h-14 px-8 border-primary text-primary hover:bg-primary/10">
                Predictive Risk Scan
                <BarChart3 className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-[-5%] top-[-10%] opacity-5 pointer-events-none">
          <Stethoscope className="w-[600px] h-[600px] text-primary" />
        </div>
      </section>

      {/* Grid of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Video, title: "Video Doctor", desc: "Consult with a Master", href: "/video-consult", label: "Start Call", badge: "$49.00" },
          { icon: BarChart3, title: "Predictive AI", desc: "Prevent Failure Points", href: "/predictive-maintenance", label: "Discovery Scan", badge: "NEW" },
          { icon: BatteryCharging, title: "EV Readiness", desc: "Capacity Calculation", href: "/ev-readiness", label: "Get report", badge: "$29.99" },
          { icon: ShieldCheck, title: "Safety Audit", desc: "100-Point NEC Check", href: "/audit", label: "Book Audit", badge: "$47.93" }
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
          <p className="text-muted-foreground">Expert emergency support across the United States. Our "Emergency Video Doctor" is available nationwide.</p>
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
          Real-Time Emergency Activity
        </h2>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y border-t border-border">
              <div className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Emergency Video Consultation Initiated</span>
                    <Badge variant="secondary" className="text-[10px] bg-green-500/10 text-green-500">LIVE</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">Just Now • Master Electrician Sarah C. • Chicago, IL</span>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 font-bold uppercase text-[10px]">Active Session</Badge>
              </div>
              <div className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="font-bold">Dispatch Tracking Active</span>
                  <span className="text-xs text-muted-foreground">4 mins ago • En Route to Emergency • Boston, MA</span>
                </div>
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 font-bold uppercase text-[10px]">Track Pro</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
