
"use client"

import { Check, Zap, Shield, Building2, User, Star, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const RESIDENTIAL_PLANS = [
  {
    name: "Home Standard",
    price: "$97",
    description: "Essential protection for your family home.",
    features: [
      "1x Annual 100-Point Audit",
      "Generator Maintenance Log",
      "Unlimited Lighting Scans",
      "Basic AI Diagnostic Tool",
      "Standard Priority Support"
    ],
    buttonText: "Subscribe via Stripe",
    popular: false
  },
  {
    name: "Home Pro",
    price: "$197",
    description: "Premium care for modern smart homes.",
    features: [
      "2x Annual 100-Point Audits",
      "Advanced AI Area Outage Scans",
      "Predictive Failure Alerts",
      "24/7 Priority Emergency Access",
      "10% Discount on Repairs"
    ],
    buttonText: "Go Pro via Stripe",
    popular: true
  }
]

const COMMERCIAL_PLANS = [
  {
    name: "Business Essential",
    price: "$199",
    description: "Safety compliance for small retail and offices.",
    features: [
      "Quarterly Safety Audits",
      "OSHA Compliance Reports",
      "Energy Efficiency Scans",
      "Dedicated Account Manager",
      "Employee Safety Training"
    ],
    buttonText: "Subscribe via Stripe",
    popular: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale electrical asset management.",
    features: [
      "Monthly Facility-Wide Audits",
      "Custom Compliance Dashboards",
      "Industrial Load Balancing AI",
      "On-site Emergency Response",
      "Custom API Integration"
    ],
    buttonText: "Contact Sales",
    popular: true
  }
]

export default function SubscriptionsPage() {
  const { toast } = useToast()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleSubscribe = async (planName: string) => {
    if (planName === "Enterprise") return // Contact sales logic
    
    setLoadingPlan(planName)
    // Simulate Stripe Checkout Redirect
    await new Promise(resolve => setTimeout(resolve, 1200))
    setLoadingPlan(null)
    toast({
      title: "Redirecting to Stripe",
      description: `Opening secure checkout for ${planName}...`,
    })
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 pb-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Choose Your Protection Level</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From single-family homes to industrial complexes, our Stripe-secured billing ensures seamless protection.
        </p>
      </div>

      <Tabs defaultValue="residential" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-[400px] grid-cols-2 h-12">
            <TabsTrigger value="residential" className="gap-2">
              <User className="w-4 h-4" />
              Residential
            </TabsTrigger>
            <TabsTrigger value="commercial" className="gap-2">
              <Building2 className="w-4 h-4" />
              Commercial
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="residential" className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {RESIDENTIAL_PLANS.map((plan) => (
            <Card key={plan.name} className={`relative flex flex-col h-full border-2 ${plan.popular ? "border-primary orange-glow" : "border-border"}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2">
                  <Badge className="bg-primary text-black font-bold px-4 py-1">MOST POPULAR</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  className={`w-full h-12 font-bold ${plan.popular ? "bg-primary" : "variant-outline border-primary text-primary hover:bg-primary/10"}`}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={loadingPlan !== null}
                >
                  {loadingPlan === plan.name ? "Redirecting..." : plan.buttonText}
                </Button>
                <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                  <Lock className="w-2.5 h-2.5" />
                  Secured by Stripe
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="commercial" className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {COMMERCIAL_PLANS.map((plan) => (
            <Card key={plan.name} className={`relative flex flex-col h-full border-2 ${plan.popular ? "border-primary orange-glow" : "border-border"}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Shield className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  className="w-full h-12 font-bold bg-primary"
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={loadingPlan !== null}
                >
                  {loadingPlan === plan.name ? "Redirecting..." : plan.buttonText}
                </Button>
                {plan.name !== "Enterprise" && (
                  <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                    <Lock className="w-2.5 h-2.5" />
                    Secured by Stripe
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <section className="bg-muted/30 rounded-3xl p-8 border border-border flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold">Not sure which one to pick?</h2>
          <p className="text-muted-foreground">
            Our AI can analyze your past job history and home size to recommend the most cost-effective Stripe plan for you.
          </p>
          <Button variant="outline" className="font-bold border-primary text-primary">Get Personal Recommendation</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="p-4 bg-background rounded-2xl border text-center">
            <p className="text-2xl font-black">15k+</p>
            <p className="text-[10px] text-muted-foreground uppercase">Homes Protected</p>
          </div>
          <div className="p-4 bg-background rounded-2xl border text-center">
            <p className="text-2xl font-black">400+</p>
            <p className="text-[10px] text-muted-foreground uppercase">Businesses Audit</p>
          </div>
        </div>
      </section>
    </div>
  )
}
