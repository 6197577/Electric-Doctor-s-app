
# Emergency Electric Repair - Production Launchpad

This application is ready for deployment to your production domain (e.g., **www.emergencyelectricrepair.com**). Follow this rigorous checklist to ensure a stable and profitable launch.

## 1. Domain Acquisition & Connection
A custom domain is required for Stripe verification and SEO.
- **Acquire Domain**: Purchase your domain via Google Domains, Namecheap, or GoDaddy.
- **Connect to App Hosting**: In the Firebase Console, go to **App Hosting > Settings > Domains** and follow the instructions to update your DNS records.
- **SSL Certificate**: Firebase App Hosting will automatically provision an SSL certificate once the domain is verified.

## 2. Required API Keys (Enterprise Services)
Configure these in your Firebase App Hosting dashboard or `.env.production`:

- `GOOGLE_GENAI_API_KEY`: Your Gemini 2.5 Flash key for diagnostics.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: For client-side checkout.
- `STRIPE_SECRET_KEY`: For server-side payment intent generation.
- `STRIPE_WEBHOOK_SECRET`: To unlock subscriptions and audit packs upon payment.
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Required for live dispatch tracking on `/tracking`.
- `TWILIO_ACCOUNT_SID/AUTH_TOKEN`: Recommended for SMS dispatch alerts to electricians.
- `RESEND_API_KEY`: Recommended for sending professional PDF diagnostic reports via email.
- `NEXT_PUBLIC_BASE_URL`: Set this to your live domain (e.g., `https://www.emergencyelectricrepair.com`).

## 3. Stripe Production Setup
1.  **Switch to Live Mode** in the Stripe Dashboard.
2.  **Add Business Info**: Provide your domain and Privacy Policy/Terms links (already built in `/privacy` and `/terms`).
3.  **Create Products**: Create products for:
    - $97.00 Emergency Consult
    - $29.99 EV Readiness Report
    - $47.00 Single Audit
    - $97.00 3-Audit Pack
    - $197.00 10-Audit Pack
4.  **Update IDs**: Map these Product IDs in your configuration.

## 4. App Store Deployment (PWA)
The app is configured as a **Progressive Web App (PWA)** via `manifest.json`.
- **iOS/Android**: Instruct users to "Add to Home Screen" for a full-screen, native experience.
- **Notifications**: Enable Firebase Cloud Messaging (FCM) for "Urgent Lead Alerts" push notifications.

## 5. Firebase Production Migration
1.  **Authentication**: Enable **Google Sign-In** and add your live domain to authorized domains in the Firebase Auth settings.
2.  **Firestore**: Deploy security rules to protect user audit data and generator logs.
3.  **App Check**: Enable App Check to prevent unauthorized use of your API keys.

---
*For technical infrastructure support, consult the internal Genkit documentation.*
