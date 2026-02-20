
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-destructive" />
      </div>
      <h1 className="text-4xl font-black tracking-tighter mb-4">System Fault Detected</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        An unexpected electrical error occurred in the application layer. Our AI has logged the incident.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} className="font-bold gap-2">
          <RefreshCcw className="w-4 h-4" />
          Retry Connection
        </Button>
        <Link href="/">
          <Button variant="outline" className="font-bold border-primary text-primary">
            <Home className="w-4 h-4 mr-2" />
            Back to Safety
          </Button>
        </Link>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-muted rounded-lg text-left max-w-2xl overflow-auto border border-white/5">
          <p className="text-[10px] font-mono text-destructive mb-2 uppercase font-black">Debug Info:</p>
          <pre className="text-[10px] font-mono text-muted-foreground">{error.message}</pre>
        </div>
      )}
    </div>
  )
}
