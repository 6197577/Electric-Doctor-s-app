import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-12 py-12">
      <div className="flex flex-col gap-4">
        <FileText className="w-12 h-12 text-primary" />
        <h1 className="text-4xl font-black tracking-tighter">Terms of Service</h1>
        <p className="text-muted-foreground font-medium">Last Updated: February 15, 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-4 border-l-4 border-primary pl-6 bg-primary/5 py-4">
          <h2 className="text-xl font-bold text-foreground uppercase tracking-tight">Important Safety Disclaimer</h2>
          <p className="font-bold text-foreground">
            The "Electric Doctor" AI Diagnostic tool is an ADVISORY service only. It is not a substitute for a physical inspection by a licensed professional. Do not attempt DIY repairs on high-voltage systems unless instructed by a Master Electrician during a live Video Consult.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">1. Cancellation & Refund Policy</h2>
          <p>
            To ensure the availability of our Master Electricians and local professionals, we enforce a strict cancellation policy:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Full Refund:</strong> Cancellations made at least <span className="text-primary font-black underline">72 hours</span> prior to the scheduled appointment time.</li>
            <li><strong className="text-foreground">No Refund:</strong> Cancellations made within 72 hours of the appointment. A portion of the hold fee is paid to the professional to compensate for reserved routing and pre-visit technical analysis.</li>
            <li><strong className="text-foreground">Rescheduling:</strong> Users may reschedule their appointment for free once, up to 24 hours before the visit.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">2. AI-Powered Advice</h2>
          <p>
            AI results are generated based on visual data provided by the user. "Emergency Electric Repair Inc." does not guarantee 100% accuracy of remote diagnostics. Users agree to hold the company harmless for damages resulting from failure to provide a physical on-site inspection.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">3. Marketplace Relationship</h2>
          <p>
            Electricians found via our marketplace are independent contractors. While we verify licenses and insurance, the contractual relationship for the actual repair work is between the User and the Electrician.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">4. Payment Terms</h2>
          <p>
            Hold fees and consultation fees ($97, $47, etc.) are processed at the time of booking. Final repair costs are settled directly with the Electrician unless otherwise specified in your subscription plan.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">5. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of New York. Any disputes shall be resolved through binding arbitration in the City of New York.
          </p>
        </section>
      </div>
    </div>
  )
}
