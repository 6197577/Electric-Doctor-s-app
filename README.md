
# Emergency Electric Repair - Production Launchpad

This application is ready for deployment to your production domain. Follow this rigorous checklist to ensure a stable and profitable launch.

## 1. Domain Acquisition & Connection
A custom domain is required for Stripe verification and SEO.
- **Acquire Domain**: Purchase your domain (e.g., via Google Domains or Namecheap).
- **Connect to App Hosting**: In the Firebase Console, go to **App Hosting > Settings > Domains** and follow instructions to update DNS.
- **SSL**: Automatically provisioned by Firebase once verified.

## 2. Mandatory API Key Inventory (Procurement Guide)
You must obtain and configure these keys in your environment variables:

| Service | Key Name | Purpose | Source |
|---------|----------|---------|--------|
| **Google AI** | `GOOGLE_GENAI_API_KEY` | Diagnostics & Sales Agents | [Google AI Studio](https://aistudio.google.com/) |
| **Stripe** | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client-side Checkout | [Stripe Dashboard](https://dashboard.stripe.com/) |
| **Stripe** | `STRIPE_SECRET_KEY` | Server-side Payments | [Stripe Dashboard](https://dashboard.stripe.com/) |
| **Google Maps** | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Live Dispatch Tracking | [Google Cloud Console](https://console.cloud.google.com/) |

## 3. Communication Services (Scaling Ops)
To fulfill the "Urgent Lead Alert" and "Report Delivery" features promised in the UI:
- **Twilio**: For SMS dispatch alerts to professionals.
- **Resend**: For sending professional diagnostic reports to homeowners.

## 4. Stripe Production Setup
1.  **Switch to Live Mode** in the Stripe Dashboard.
2.  **Map Products**: Ensure your Stripe Product IDs match the prices used in the app:
    - $97.00 Emergency Consult
    - $29.99 EV Readiness Report
    - $47.00 / $97.00 / $197.00 Audit Tiers
3.  **Webhook**: Configure a webhook pointing to `/api/webhooks/stripe` to handle post-payment logic.

## 5. PWA Deployment
The app is configured as a **Progressive Web App (PWA)** via `manifest.json`.
- Users can "Add to Home Screen" on iOS/Android for a native app experience.
- Ensure your custom domain is connected to allow the PWA manifest to trigger.

---
*For technical infrastructure support, consult the internal Genkit documentation.*
