
# Electric Doctor's - Firebase Launch Roadmap


## Phase 1: Source Control (GitHub) - STEP 1
**RUN THESE COMMANDS FIRST.** Open your terminal in the root directory of your project and run:

## Phase 2: Testing & Verification
Ensure your app logic is sound before cloud deployment.

1. **Run Unit Tests (Logic/Pricing)**:
   ```bash
   npm run test
   ```
2. **Run E2E Tests (Browser Automation)**:
   ```bash
   npm run test:e2e
   ```

## Phase 3: Firebase Backend Setup
1. **Firebase Console**: Go to [console.firebase.google.com](https://console.firebase.google.com).
2. **Authentication**: Enable the **Google** sign-in provider in the "Authentication" tab.
3. **Firestore Database**: 
   - Click "Create Database".
   - Choose **"Production Mode"**.
   - Choose a location (e.g., `us-east1`).

## Phase 4: Firebase App Hosting (The "Connect" Step)
1. In the Firebase Sidebar, navigate to **Build > App Hosting**.
2. Click **Get Started** and connect your GitHub account.
3. Select the repository: `6197577/Electric-Doctor-s-app`.
4. Keep root as `/` and click **Finish and Deploy**.

## Phase 5: Production Keys (CRITICAL)
Once the App Hosting backend is created, go to **Settings > Environment Variables** in the App Hosting dashboard and add these:

### Firebase Client Config (Frontend)
- `NEXT_PUBLIC_FIREBASE_API_KEY`: [Your Key]
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: [Your Project].firebaseapp.com
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: [Your Project ID]
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: [Your Project].appspot.com
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: ...
- `NEXT_PUBLIC_FIREBASE_APP_ID`: ...

### AI & External Services (Server)
- `GOOGLE_GENAI_API_KEY`: Get from [Google AI Studio](https://aistudio.google.com/)
- `STRIPE_SECRET_KEY`: Get from [Stripe Dashboard](https://dashboard.stripe.com/)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: For frontend checkout UI.
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Get from [Google Cloud Console](https://console.cloud.google.com/)

---
**Support**: 304-410-9208 | support@emergencyelectricrepair.com
