
"use client"

import { useState } from "react"
import { Search, Star, MapPin, ShieldCheck, Zap, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const electricians = [
  {
    id: 1,
    name: "Alex Rivera",
    specialty: "Master Electrician",
    rating: 4.9,
    reviews: 124,
    distance: "1.2 miles",
    availability: "Immediate",
    hourlyRate: 145,
    surge: 1.2,
    image: "https://picsum.photos/seed/elec_p1/100/100",
    tags: ["Verified", "Emergency", "24/7"]
  },
  {
    id: 2,
    name: "Sarah Chen",
    specialty: "EV & Smart Home Specialist",
    rating: 4.8,
    reviews: 89,
    distance: "2.5 miles",
    availability: "In 2 hours",
    hourlyRate: 160,
    surge: 1.0,
    image: "https://picsum.photos/seed/elec_p2/100/100",
    tags: ["Verified", "Green Tech"]
  },
  {
    id: 3,
    name: "Mike Thompson",
    specialty: "Residential Expert",
    rating: 4.7,
    reviews: 210,
    distance: "3.1 miles",
    availability: "Tomorrow",
    hourlyRate: 125,
    surge: 1.0,
    image: "https://picsum.photos/seed/elec_p3/100/100",
    tags: ["Verified", "Low Price"]
  }
]

export default function MarketplacePage() {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Electrician Marketplace</h1>
          <p className="text-muted-foreground">Nearby qualified professionals matched to your diagnostic needs.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by specialty or name..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">Dynamic Pricing Active</AlertTitle>
        <AlertDescription className="text-xs">
          High demand in your area. Rates may be adjusted to ensure rapid dispatch for emergency calls.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {electricians.map((pro) => (
          <Card key={pro.id} className="group hover:border-primary/40 transition-all flex flex-col h-full overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <Avatar className="w-16 h-16 border-2 border-primary/10">
                  <AvatarImage src={pro.image} alt={pro.name} />
                  <AvatarFallback>{pro.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center text-primary font-bold">
                    <Star className="w-4 h-4 fill-primary mr-1" />
                    {pro.rating}
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase">{pro.reviews} reviews</span>
                </div>
              </div>
              <CardTitle className="mt-4">{pro.name}</CardTitle>
              <CardDescription>{pro.specialty}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {pro.distance}
                </div>
                <div className="flex items-center">
                  <Zap className="w-3 h-3 mr-1 text-primary" />
                  {pro.availability}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {pro.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-[9px] h-5 bg-muted/50">
                    {tag === "Verified" && <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />}
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto pt-4 flex flex-col gap-1 border-t border-border/50">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-muted-foreground">Booking Hold Fee</span>
                  <span className="text-xl font-bold tracking-tighter">$2,597.00</span>
                </div>
                <p className="text-[10px] text-muted-foreground text-right italic">
                  Charged for time investment on call. Fully refundable if canceled 24h prior.
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 p-4">
              <Button className="w-full font-bold group">
                Request Service
                <Zap className="ml-2 w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="bg-card border border-primary/20 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
        <ShieldCheck className="w-12 h-12 text-primary" />
        <h2 className="text-2xl font-bold">Are you an Electrician?</h2>
        <p className="text-muted-foreground max-w-md">
          Join our network of verified professionals. Manage your availability, accept high-value leads, and track your jobs.
        </p>
        <Button variant="outline" size="lg" className="font-bold border-primary text-primary hover:bg-primary/10">
          Apply to Join Network
        </Button>
      </section>
    </div>
  )
}
