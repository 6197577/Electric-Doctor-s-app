
import Link from "next/link"
import { Zap, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
        <Zap className="w-10 h-10 text-primary fill-primary" />
      </div>
      <h1 className="text-6xl font-black tracking-tighter mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6 italic text-primary">Connection Lost.</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        It looks like this circuit is broken. Let's get you back to safety before we trip a breaker.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button className="font-bold gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/video-consult">
          <Button variant="outline" className="font-bold border-primary text-primary">
            Emergency Support
          </Button>
        </Link>
      </div>
    </div>
  )
}
