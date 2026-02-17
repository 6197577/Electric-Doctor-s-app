
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

## Phase 3: Firebase App Hosting (The "Vercel" Alternative)
This service connects GitHub directly to Firebase.
1. In the Firebase Sidebar, go to **App Hosting**.
2. Click **Get Started** and connect your GitHub account.
3. Select your repository and the `main` branch.
4. Firebase will automatically detect your Next.js project and begin the first build.

## Phase 4: Production Environment Variables
Once the App Hosting backend is created, go to its **Settings > Environment Variables** and add:
- `GOOGLE_GENAI_API_KEY`: (From Google AI Studio)
- `STRIPE_SECRET_KEY`: (From Stripe Dashboard)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: (From Stripe Dashboard)
- `NEXT_PUBLIC_FIREBASE_CONFIG`: (The JSON config object from your Firebase Project Settings)

## Phase 5: Custom Domain
1. In **App Hosting**, click "Connect Domain".
2. Add your custom domain (e.g., `emergencyelectricrepair.com`).
3. Follow the DNS instructions provided by Firebase. SSL (HTTPS) will be provisioned automatically.

---
**Team Sync**: Whenever either of you pushes to the GitHub `main` branch, Firebase will deploy the update to your domain within minutes.

**Support Contact**: 304-410-9208 | support@emergencyelectricrepair.com
