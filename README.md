
# Electric Doctor's - Production Launch Roadmap

Follow this sequence to transition from prototype to a live, revenue-generating business.

## Phase 1: Source Control (GitHub)
1. Create a new repository on [GitHub](https://github.com).
2. Push this code:
   ```bash
   git init
   git add .
   git commit -m "Initial production-ready build"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

## Phase 2: Backend Infrastructure (Firebase)
1. **Firebase Console**: Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. **Authentication**: Enable the **Google** sign-in provider.
3. **Firestore Database**: 
   - Create a database in "Production Mode".
   - Set location to your closest region.
   - Refer to `docs/backend.json` for the required data structures.

## Phase 3: App Hosting (The "Vercel" Alternative)
We use **Firebase App Hosting** for seamless NextJS 15 support and GitHub integration.
1. In Firebase Console, go to **App Hosting**.
2. Connect your GitHub repository.
3. Firebase will automatically build and deploy your app on every push to `main`.

## Phase 4: Production API Keys
Configure these in the **App Hosting > Settings > Environment Variables** section:
- `GOOGLE_GENAI_API_KEY`: From Google AI Studio.
- `STRIPE_SECRET_KEY`: From Stripe Dashboard.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: From Stripe Dashboard.
- `NEXT_PUBLIC_FIREBASE_CONFIG`: (API Key, Project ID, etc. from Firebase Settings).

## Phase 5: Domain & Payments
1. **Custom Domain**: Connect your domain in Firebase App Hosting settings.
2. **Stripe Live**: Swap keys to live mode once your domain is verified and SSL is active.
3. **PWA**: Verify the manifest triggers the "Add to Home Screen" prompt on mobile.

---
**Support Contact**: 304-410-9208 | support@emergencyelectricrepair.com
