
import { Loader2, Zap } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
        <Zap className="w-6 h-6 text-primary absolute inset-0 m-auto animate-pulse" />
      </div>
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
        Initializing AI Systems...
      </p>
    </div>
  )
}
