import Link from "next/link"
import { Zap, ShieldAlert, ShoppingBag, ArrowRight, Activity, MapPin, Sun, ClipboardList, ShieldCheck, Globe, BatteryCharging, Video, Stethoscope, BarChart3, TrendingUp, Calculator, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TOP_50_CITIES_PRICING } from "@/lib/pricing-data"

export default function Home() {
  const featuredCities = TOP_50_CITIES_PRICING.slice(0, 12);

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
            Instant AI diagnostics, $49 Master Electrician video consults, and predictive maintenance to prevent electrical fires.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/video-consult">
              <Button size="lg" className="font-black group h-16 px-10 bg-primary text-black hover:bg-primary/90 text-lg rounded-2xl shadow-2xl">
                <Video className="mr-3 w-6 h-6" />
                Emergency Video Consult
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/predictive-maintenance">
              <Button size="lg" variant="outline" className="font-black h-16 px-10 border-primary/40 text-primary hover:bg-primary/10 text-lg rounded-2xl">
                Predictive Risk Scan
                <BarChart3 className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-10%] opacity-[0.03] pointer-events-none">
          <Stethoscope className="w-[800px] h-[800px] text-primary" />
        </div>
      </section>

      {/* High-Impact Sales Banner - Cost of Downtime */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-primary/5 rounded-[2rem] p-8 md:p-12 border border-primary/20">
        <div className="space-y-6">
          <Badge className="bg-primary text-black font-black uppercase tracking-widest text-[10px]">Revenue Protection</Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
            Stop Guessing. <br/>Start <span className="text-primary italic">Predicting.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-medium">
            Our proprietary <span className="text-foreground font-bold">Cost of Downtime Calculator</span> models your specific residential risk factors to show exactly how much an emergency failure will cost you this year.
          </p>
          <Link href="/predictive-maintenance">
            <Button className="h-14 px-8 font-black bg-white text-black hover:bg-white/90 rounded-xl gap-3">
              <Calculator className="w-5 h-5" />
              Calculate My Risk ROI
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-black/40 border-primary/20 p-6 flex flex-col gap-2">
            <span className="text-3xl font-black text-primary">12.4x</span>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Avg. ROI</span>
          </Card>
          <Card className="bg-black/40 border-primary/20 p-6 flex flex-col gap-2">
            <span className="text-3xl font-black text-primary">85%</span>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Fire Reduction</span>
          </Card>
          <Card className="bg-black/40 border-primary/20 p-6 flex flex-col gap-2">
            <span className="text-3xl font-black text-primary">$4,130</span>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">5yr Avoidance</span>
          </Card>
          <Card className="bg-black/40 border-primary/20 p-6 flex flex-col gap-2">
            <span className="text-3xl font-black text-primary">24/7</span>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">AI Monitoring</span>
          </Card>
        </div>
      </section>

      {/* Grid of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Video, title: "Video Doctor", desc: "Instant Master Access", href: "/video-consult", label: "Start Call", badge: "$49.00" },
          { icon: BarChart3, title: "Predictive AI", desc: "Prevent Failure Points", href: "/predictive-maintenance", label: "Discovery Scan", badge: "NEW" },
          { icon: BatteryCharging, title: "EV Readiness", desc: "Capacity Calculation", href: "/ev-readiness", label: "Get report", badge: "$29.99" },
          { icon: ShieldCheck, title: "Safety Audit", desc: "100-Point NEC Check", href: "/audit", label: "Book Audit", badge: "$47.93" }
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

      {/* Trust & Social Proof Section */}
      <section className="flex flex-col gap-12 py-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Trusted by 15,000+ Homeowners</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium italic">"The Electrical Doctor platform saved my home from a fire. Their predictive AI caught a loose neutral connection I never would have seen." - Marcus T., Chicago</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">NEC Certified</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Zap className="w-8 h-8 text-primary" />
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Instant Response</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Activity className="w-8 h-8 text-primary" />
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Live Monitoring</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Stethoscope className="w-8 h-8 text-primary" />
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Master Pro Match</span>
            </div>
        </div>
      </section>

      {/* SEO Section - Service Areas */}
      <section className="flex flex-col gap-8 py-12 border-t border-white/5">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <Globe className="w-10 h-10 text-primary" />
            Nationwide Service Coverage
          </h2>
          <p className="text-muted-foreground text-lg font-medium">Expert emergency support across the United States. Our "Emergency Video Doctor" is available 24/7 in all 50 states.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {featuredCities.map((city) => (
            <Link 
              key={city.city} 
              href={`/services/marketplace/${city.city.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-6 py-4 rounded-2xl border bg-card/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-black flex items-center justify-between group"
            >
              <span>{city.city}</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </Link>
          ))}
        </div>
        <Link href="/marketplace" className="text-primary font-black flex items-center gap-3 hover:underline text-lg">
          Explore all 50+ service regions <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-8">
        <h2 className="text-4xl font-black tracking-tighter flex items-center gap-4">
          <Activity className="w-10 h-10 text-primary" />
          Real-Time Network Pulse
        </h2>
        <Card className="overflow-hidden border-primary/20 bg-card/30 backdrop-blur-xl">
          <CardContent className="p-0">
            <div className="divide-y border-t border-white/5">
              <div className="p-6 flex items-center justify-between hover:bg-primary/5 transition-colors">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-lg">Emergency Video Consultation Initiated</span>
                    <Badge variant="secondary" className="text-[10px] bg-green-500/10 text-green-500 font-black animate-pulse">LIVE</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium italic">Just Now • Master Electrician Sarah C. • Chicago, IL</span>
                </div>
                <Badge className="bg-primary text-black font-black uppercase text-[10px] px-4 py-1.5">Active Session</Badge>
              </div>
              <div className="p-6 flex items-center justify-between hover:bg-primary/5 transition-colors">
                <div className="flex flex-col gap-2">
                  <span className="font-black text-lg">Dispatch Tracking Active</span>
                  <span className="text-sm text-muted-foreground font-medium italic">4 mins ago • En Route to Emergency • Boston, MA</span>
                </div>
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 font-black uppercase text-[10px] px-4 py-1.5">Track Pro</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
