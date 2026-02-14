"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Zap, ShoppingBag, User, ClipboardList, ShieldCheck, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Audit", icon: ShieldCheck, href: "/audit" },
  { label: "Smart Panels", icon: Cpu, href: "/products/smart-panels" },
  { label: "Market", icon: ShoppingBag, href: "/marketplace" },
  { label: "Profile", icon: User, href: "/profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-4 h-16 flex items-center justify-around md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn("w-5 h-5", isActive && "animate-pulse-orange")} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
