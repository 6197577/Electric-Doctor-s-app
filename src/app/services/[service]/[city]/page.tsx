
"use client"

import { useMemo, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { SERVICES, getServiceById, generateServiceCityTitle, generateServiceCityDescription } from "@/lib/seo-utils"
import { TOP_50_CITIES_PRICING } from "@/lib/pricing-data"
import { calculateDynamicRate, formatCurrency } from "@/lib/pricing-engine"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, ShieldCheck, MapPin, ArrowRight, Star, CheckCircle2 } from "lucide-react"
import Link from "next/link"

/**
 * @fileOverview Dynamic SEO Landing Page for Service + City combinations.
 */

export default function ServiceCityLandingPage() {
  const params = useParams()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const serviceId = params.service as string
  const citySlug = params.city as string

  const cityData = useMemo(() => {
    return TOP_50_CITIES_PRICING.find(c => c.city.toLowerCase().replace(/\s+/g, '-') === citySlug)
  }, [citySlug])

  const serviceData = useMemo(() => {
    return getServiceById(serviceId)
  }, [serviceId])

  if (!mounted || !cityData || !serviceData) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading local service data...</div>
  }

  const baseRate = 145 // Default for calculations
  const localRate = calculateDynamicRate(baseRate, cityData.city, 1.0)

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12 pb-16">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Electric Doctor's ${serviceData.name}`,
            "description": serviceData.description,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": cityData.city,
              "addressRegion": cityData.state,
              "addressCountry": "US"
            },
            "priceRange": "$$",
            "areaServed": cityData.city
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-card p-10 border border-primary/20 orange-glow flex flex-col gap-6">
        <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary text-primary uppercase tracking-widest">Local Expert Service</Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">Available Now</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            Professional <span className="text-primary">{serviceData.name}</span> in {cityData.city}, {cityData.state}
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed">
            The #1 AI-driven electrical safety platform is now serving {cityData.city}. Get instant diagnostics, NEC audits, and local pro matching starting at <span className="text-foreground font-bold">{formatCurrency(localRate)}/hr</span>.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href={`/${serviceId}`}>
              <Button size="lg" className="font-bold group h-14 px-8">
                Start My {serviceData.name}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button size="lg" variant="outline" className="font-bold h-14 px-8 border-primary text-primary hover:bg-primary/10">
                Browse {cityData.city} Electricians
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-10%] opacity-5 pointer-events-none">
          <Zap className="w-[500px] h-[500px] text-primary" />
        </div>
      </section>

      {/* Local Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <ShieldCheck className="w-10 h-10 text-primary mb-2" />
            <CardTitle className="text-lg">Verified Safety</CardTitle>
            <CardDescription>All inspections in {cityData.city} adhere strictly to National Electrical Code standards.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <MapPin className="w-10 h-10 text-primary mb-2" />
            <CardTitle className="text-lg">Local Pro Match</CardTitle>
            <CardDescription>Automatically match with electricians who know {cityData.city}'s specific building requirements.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <Zap className="w-10 h-10 text-primary mb-2" />
            <CardTitle className="text-lg">Instant AI Results</CardTitle>
            <CardDescription>Don't wait for a site visit. Get initial diagnostic results for your {cityData.city} home in seconds.</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Detailed Service Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Electric Doctor's for {serviceData.name}?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our platform combines cutting-edge computer vision AI with decades of electrical engineering expertise. Whether you're in the heart of {cityData.city} or the surrounding metro area, we provide:
          </p>
          <ul className="space-y-4">
            {[
              "Real-time regional labor rate adjustments",
              "NEC-compliant 100-point safety auditing",
              "Photographic verification of all identified faults",
              "Direct booking with top-rated local masters"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Card className="p-8 border-primary/20 bg-muted/20">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-1 text-primary">
              <Star className="w-6 h-6 fill-primary" />
              <Star className="w-6 h-6 fill-primary" />
              <Star className="w-6 h-6 fill-primary" />
              <Star className="w-6 h-6 fill-primary" />
              <Star className="w-6 h-6 fill-primary" />
            </div>
            <p className="text-lg italic font-medium">
              "The {serviceData.name.toLowerCase()} saved me hundreds on a repair that a local company misdiagnosed. Being in {cityData.city}, I appreciated the local rate transparency."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold">JD</div>
              <div className="text-left">
                <p className="text-sm font-bold">John D.</p>
                <p className="text-[10px] text-muted-foreground uppercase">Verified Homeowner in {cityData.city}</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Final Call to Action */}
      <section className="bg-primary p-12 rounded-3xl text-black text-center space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Ready to secure your {cityData.city} home?</h2>
        <p className="max-w-xl mx-auto font-medium opacity-80">
          Join thousands of homeowners in {cityData.state} using AI to prevent electrical fires and system failures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${serviceId}`}>
            <Button size="lg" variant="secondary" className="font-black bg-black text-primary hover:bg-black/90 px-10 h-14">
              GO TO {serviceId.toUpperCase()}
            </Button>
          </Link>
          <Link href="/subscriptions">
            <Button size="lg" variant="outline" className="font-black border-black/20 hover:bg-black/5 px-10 h-14">
              VIEW LOCAL PLANS
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
