"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  RefreshCcw,
  Camera,
  Upload,
  Stethoscope,
  X,
  Plus,
  CalendarCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { calculateDynamicRate, formatCurrency } from "@/lib/pricing-engine"
import { BASE_ELECTRICIANS } from "@/app/marketplace/page"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { aiDiagnosticAssistant, AiDiagnosticAssistantOutput } from "@/ai/flows/ai-diagnostic-assistant"
import Image from "next/image"

type ScheduleStep = "date" | "time" | "diagnosis" | "payment" | "confirmed"

const TIME_SLOTS = [
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM"
]

const MAX_PHOTOS = 5

export default function SchedulePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  
  const [step, setStep] = useState<ScheduleStep>("date")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  
  // Diagnosis State
  const [files, setFiles] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [diagnosisResults, setDiagnosisResults] = useState<AiDiagnosticAssistantOutput | null>(null)

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || [])
    if (files.length + uploadedFiles.length > MAX_PHOTOS) {
      toast({ title: "Limit Exceeded", description: `You can upload up to ${MAX_PHOTOS} photos.`, variant: "destructive" })
      return
    }

    uploadedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFiles(prev => [...prev, reader.result as string].slice(0, MAX_PHOTOS))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const runDiagnosis = async () => {
    if (files.length === 0) {
      toast({ title: "Photo Required", description: "Please provide at least one photo of the malfunction.", variant: "destructive" })
      return
    }
    setIsAnalyzing(true)
    try {
      const result = await aiDiagnosticAssistant({
        photoDataUris: files,
        description: `Booking diagnosis for ${pro.name} appointment. ${files.length} photos provided.`
      })
      setDiagnosisResults(result)
      toast({ title: "Scan Complete", description: "Comprehensive diagnosis report attached to your booking." })
    } catch (error) {
      toast({ title: "Scan Failed", description: "Could not complete AI scan. Please skip or try again.", variant: "destructive" })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNext = () => {
    if (step === "date" && date) setStep("time")
    else if (step === "time" && selectedSlot) setStep("diagnosis")
    else if (step === "diagnosis") setStep("payment")
  }

  const handleBack = () => {
    if (step === "time") setStep("date")
    else if (step === "diagnosis") setStep("time")
    else if (step === "payment") setStep("diagnosis")
  }

  const handlePayment = async (method: "stripe" | "google") => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setStep("confirmed")
    toast({
      title: "Appointment Confirmed",
      description: `Your service with ${pro.name} has been scheduled.`,
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
            <div className="flex items-center gap-3">
              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <ShieldCheck className="w-4 h-4 text-primary" />
                {pro.specialty} • {city} Service
              </p>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 text-[9px] font-black uppercase tracking-widest">
                <CalendarCheck className="w-3 h-3 mr-1" />
                Google Calendar Synced
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Hold Fee (4h min)</p>
          <p className="text-2xl font-black text-primary">{formatCurrency(bookingFee)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === "date" && (
            <Card className="animate-in fade-in slide-in-from-left-4 duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    Select Service Date
                  </CardTitle>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase">
                    <span className="w-2 h-2 rounded-full bg-green-500" /> Live Availability
                  </div>
                </div>
                <CardDescription>Choose a day for your on-site visit. Calendar synced with {pro.name.split(' ')[0]}&apos;s real-time schedule.</CardDescription>
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
                <Button className="w-full font-bold h-12" onClick={handleNext} disabled={!date}>
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
                <Button className="flex-[2] font-bold h-12" onClick={handleNext} disabled={!selectedSlot}>
                  Continue to Diagnosis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === "diagnosis" && (
            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden">
              <div className="bg-primary/10 px-6 py-3 border-b border-primary/20 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <Stethoscope className="w-3 h-3" />
                  Pre-Visit AI Diagnostic Scan
                </span>
                <Badge variant="outline" className="border-primary text-primary text-[10px]">UP TO 5 PHOTOS</Badge>
              </div>
              <CardHeader>
                <CardTitle>Malfunction Briefing</CardTitle>
                <CardDescription>Provide up to {MAX_PHOTOS} photos of the issue. Our AI analyzes the set for {pro.name.split(' ')[0]} to review.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!diagnosisResults ? (
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {files.map((file, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm border group">
                          <Image src={file} alt={`Issue ${idx + 1}`} fill className="object-cover" />
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="absolute top-1 right-1 rounded-full h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeFile(idx)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {files.length < MAX_PHOTOS && (
                        <div 
                          className="aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/30 transition-all bg-muted/10"
                          onClick={() => document.getElementById('diagInput')?.click()}
                        >
                          <Plus className="w-8 h-8 text-muted-foreground" />
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Add Photo</span>
                        </div>
                      )}
                    </div>
                    
                    <input id="diagInput" type="file" className="hidden" accept="image/*" multiple onChange={handleFileUpload} />
                    
                    <Button 
                      className="w-full h-12 font-black" 
                      disabled={files.length === 0 || isAnalyzing}
                      onClick={runDiagnosis}
                    >
                      {isAnalyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing {files.length} Photos...</> : `Run AI Scan on ${files.length} Photos`}
                    </Button>
                    <p className="text-[10px] text-muted-foreground text-center italic">
                      Uploading multiple angles helps the AI provide a more accurate safety assessment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 space-y-3">
                       <h4 className="text-xs font-black uppercase text-primary flex items-center gap-2">
                         <Zap className="w-4 h-4" /> Comprehensive Multi-Angle Diagnosis
                       </h4>
                       <p className="text-sm font-medium leading-relaxed italic">"{diagnosisResults.overallDiagnosis}"</p>
                       <div className="grid grid-cols-2 gap-2">
                          {diagnosisResults.identifiedParts.map((p, i) => (
                            <Badge key={i} variant="secondary" className="text-[9px] bg-background/50 truncate">{p.partName}: {p.condition}</Badge>
                          ))}
                       </div>
                    </div>
                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-amber-600">Pro Review Initialized</p>
                        <p className="text-xs text-muted-foreground leading-tight">Your {files.length} photos and diagnostic report are now in {pro.name}&apos;s dispatch queue for pre-visit analysis.</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex gap-4 border-t bg-muted/20">
                <Button variant="ghost" onClick={handleBack} className="flex-1">Back</Button>
                <Button className="flex-[2] font-bold h-12" onClick={handleNext} disabled={!diagnosisResults}>
                  Continue to Payment
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
                <CardDescription>Review appointment details and complete booking.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-muted/50 border border-white/5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Professional</span>
                    <span className="font-bold">{pro.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Window</span>
                    <span className="font-bold">{date ? format(date, 'MMM do') : 'N/A'} @ {selectedSlot}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                    <span className="text-muted-foreground">Multi-Angle AI Report</span>
                    <Badge className="bg-green-500 text-black font-black text-[9px] uppercase">Attached ({files.length} Photos)</Badge>
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
                        <p className="text-[10px] text-muted-foreground uppercase">72H Cancel Policy Active</p>
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
                        <p className="text-[10px] text-muted-foreground uppercase">Secure Checkout</p>
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
                  Stripe PCI Compliant Gateway
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
                    {pro.name} will arrive on <strong>{date ? format(date, 'PPPP') : 'selected date'}</strong>.
                  </CardDescription>
                </div>
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 max-w-md w-full">
                   <div className="space-y-4 text-left">
                      <div className="flex items-start gap-3 text-sm">
                         <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                         <p className="font-medium">Multi-Angle Report Transmitted: {pro.name.split(' ')[0]} has received your {files.length} photos for pre-visit briefing.</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg border text-[10px] leading-relaxed">
                        <p className="font-bold uppercase mb-1 text-destructive">Cancellation Policy Reminder</p>
                        Full refund if canceled at least 72h prior. Cancellations after this window help compensate the pro for reserved routing.
                      </div>
                   </div>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => router.push('/tracking')} className="font-bold">
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
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
                <RefreshCcw className="w-3 h-3" />
                Reschedule Anytime
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
               <p className="text-[10px] leading-relaxed text-muted-foreground">
                 Cancellations require 72h notice for a full refund. Reschedule for free up to 24h before.
               </p>
               <div className="flex items-start gap-3 text-xs leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  </div>
                  <span>1-Time Free Reschedule Incentive</span>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
