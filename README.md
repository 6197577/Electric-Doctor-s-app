
# Emergency Electric Repair - Production Launchpad

This application is ready for deployment to **www.emergencyelectricrepair.com**. Follow this rigorous checklist to ensure a stable and profitable launch.

## 1. Required API Keys (Enterprise Services)
Configure these in your Firebase App Hosting dashboard or `.env.production`:

- `GOOGLE_GENAI_API_KEY`: Your Gemini 2.5 Flash key for diagnostics.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: For client-side checkout.
- `STRIPE_SECRET_KEY`: For server-side payment intent generation.
- `STRIPE_WEBHOOK_SECRET`: To unlock subscriptions and audit packs upon payment.
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Required for live dispatch tracking on `/tracking`.
- `TWILIO_ACCOUNT_SID/AUTH_TOKEN`: Recommended for SMS dispatch alerts to electricians.
- `RESEND_API_KEY`: Recommended for sending professional PDF diagnostic reports via email.

## 2. Stripe Production Setup
1.  **Switch to Live Mode** in the Stripe Dashboard.
2.  **Create Products**: Create products for:
    - $97.00 Emergency Consult
    - $29.99 EV Readiness Report
    - $47.00 Single Audit
    - $97.00 3-Audit Pack
    - $197.00 10-Audit Pack
3.  **Update IDs**: Map these Product IDs in your configuration.

## 3. App Store Deployment (PWA)
The app is configured as a **Progressive Web App (PWA)**.
- **iOS/Android**: Users can "Add to Home Screen" for a full-screen, native experience.
- **Notifications**: Enable Firebase Cloud Messaging (FCM) for "Urgent Lead Alerts" push notifications.

## 4. Firebase Production Migration
1.  **Authentication**: Enable **Google Sign-In** and add `emergencyelectricrepair.com` to authorized domains.
2.  **Firestore**: Deploy security rules to protect user audit data and generator logs.
3.  **App Check**: Enable App Check to prevent unauthorized use of your API keys.

## 5. SEO & Growth
- **Sitemap**: Verified at `/sitemap.xml`.
- **Search Console**: Register the domain to track indexing of city-specific landing pages (e.g., `/services/diagnose/new-york`).

## 6. Pro Network Onboarding
The `/join-network` flow is currently a simulation. For production:
1.  Connect the W-9 upload to **Firebase Storage**.
2.  Integrate **Stripe Connect** to handle automated payouts to electricians.

---
*For technical infrastructure support, consult the internal Genkit documentation.*
