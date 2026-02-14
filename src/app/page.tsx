import Link from "next/link"
import { Zap, ShieldAlert, ShoppingBag, ArrowRight, Activity, MapPin, Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Hero / Quick Action */}
      <section className="relative overflow-hidden rounded-3xl bg-card p-8 border border-primary/20 orange-glow">
        <div className="relative z-10 flex flex-col gap-4 max-w-lg">
          <Badge variant="outline" className="w-fit border-primary text-primary">AI-Powered Diagnostic</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
            Stop Guessing. <br />
            <span className="text-primary">Start Fixing.</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload a photo of your electrical issue or check your lighting quality with AI.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/diagnose">
              <Button size="lg" className="font-bold group">
                Scan Issue
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/lighting-tool">
              <Button size="lg" variant="outline" className="font-bold border-primary text-primary hover:bg-primary/10">
                Check Lighting
                <Sun className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-20%] opacity-10 pointer-events-none">
          <Zap className="w-96 h-96 text-primary" />
        </div>
      </section>

      {/* Grid of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <Sun className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Lighting Tool</CardTitle>
            <CardDescription>Measure Lumens & Kelvin</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Instant analysis of your home lighting efficiency and color quality.
            </p>
            <Link href="/lighting-tool">
              <Button variant="link" className="p-0 text-primary h-auto">Test your bulbs &rarr;</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <MapPin className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Marketplace</CardTitle>
            <CardDescription>Verified Electricians Near You</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">12 Available</Badge>
              <Badge variant="secondary">Rapid Response</Badge>
            </div>
            <Link href="/marketplace">
              <Button variant="link" className="p-0 text-primary mt-4 h-auto">Browse pros &rarr;</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <ShieldAlert className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Safety Audit</CardTitle>
            <CardDescription>AI Safety Monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 text-sm text-green-500 font-medium">
              <Activity className="w-4 h-4" />
              All systems healthy
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Last safety sweep: 2 hours ago
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Recent Activity
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y border-t border-border">
              <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex flex-col">
                  <span className="font-medium">Kitchen Socket Diagnosis</span>
                  <span className="text-xs text-muted-foreground">Oct 24, 2023 • Diagnosis ID: #8821</span>
                </div>
                <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">Action Needed</Badge>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex flex-col">
                  <span className="font-medium">System Safety Audit</span>
                  <span className="text-xs text-muted-foreground">Oct 20, 2023 • Periodic Maintenance</span>
                </div>
                <Badge variant="secondary" className="text-green-500">Normal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
