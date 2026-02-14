import Link from "next/link"
import { Zap } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <Zap className="w-6 h-6 text-primary fill-primary" />
          <span>ELECTRIC <span className="text-primary">DOCTOR&apos;S</span></span>
        </Link>
        <div className="ml-auto hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/diagnose" className="hover:text-primary transition-colors">AI Diagnostic</Link>
          <Link href="/predictive-maintenance" className="hover:text-primary transition-colors">Predictive</Link>
          <Link href="/audit" className="hover:text-primary transition-colors">Safety Audit</Link>
          <Link href="/subscriptions" className="hover:text-primary transition-colors">Plans</Link>
          <Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
          <Link href="/profile" className="hover:text-primary transition-colors">Account</Link>
        </div>
      </div>
    </header>
  )
}
