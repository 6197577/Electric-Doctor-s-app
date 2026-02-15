
# Emergency Electric Repair - Production Launchpad

This application is ready for deployment to **www.emergencyelectricrepair.com**. Follow this rigorous checklist to ensure a stable and profitable launch.

## 1. Environment Variables (Critical)
Configure these in your Firebase App Hosting dashboard or `.env.production`:

- `GOOGLE_GENAI_API_KEY`: Your Gemini 2.5 Flash key.
- `NEXT_PUBLIC_BASE_URL`: Set to `https://emergencyelectricrepair.com`.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your **Live** Stripe key.
- `STRIPE_SECRET_KEY`: Your **Live** Stripe secret key.
- `STRIPE_WEBHOOK_SECRET`: Required to confirm payments and unlock audit packs.
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Required for live dispatch tracking.

## 2. Stripe Production Setup
1.  **Switch to Live Mode** in the Stripe Dashboard.
2.  **Create Products**: Create products for:
    - $97.00 Emergency Consult
    - $29.99 EV Readiness Report
    - $47.00 Single Audit
    - $97.00 3-Audit Pack
    - $197.00 10-Audit Pack
3.  **Update IDs**: Update the checkout logic in `video-consult`, `ev-readiness`, and `audit` pages to use your live Price IDs.

## 3. Firebase Production Migration
1.  **Project Choice**: Ensure you are connected to the production Firebase Project.
2.  **Authentication**: Enable **Google Sign-In** and add `emergencyelectricrepair.com` to the authorized domains.
3.  **Firestore**: Deploy the generated security rules to protect user audit data and generator logs.

## 4. SEO & Growth
- **Sitemap**: The app automatically generates a sitemap at `/sitemap.xml` with thousands of local service pages (e.g., `/services/diagnose/new-york`).
- **Robots**: Verified at `/robots.txt`.
- **Search Console**: Register the domain with Google Search Console to track indexing of city-specific landing pages.

## 5. Legal Requirements
Before Stripe approves your live account, you must:
1.  Add a **Privacy Policy** page.
2.  Add **Terms of Service** (specifically detailing the 72-hour cancellation policy).
3.  Display your business address and contact info.

## 6. Pro Network Onboarding
The `/join-network` flow is currently a simulation. For production:
1.  Connect the W-9 upload to **Firebase Storage**.
2.  Integrate **Stripe Connect** to handle automated payouts to electricians.

---
*For technical infrastructure support, consult the internal Genkit documentation.*
