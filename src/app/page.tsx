
import Link from "next/link"
import { Zap, ShieldAlert, ShoppingBag, ArrowRight, Activity, MapPin, Sun, ClipboardList, ShieldCheck } from "lucide-react"
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
            Upload a photo of your electrical issue, audit your home safety, or manage backup power.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/diagnose">
              <Button size="lg" className="font-bold group">
                Scan Issue
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/audit">
              <Button size="lg" variant="outline" className="font-bold border-primary text-primary hover:bg-primary/10">
                100-Point Audit
                <ShieldCheck className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-20%] opacity-10 pointer-events-none">
          <Zap className="w-96 h-96 text-primary" />
        </div>
      </section>

      {/* Grid of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <Sun className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Lighting Tool</CardTitle>
            <CardDescription>Lumens & Quality</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/lighting-tool">
              <Button variant="link" className="p-0 text-primary h-auto">Test bulbs &rarr;</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <ClipboardList className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Generator Log</CardTitle>
            <CardDescription>Maintenance Tracker</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/generator-logs">
              <Button variant="link" className="p-0 text-primary h-auto">View logs &rarr;</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <MapPin className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Marketplace</CardTitle>
            <CardDescription>Verified Pros</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/marketplace">
              <Button variant="link" className="p-0 text-primary h-auto">Browse pros &rarr;</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <ShieldAlert className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Safety Audit</CardTitle>
            <CardDescription>NEC Compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/audit">
              <Button variant="link" className="p-0 text-primary h-auto">Start audit &rarr;</Button>
            </Link>
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
                  <span className="font-medium">100-Point Audit Completed</span>
                  <span className="text-xs text-muted-foreground">Today • Safety Score: 84/100</span>
                </div>
                <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">Review Report</Badge>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex flex-col">
                  <span className="font-medium">Generator: Oil Change Logged</span>
                  <span className="text-xs text-muted-foreground">Yesterday • 124 Engine Hours</span>
                </div>
                <Badge variant="secondary" className="text-green-500">Updated</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
