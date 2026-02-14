
# Emergency Electric Repair - Implementation Guide

Welcome to the world-class AI-powered electrical care platform. To go live on **www.emergencyelectricrepair.com**, follow these steps:

## 1. Set Up Environment Variables
Open your `.env` file and provide the following keys:

- **GOOGLE_GENAI_API_KEY**: Required for AI Diagnostics, EV Load Calculations, and Predictive Maintenance. Obtain from [Google AI Studio](https://aistudio.google.com/).
- **Stripe Keys**: Required for the $49 Video Consults and Pro Subscriptions. Obtain from the [Stripe Dashboard](https://dashboard.stripe.com/).
- **NEXT_PUBLIC_GOOGLE_MAPS_API_KEY**: Required for the Live Dispatch Tracking map. Obtain from [Google Cloud Console](https://console.cloud.google.com/).

## 2. Connect Firebase
Use the Firebase Studio interface to:
1. Enable **Google Authentication**.
2. Provision **Cloud Firestore**.
3. Deploy the Security Rules (handled automatically by the studio).

## 3. Custom Domain Configuration
Once your keys are set:
1. Point your domain (**www.emergencyelectricrepair.com**) to your App Hosting backend.
2. Update the `NEXT_PUBLIC_BASE_URL` in `.env` to match your live production URL.

## 4. Testing the Sales Funnel
- **Video Consult**: Test the Stripe redirect by clicking "Emergency Video Consult" on the home page.
- **AI Diagnosis**: Upload a photo of an electrical panel to verify the Gemini AI analysis.
- **Marketplace**: Ensure dynamic pricing is correctly calculating based on the selected city.

For support, contact the system administrator.
