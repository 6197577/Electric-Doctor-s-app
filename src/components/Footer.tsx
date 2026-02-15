import Link from "next/link"
import { Zap, ShieldCheck, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <Zap className="w-6 h-6 text-primary fill-primary" />
              <span>ELECTRIC <span className="text-primary">DOCTOR&apos;S</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The world's first AI-driven electrical safety platform. 24/7 emergency support and predictive maintenance for modern homes and facilities.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest">NEC 2023 Compliant</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Solutions</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/diagnose" className="hover:text-primary transition-colors">AI Diagnostic Scan</Link></li>
              <li><Link href="/video-consult" className="hover:text-primary transition-colors">Emergency Video Consult</Link></li>
              <li><Link href="/audit" className="hover:text-primary transition-colors">Residential Safety Audit</Link></li>
              <li><Link href="/commercial-audit" className="hover:text-primary transition-colors">Commercial Compliance</Link></li>
              <li><Link href="/products/smart-panels" className="hover:text-primary transition-colors">Smart Panel Upgrades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/marketplace" className="hover:text-primary transition-colors">Find an Electrician</Link></li>
              <li><Link href="/join-network" className="hover:text-primary transition-colors">Join Pro Network</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/tracking" className="hover:text-primary transition-colors">Live Dispatch Track</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold mb-2 text-sm uppercase tracking-widest">HQ & Contact</h4>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span>One World Trade Center<br />Suite 85, New York, NY 10007</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>1-800-ELEC-DOC</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>support@emergencyelectricrepair.com</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
          <p>© 2026 Emergency Electric Repair Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Stripe Verified</span>
            <span>PCI DSS Level 1</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
