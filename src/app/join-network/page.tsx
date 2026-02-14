
"use client"

import { useState } from "react"
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
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type Step = 1 | 2 | 3 | 4

export default function JoinNetworkPage() {
  const [step, setStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

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
    tin: "",
  })

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(prev => (prev + 1) as Step)
  const prevStep = () => setStep(prev => (prev - 1) as Step)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setStep(4)
    toast({
      title: "Application Submitted",
      description: "Our verification team will review your credentials within 48 hours.",
    })
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Join the Pro Network</h1>
        <p className="text-muted-foreground">Apply to become a verified Electric Doctor and receive high-value leads in your region.</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <span>Step {step} of 3</span>
          <span>{step === 4 ? "Complete" : Math.round(((step - 1) / 3) * 100) + "%"}</span>
        </div>
        <Progress value={step === 4 ? 100 : ((step - 1) / 3) * 100} className="h-2" />
      </div>

      {step === 1 && (
        <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Professional Identity
            </CardTitle>
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
            <CardTitle className="flex items-center gap-2">
              <Construction className="w-5 h-5 text-primary" />
              Trade Licenses
            </CardTitle>
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
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Insurance & Tax (W-9)
            </CardTitle>
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
              <div className="space-y-2">
                <Label htmlFor="tin">Taxpayer Identification Number (TIN/SSN)</Label>
                <Input 
                  id="tin" 
                  type="password"
                  placeholder="XX-XXXXXXX" 
                  value={formData.tin} 
                  onChange={e => updateField('tin', e.target.value)}
                />
              </div>
              <div className="p-4 border border-dashed rounded-xl bg-muted/20 flex flex-col items-center justify-center gap-2 text-center">
                <Upload className="w-6 h-6 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Upload Signed W-9 (Optional now, required for first payout)</p>
                <Button variant="outline" size="sm">Select File</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={prevStep}>Back</Button>
            <Button 
              className="flex-[2] font-bold" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card className="animate-in zoom-in-95 duration-500 text-center py-12">
          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl">Application Received!</CardTitle>
              <CardDescription className="text-lg">
                Thank you for applying to the Electric Doctor's network.
              </CardDescription>
            </div>
            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 max-w-md">
              <h4 className="font-bold flex items-center justify-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                What's Next?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our verification team will review your **Contractor License ({formData.contractorLicense})** and **Electrician License** with the state board. You'll receive an email confirmation once approved.
              </p>
            </div>
            <Link href="/marketplace">
              <Button variant="outline" className="font-bold">Return to Marketplace</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
