# Electric Doctor's - Firebase Launch Roadmap

Follow this sequence to launch your app using the unified Firebase + GitHub stack. This is the most efficient workflow for your team.

## Status: App Ready for Push
Your application has been hardened against hydration mismatches, database infinite loops, and hardware permission errors.

## Project Structure
- `/src/app`: Frontend pages (Marketplace, Audit, Live Diagnostics, Video Consult).
- `/src/firebase`: Stabilized Firestore and Auth connection logic.
- `/src/ai`: Genkit AI diagnostic engines (Gemini 2.5 Flash).
- `/docs/backend.json`: Database blueprint for property-centric tracking.

---

## Phase 1: Source Control (GitHub)
**RUN THESE COMMANDS FIRST.** Open your terminal in the root directory and run:

1. **Initialize and push code**:
   ```bash
   git init
   git remote add origin https://github.com/6197577/Electric-Doctor-s-app.git
   git add .
   git commit -m "Initial production-ready build with property tracking"
   git branch -M main
   git push -u origin main
   ```

## Phase 2: Firebase Backend Setup
1. **Firebase Console**: Go to [console.firebase.google.com](https://console.firebase.google.com).
2. **Authentication**: Enable the **Google** sign-in provider in the "Authentication" tab.
3. **Firestore Database**: 
   - Click "Create Database".
   - Choose **"Production Mode"**.
   - Choose a location (e.g., `us-east1`).

## Phase 3: Firebase App Hosting (The "Connect" Step)
1. In the Firebase Sidebar, navigate to **Build > App Hosting**.
2. Click **Get Started** and connect your GitHub account.
3. Select the repository: `6197577/Electric-Doctor-s-app`.
4. Keep root as `/` and click **Finish and Deploy**.

## Phase 4: Production Keys (CRITICAL)
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
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Get from [Google Cloud Console](https://console.cloud.google.com/) (Required for live dispatch maps).

## Phase 5: Custom Domain
1. In App Hosting dashboard, click "Connect Domain".
2. Add `emergencyelectricrepair.com` and follow the DNS steps.

---
## Managing Your Data
To see your users' audits, AI diagnoses, and generator logs:
1. Open [Firebase Console](https://console.firebase.google.com).
2. Click **Firestore Database**.
3. Path: `users` > `userId` > `properties` > `propertyId` > `audits/diagnoses/logs`.

## Troubleshooting Hardware
- **Camera/Mic Denied**: The app will show a red Alert if the browser blocks access. Instruct users to click the "Lock" icon in their URL bar to reset permissions.
- **Port 9002**: If the server fails to start, it's usually a dangling process. It should restart automatically within 10 seconds.

**Support**: 304-410-9208 | support@emergencyelectricrepair.com