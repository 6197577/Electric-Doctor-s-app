import { Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-12 py-12">
      <div className="flex flex-col gap-4">
        <Shield className="w-12 h-12 text-primary" />
        <h1 className="text-4xl font-black tracking-tighter">Privacy Policy</h1>
        <p className="text-muted-foreground font-medium">Last Updated: February 15, 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you use our services, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Visual Data:</strong> Photos and video frames of electrical components uploaded for AI diagnostic analysis.</li>
            <li><strong className="text-foreground">Account Information:</strong> Name, email address, phone number, and physical address for service dispatch.</li>
            <li><strong className="text-foreground">Professional Data:</strong> Licensing, insurance, and tax information (W-9) for members of our Pro Network.</li>
            <li><strong className="text-foreground">Payment Information:</strong> Processed securely via Stripe. We do not store full credit card numbers on our servers.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">2. How We Use AI Data</h2>
          <p>
            Our "Electric Doctor" AI (powered by Genkit and Gemini) processes your visual data to identify electrical faults. This data is also used to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Generate technical briefings for your assigned electrician.</li>
            <li>Improve the accuracy of our safety-detection models through anonymized training datasets.</li>
            <li>Provide predictive maintenance alerts based on historical system degradation.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">3. Sharing Information with Third Parties</h2>
          <p>
            When you schedule a service, we share your diagnostic report and contact details with the verified independent contractor (Electrician) you have selected. These professionals are contractually bound to use your data only for service delivery.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">4. Data Security</h2>
          <p>
            We implement enterprise-grade encryption for all data in transit and at rest. AI processing occurs in secure cloud environments, and all financial transactions are handled by Stripe, a PCI DSS Level 1 Service Provider.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">5. Contact Us</h2>
          <p>
            If you have questions about this policy or wish to request data deletion, please contact our Data Protection Officer at privacy@emergencyelectricrepair.com.
          </p>
        </section>
      </div>
    </div>
  )
}
