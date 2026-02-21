"use client"

import { useState, useEffect } from "react"
import { 
  Briefcase, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Construction, 
  Zap,
  Info,
  CreditCard,
  Target,
  Lock,
  BarChart3,
  CalendarDays,
  Globe,
  Video,
  ScanSearch
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

type Step = 1 | 2 | 3 | 4 | 5

const chartData = [
  { model: "Pay As You Go", cost: 35, fill: "var(--color-paygo)" },
  { model: "Pre-paid (50)", cost: 22, fill: "var(--color-prepaid)" },
  { model: "Monthly Elite", cost: 0, fill: "var(--color-elite)" },
]

const chartConfig = {
  cost: {
    label: "Cost Per Lead ($)",
  },
  paygo: {
    label: "Pay As You Go",
    color: "hsl(var(--muted))",
  },
  prepaid: {
    label: "Pre-paid (50)",
    color: "hsl(var(--primary))",
  },
  elite: {
    label: "Monthly Flat-Rate",
    color: "#22c55e",
  },
} satisfies ChartConfig

export default function JoinNetworkPage() {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    contractorLicense: "",
    electricianLicense: "",
    licensingState: "",
    insuranceProvider: "",
    insurancePolicy: "",
    gmbLink: "",
    leadModel: "pay-as-you-go",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(prev => (prev + 1) as Step)
  const prevStep = () => setStep(prev => (prev - 1) as Step)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsSubmitting(false)
    setStep(5)
    toast({
      title: "Application Submitted",
      description: "Verification team & Stripe billing profile successfully initialized.",
    })
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Join the Pro Network</h1>
        <p className="text-muted-foreground">Apply to become a verified Electric Doctor and receive high-value leads. Payments processed via Stripe.</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <span>Step {step} of 4</span>
          <span>{step === 5 ? "Complete" : Math.round(((step - 1) / 4) * 100) + "%"}</span>
        </div>
        <Progress value={step === 5 ? 100 : ((step - 1) / 4) * 100} className="h-2" />
      </div>

      {step === 1 && (
        <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
          <CardHeader>
            <Briefcase className="w-5 h-5 text-primary" />
            <CardTitle>Professional Identity</CardTitle>
            <CardDescription>Tell us about yourself and your business.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Legal Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="John D. Electrician" 
                  value={formData.fullName} 
                  onChange={e => updateField('fullName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input 
                  id="company" 
                  placeholder="ACME Electrical LLC" 
                  value={formData.companyName} 
                  onChange={e => updateField('companyName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="pro@example.com" 
                  value={formData.email} 
                  onChange={e => updateField('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Phone</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="(555) 000-0000" 
                  value={formData.phone} 
                  onChange={e => updateField('phone', e.target.value)}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="gmb" className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  Google My Business Link
                </Label>
                <Input 
                  id="gmb" 
                  placeholder="https://g.page/your-business-name (Required for Verified status)" 
                  value={formData.gmbLink} 
                  onChange={e => updateField('gmbLink', e.target.value)}
                />
                <p className="text-[10px] text-muted-foreground italic">Linking your GMB page allows us to display your real-world ratings, building instant trust with customers.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full font-bold" onClick={nextStep}>
              Continue to Licensing
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
          <CardHeader>
            <Construction className="w-5 h-5 text-primary" />
            <CardTitle>Trade Licenses</CardTitle>
            <CardDescription>State verification requires valid contractor and master/journeyman numbers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">Licensing State</Label>
                <Input 
                  id="state" 
                  placeholder="e.g. California" 
                  value={formData.licensingState} 
                  onChange={e => updateField('licensingState', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractor">Contractor License #</Label>
                <Input 
                  id="contractor" 
                  placeholder="C-10 123456" 
                  value={formData.contractorLicense} 
                  onChange={e => updateField('contractorLicense', e.target.value)}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="master">Electrician License # (Master/Journeyman)</Label>
                <Input 
                  id="master" 
                  placeholder="LIC-998877" 
                  value={formData.electricianLicense} 
                  onChange={e => updateField('electricianLicense', e.target.value)}
                />
              </div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg border flex gap-3 text-xs text-muted-foreground">
              <Info className="w-4 h-4 text-primary shrink-0" />
              <p>License information is cross-referenced with state board databases for verification.</p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={prevStep}>Back</Button>
            <Button className="flex-[2] font-bold" onClick={nextStep}>
              Insurance & W-9
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
          <CardHeader>
            <ShieldCheck className="w-5 h-5 text-primary" />
            <CardTitle>Insurance & Tax (W-9)</CardTitle>
            <CardDescription>Final requirements for payout and liability compliance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">General Liability Insurance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insProvider">Insurance Provider</Label>
                  <Input 
                    id="insProvider" 
                    placeholder="e.g. Next Insurance" 
                    value={formData.insuranceProvider} 
                    onChange={e => updateField('insuranceProvider', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="policy">Policy Number</Label>
                  <Input 
                    id="policy" 
                    placeholder="POL-12345678" 
                    value={formData.insurancePolicy} 
                    onChange={e => updateField('insurancePolicy', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                W-9 Information
              </h4>
              <div className="p-4 border border-dashed rounded-xl bg-muted/20 flex flex-col items-center justify-center gap-2 text-center">
                <Upload className="w-6 h-6 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Upload Signed W-9 (Required for verification)</p>
                <Button variant="outline" size="sm">Select File</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={prevStep}>Back</Button>
            <Button className="flex-[2] font-bold" onClick={nextStep}>
              Billing & Leads
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
          <CardHeader>
            <Target className="w-5 h-5 text-primary" />
            <CardTitle>Monetization & Tool Access</CardTitle>
            <CardDescription>Select a billing model. Monthly Elite includes the Calendar Sync tool ($49/mo value).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="bg-muted/10 border rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Lead Cost Comparison
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase border-primary text-primary">Calendar Plugin: $49/mo Add-on</Badge>
                </div>
                <div className="h-[200px] w-full">
                  {mounted ? (
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <BarChart data={chartData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="model" tickLine={false} tickMargin={10} axisLine={false} fontSize={10} />
                        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} fontSize={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="cost" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <div className="h-full w-full bg-muted/5 flex items-center justify-center text-xs italic">Loading Market Data...</div>
                  )}
                </div>
              </div>

              <RadioGroup 
                value={formData.leadModel} 
                onValueChange={v => updateField('leadModel', v)}
                className="grid grid-cols-1 gap-4"
              >
                <div className={`p-4 border rounded-xl cursor-pointer transition-all ${formData.leadModel === 'monthly-elite' ? 'border-green-500 bg-green-500/5' : 'hover:border-muted-foreground/30'}`} onClick={() => updateField('leadModel', 'monthly-elite')}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="monthly-elite" id="monthly-elite" />
                      <Label htmlFor="monthly-elite" className="font-bold cursor-pointer text-lg">Pro Elite Monthly</Label>
                    </div>
                    <Badge className="bg-green-500 text-black font-black uppercase tracking-tighter">BEST FOR SCALE</Badge>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed"><strong>$499/mo Flat-Rate.</strong> Unlimited leads, unlimited scans, and the <strong>Google Calendar Sync Plugin INCLUDED.</strong></p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-green-500">
                      <CalendarDays className="w-3 h-3" />
                      FULL TOOL SUITE UNLOCKED
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 border rounded-xl cursor-pointer transition-all ${formData.leadModel === 'pre-paid' ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/30'}`} onClick={() => updateField('leadModel', 'pre-paid')}>
                    <div className="flex items-center gap-3 mb-2">
                      <RadioGroupItem value="pre-paid" id="pre-paid" />
                      <Label htmlFor="pre-paid" className="font-bold cursor-pointer">Pre-paid Leads</Label>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">$22/lead. No monthly fee. (Calendar Plugin: $49/mo Add-on)</p>
                    </div>
                  </div>
                  <div className={`p-4 border rounded-xl cursor-pointer transition-all ${formData.leadModel === 'pay-as-you-go' ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/30'}`} onClick={() => updateField('leadModel', 'pay-as-you-go')}>
                    <div className="flex items-center gap-3 mb-2">
                      <RadioGroupItem value="pay-as-you-go" id="pay-as-you-go" />
                      <Label htmlFor="pay-as-you-go" className="font-bold cursor-pointer">Pay As You Go</Label>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">$35/lead. No monthly fee. (Calendar Plugin: $49/mo Add-on)</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label className="text-base font-bold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Stripe Payment Method
                </Label>
                <Badge variant="outline" className="text-[10px] text-primary border-primary flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  Stripe Secure
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNum">Card Number</Label>
                  <Input 
                    id="cardNum" 
                    placeholder="4242 4242 4242 4242" 
                    value={formData.cardNumber}
                    onChange={e => updateField('cardNumber', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                    <Input 
                      id="expiry" 
                      placeholder="12/26" 
                      value={formData.expiry}
                      onChange={e => updateField('expiry', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123" 
                      value={formData.cvv}
                      onChange={e => updateField('cvv', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={prevStep}>Back</Button>
            <Button 
              className="flex-[2] font-bold bg-primary text-black hover:bg-primary/90" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing with Stripe..." : "Complete Application"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 5 && (
        <Card className="animate-in zoom-in-95 duration-500 text-center py-12">
          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl">Application Received!</CardTitle>
              <CardDescription className="text-lg">
                Your profile & Stripe billing are being verified.
              </CardDescription>
            </div>
            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 max-w-md w-full">
              <div className="space-y-4 text-left">
                 <h4 className="font-bold flex items-center gap-2 mb-2">
                   <ShieldCheck className="w-4 h-4 text-primary" />
                   Verified Master Access
                 </h4>
                 <div className="space-y-3">
                    <div className="flex items-start gap-2 text-xs">
                       <Globe className="w-4 h-4 text-primary shrink-0" />
                       <p>GMB Integration: <b>Connected</b>. Your ratings will appear in the marketplace once verified.</p>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                       <Video className="w-4 h-4 text-primary shrink-0" />
                       <p>Emergency Video Suite: <b>Enabled</b>. You can now accept $97 consults in your dashboard.</p>
                    </div>
                 </div>
              </div>
            </div>
            <Link href="/profile">
              <Button variant="outline" className="font-bold border-primary text-primary">Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}