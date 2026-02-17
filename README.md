
# Electric Doctor's - Firebase Launch Roadmap

Follow this sequence to launch your app using the unified Firebase + GitHub stack. This is the most efficient workflow for a 2-person team.

## Phase 1: Source Control (GitHub)
1. Create a new **Private** repository on [GitHub](https://github.com).
2. Initialize your local project and push the code:
   ```bash
   git init
   git add .
   git commit -m "Initial production-ready build"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

## Phase 2: Firebase Backend Setup
1. **Firebase Console**: Go to [console.firebase.google.com](https://console.firebase.google.com) and create a new project.
2. **Authentication**: Enable the **Google** sign-in provider in the "Authentication" tab.
3. **Firestore Database**: 
   - Create a database in "Production Mode".
   - Choose a location closest to your primary market (e.g., `us-east1` for New York).
   - Refer to `docs/backend.json` for the data structures you will populate.

## Phase 3: Firebase App Hosting (The Automatic Deployment)
This is how you connect GitHub to Firebase for "push-to-deploy" functionality:
1. In the Firebase Sidebar, navigate to **App Hosting**.
2. Click **Get Started** and select your GitHub account (you may need to authorize the Firebase App).
3. Select your repository and choose the `main` branch.
4. **App Settings**: Firebase will auto-detect Next.js. Keep the default settings.
5. Click **Finish and Deploy**. Firebase will now watch your GitHub repo for changes.

## Phase 4: Production Environment Variables
Once the App Hosting backend is created, you must add your API keys so the AI and Payments work:
1. In the App Hosting dashboard, go to your backend **Settings > Environment Variables**.
2. Add the following keys (matches your `.env` file):
   - `GOOGLE_GENAI_API_KEY`: (From Google AI Studio)
   - `STRIPE_SECRET_KEY`: (From Stripe Dashboard)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: (From Stripe Dashboard)
   - `NEXT_PUBLIC_FIREBASE_CONFIG`: (The JSON config object from your Firebase Project Settings)
3. Re-run the deployment for these variables to take effect.

## Phase 5: Custom Domain
1. In the App Hosting dashboard, click "Connect Domain".
2. Add your custom domain (e.g., `emergencyelectricrepair.com`).
3. Follow the DNS instructions provided by Firebase. SSL (HTTPS) will be provisioned automatically.

---
**Team Sync**: Whenever either of you pushes to the GitHub `main` branch, Firebase will deploy the update to your domain within minutes.

**Support Contact**: 304-410-9208 | support@emergencyelectricrepair.com
