"use client"

import { useState, useMemo } from "react"
import { Search, Star, MapPin, ShieldCheck, Zap, Info, Calendar, AlertCircle, Globe, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TOP_50_CITIES_PRICING } from "@/lib/pricing-data"
import { calculateDynamicRate, formatCurrency } from "@/lib/pricing-engine"
import Link from "next/link"

export const BASE_ELECTRICIANS = [
  {
    id: 1,
    name: "Alex Rivera",
    specialty: "Master Electrician",
    rating: 4.9,
    reviews: 124,
    distance: "1.2 miles",
    availability: "Immediate",
    baseHourlyRate: 145,
    image: "https://picsum.photos/seed/elec_p1/100/100",
    tags: ["Verified", "Emergency", "24/7", "GMB Legacy"]
  },
  {
    id: 2,
    name: "Sarah Chen",
    specialty: "EV & Smart Home Specialist",
    rating: 4.8,
    reviews: 89,
    distance: "2.5 miles",
    availability: "In 2 hours",
    baseHourlyRate: 160,
    image: "https://picsum.photos/seed/elec_p2/100/100",
    tags: ["Verified", "Green Tech", "GMB Legacy"]
  },
  {
    id: 3,
    name: "Mike Thompson",
    specialty: "Residential Expert",
    rating: 4.7,
    reviews: 210,
    distance: "3.1 miles",
    availability: "Tomorrow",
    baseHourlyRate: 125,
    image: "https://picsum.photos/seed/elec_p3/100/100",
    tags: ["Verified", "Low Price"]
  }
]

export default function MarketplacePage() {
  const [search, setSearch] = useState("")
  const [selectedCity, setSelectedCity] = useState("New York")
  const [demandFactor, setDemandFactor] = useState(1.15) // Simulating high demand

  const filteredElectricians = useMemo(() => {
    return BASE_ELECTRICIANS.filter(pro => 
      pro.name.toLowerCase().includes(search.toLowerCase()) || 
      pro.specialty.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Electrician Marketplace</h1>
          <p className="text-muted-foreground">Nearby qualified professionals matched to your diagnostic needs.</p>
        </div>
        
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Your Region</label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full md:w-64 border-primary/20">
              <SelectValue placeholder="Choose a city" />
            </SelectTrigger>
            <SelectContent>
              {TOP_50_CITIES_PRICING.map((city) => (
                <SelectItem key={city.city} value={city.city}>
                  {city.city}, {city.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
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
        <Zap className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary flex items-center gap-2">
          Dynamic Pricing Engine Active
          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary uppercase ml-2">Regional Logic</Badge>
        </AlertTitle>
        <AlertDescription className="text-xs">
          Rates are dynamically adjusted for <strong>{selectedCity}</strong> based on local labor costs and a current <strong>{(demandFactor * 100).toFixed(0)}%</strong> regional demand factor.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredElectricians.map((pro) => {
          const dynamicRate = calculateDynamicRate(pro.baseHourlyRate, selectedCity, demandFactor);
          const bookingFee = dynamicRate * 4; // Booking hold is a 4-hour minimum
          const hasGMB = pro.tags.includes("GMB Legacy");

          return (
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
                <CardTitle className="mt-4 flex items-center gap-2">
                  {pro.name}
                  {hasGMB && <Badge variant="outline" className="h-4 px-1.5 border-blue-500 text-blue-500 text-[8px] uppercase font-black"><Globe className="w-2 h-2 mr-1" /> GMB Verified</Badge>}
                </CardTitle>
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

                {hasGMB && (
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-2 flex items-center justify-between group/gmb">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center">
                        <Globe className="w-3 h-3 text-blue-500" />
                      </div>
                      <span className="text-[9px] font-bold text-blue-600">Verified Google Reviews</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-blue-400 opacity-0 group-hover/gmb:opacity-100 transition-opacity cursor-pointer" />
                  </div>
                )}

                <div className="mt-auto pt-4 flex flex-col gap-1 border-t border-border/50">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-muted-foreground">Dynamic Hourly Rate</span>
                    <span className="text-lg font-bold tracking-tighter text-primary">
                      {formatCurrency(dynamicRate)}/hr
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-muted-foreground">Booking Hold Fee (4h min)</span>
                    <span className="text-sm font-semibold opacity-70">{formatCurrency(bookingFee)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 p-4">
                <Link href={`/schedule/${pro.id}?city=${selectedCity}`} className="w-full">
                  <Button className="w-full font-bold group">
                    Schedule Service
                    <Calendar className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <section className="bg-card border border-primary/20 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
        <ShieldCheck className="w-12 h-12 text-primary" />
        <h2 className="text-2xl font-bold">Are you an Electrician?</h2>
        <p className="text-muted-foreground max-w-md">
          Join our network of verified professionals. Manage your availability, accept high-value leads in <strong>{selectedCity}</strong>, and track your jobs.
        </p>
        <Link href="/join-network">
          <Button variant="outline" size="lg" className="font-bold border-primary text-primary hover:bg-primary/10">
            Apply to Join Network
          </Button>
        </Link>
      </section>
    </div>
  )
}
