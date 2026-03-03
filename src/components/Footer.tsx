
import Link from "next/link"
import { Zap, ShieldCheck, Mail, MapPin, Phone, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
              <Zap className="w-8 h-8 text-primary fill-primary" />
              <span>ELECTRIC <span className="text-primary">DOCTOR&apos;S</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              The world's first AI-driven electrical safety platform. 24/7 emergency support and predictive maintenance for modern homes and facilities.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-4 h-4 text-primary" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Linkedin className="w-4 h-4 text-primary" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Github className="w-4 h-4 text-primary" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-black mb-8 text-xs uppercase tracking-[0.3em] text-white/40">Solutions</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground font-medium">
              <li><Link href="/diagnose" className="hover:text-primary transition-colors">AI Diagnostic Scan</Link></li>
              <li><Link href="/video-consult" className="hover:text-primary transition-colors">Emergency Video Consult</Link></li>
              <li><Link href="/audit" className="hover:text-primary transition-colors">Residential Safety Audit</Link></li>
              <li><Link href="/commercial-audit" className="hover:text-primary transition-colors">Commercial Compliance</Link></li>
              <li><Link href="/products/smart-panels" className="hover:text-primary transition-colors">Smart Panel Upgrades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 text-xs uppercase tracking-[0.3em] text-white/40">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Mission</Link></li>
              <li><Link href="/marketplace" className="hover:text-primary transition-colors">Find an Electrician</Link></li>
              <li><Link href="/join-network" className="hover:text-primary transition-colors">Join Pro Network</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-black mb-2 text-xs uppercase tracking-[0.3em] text-white/40">HQ & Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-muted-foreground font-medium">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span>One World Trade Center<br />Suite 85, New York, NY 10007</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>304-410-9208</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@emergencyelectricrepair.com</span>
              </div>
            </div>
            <div className="pt-4">
              <Badge variant="outline" className="border-primary/30 text-primary text-[10px] uppercase font-black tracking-widest px-4 py-1">
                <ShieldCheck className="w-3 h-3 mr-2" />
                NEC 2023 COMPLIANT
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
          <p>© 2026 Emergency Electric Repair Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-primary" /> Stripe Verified</span>
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-primary" /> PCI DSS Level 1</span>
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-primary" /> GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
