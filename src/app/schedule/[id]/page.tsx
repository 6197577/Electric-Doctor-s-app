
"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Calendar as CalendarIcon, Clock, CreditCard, Lock, CheckCircle2, ArrowRight, ArrowLeft, Loader2, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { calculateDynamicRate, formatCurrency } from "@/lib/pricing-engine"
import { BASE_ELECTRICIANS } from "@/app/marketplace/page"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

const TIME_SLOTS = [
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM"
]

export default function SchedulePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  
  const [step, setStep] = useState<"date" | "time" | "payment" | "confirmed">("date")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const proId = parseInt(params.id as string)
  const city = searchParams.get("city") || "New York"
  
  const pro = useMemo(() => {
    return BASE_ELECTRICIANS.find(p => p.id === proId) || BASE_ELECTRICIANS[0]
  }, [proId])

  const dynamicRate = calculateDynamicRate(pro.baseHourlyRate, city, 1.15)
  const bookingFee = dynamicRate * 4

  const handleNext = () => {
    if (step === "date" && date) setStep("time")
    else if (step === "time" && selectedSlot) setStep("payment")
  }

  const handleBack = () => {
    if (step === "time") setStep("date")
    else if (step === "payment") setStep("time")
  }

  const handlePayment = async (method: "stripe" | "google") => {
    setIsProcessing(true)
    // Simulate payment gateway delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setStep("confirmed")
    toast({
      title: "Appointment Confirmed",
      description: `Your service with ${pro.name} has been scheduled for ${date ? format(date, 'PPP') : 'selected date'}.`,
    })
  }

  if (!mounted) return null

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-primary/20">
            <AvatarImage src={pro.image} alt={pro.name} />
            <AvatarFallback>{pro.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Schedule {pro.name}</h1>
            <p className="text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              {pro.specialty} • {city} Service
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Hold Fee</p>
          <p className="text-2xl font-black text-primary">{formatCurrency(bookingFee)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === "date" && (
            <Card className="animate-in fade-in slide-in-from-left-4 duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Select Service Date
                </CardTitle>
                <CardDescription>Choose a day that works best for your on-site visit.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-0 pb-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-none"
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                />
              </CardContent>
              <CardFooter className="border-t bg-muted/20">
                <Button className="w-full font-bold" onClick={handleNext} disabled={!date}>
                  Confirm Date & Pick Time
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === "time" && (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Pick Arrival Window
                </CardTitle>
                <CardDescription>Selected Date: {date ? format(date, 'MMMM do, yyyy') : "N/A"}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3">
                {TIME_SLOTS.map(slot => (
                  <Button
                    key={slot}
                    variant={selectedSlot === slot ? "default" : "outline"}
                    className={`h-14 justify-between font-bold px-6 ${selectedSlot === slot ? "border-primary" : "hover:border-primary/50"}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                    {selectedSlot === slot && <CheckCircle2 className="w-5 h-5 text-black" />}
                  </Button>
                ))}
              </CardContent>
              <CardFooter className="flex gap-4 border-t bg-muted/20">
                <Button variant="ghost" onClick={handleBack} className="flex-1">Back</Button>
                <Button className="flex-[2] font-bold" onClick={handleNext} disabled={!selectedSlot}>
                  Secure with Payment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === "payment" && (
            <Card className="animate-in zoom-in-95 duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Secure Booking Payout
                </CardTitle>
                <CardDescription>Review your appointment details and complete booking.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-muted/50 border border-white/5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Professional</span>
                    <span className="font-bold">{pro.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-bold">{date ? format(date, 'PPP') : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Window</span>
                    <span className="font-bold">{selectedSlot}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-16 flex items-center justify-between px-6 border-primary/20 hover:border-primary/50"
                    onClick={() => handlePayment('stripe')}
                    disabled={isProcessing}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-primary" />
                      <div className="text-left">
                        <p className="font-bold">Pay with Stripe</p>
                        <p className="text-[10px] text-muted-foreground uppercase">Card, Apple Pay, Link</p>
                      </div>
                    </div>
                    {isProcessing ? <Loader2 className="animate-spin w-5 h-5" /> : <ArrowRight className="w-4 h-4" />}
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-16 flex items-center justify-between px-6 border-primary/20 hover:border-primary/50"
                    onClick={() => handlePayment('google')}
                    disabled={isProcessing}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg viewBox="0 0 40 40" className="w-5 h-5">
                          <path fill="#4285F4" d="M39.2 20.4c0-1.4-.1-2.7-.4-4H20v7.6h10.8c-.5 2.5-1.9 4.6-4 6v5h6.4c3.8-3.5 6-8.6 6-14.6z"/>
                          <path fill="#34A853" d="M20 40c5.4 0 9.9-1.8 13.2-4.9l-6.4-5c-1.8 1.2-4.2 2-6.8 2-5.2 0-9.7-3.5-11.3-8.3H2.2v5.2C5.5 35.6 12.3 40 20 40z"/>
                          <path fill="#FBBC05" d="M8.7 23.8C8.3 22.6 8.1 21.3 8.1 20s.2-2.6.6-3.8V11H2.2C.8 13.7 0 16.7 0 20s.8 6.3 2.2 9l6.5-5.2z"/>
                          <path fill="#EA4335" d="M20 8.1c2.9 0 5.6 1 7.6 2.9l5.7-5.7C29.8 2 25.4 0 20 0 12.3 0 5.5 4.4 2.2 11l6.5 5.2c1.6-4.8 6.1-8.1 11.3-8.1z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-bold">Google Pay</p>
                        <p className="text-[10px] text-muted-foreground uppercase">Fast & Secure Checkout</p>
                      </div>
                    </div>
                    {isProcessing ? <Loader2 className="animate-spin w-5 h-5" /> : <ArrowRight className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 border-t bg-muted/20">
                <Button variant="ghost" className="w-full" onClick={handleBack} disabled={isProcessing}>Change Details</Button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase font-black">
                  <ShieldCheck className="w-3 h-3" />
                  256-Bit Encrypted Transaction
                </div>
              </CardFooter>
            </Card>
          )}

          {step === "confirmed" && (
            <Card className="animate-in zoom-in-95 duration-500 py-12 text-center border-primary/50 orange-glow">
              <CardContent className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center relative">
                   <CheckCircle2 className="w-16 h-16 text-primary" />
                   <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-4xl font-black italic">Booking Confirmed!</CardTitle>
                  <CardDescription className="text-lg">
                    {pro.name} is scheduled to arrive on <strong>{date ? format(date, 'PPPP') : 'selected date'}</strong>.
                  </CardDescription>
                </div>
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 max-w-md w-full">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Arrival Window</span>
                      <Badge className="bg-primary text-black font-black">{selectedSlot}</Badge>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-start gap-3 text-left text-sm">
                         <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                         <p>Marcus has received your initial diagnostic report and is preparing the necessary components.</p>
                      </div>
                   </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => router.push('/tracking')} className="font-bold border-primary text-primary">
                    Live Dispatch Tracking
                  </Button>
                  <Button onClick={() => router.push('/')} variant="ghost">Return Home</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider">Service Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hourly Rate</span>
                <span className="font-bold">{formatCurrency(dynamicRate)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Booking Hold</span>
                <span className="font-bold">4 Hours</span>
              </div>
              <div className="pt-2 border-t flex justify-between font-black text-lg">
                <span>Hold Total</span>
                <span className="text-primary">{formatCurrency(bookingFee)}</span>
              </div>
              <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                Hold fee covers the first 4 hours of labor. Additional hours will be billed on-site via our secure pro-app.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Why Pre-Pay?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
               <div className="flex items-start gap-3 text-xs leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  </div>
                  <span>Guaranteed arrival window with prioritized dispatch.</span>
               </div>
               <div className="flex items-start gap-3 text-xs leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  </div>
                  <span>Fully refundable if canceled 24 hours in advance.</span>
               </div>
               <div className="flex items-start gap-3 text-xs leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  </div>
                  <span>Payment processed via Stripe or Google Pay for maximum security.</span>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
