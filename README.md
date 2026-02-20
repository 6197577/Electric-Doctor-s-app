
# Electric Doctor's - Firebase Launch Roadmap

Follow this sequence to launch your app using the unified Firebase + GitHub stack. This is the most efficient workflow for your team.

## Project Structure (Root Directory)
Your app's root is the folder containing these key files:
- `/src/app`: All website pages (Marketplace, Audit, Profile).
- `/src/firebase`: Database and Auth connection logic.
- `/src/ai`: Genkit AI diagnostic engines.
- `/docs/backend.json`: Your database blueprint.
- `package.json`: Project configuration and dependencies.

---

## Phase 1: Source Control (GitHub)
**RUN THESE COMMANDS FIRST.** Open your terminal in the root directory and run:

1. **Initialize and push code**:
   ```bash
   git init
   git remote add origin https://github.com/6197577/Electric-Doctor-s-app.git
   git add .
   git commit -m "Initial production-ready build"
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
   - This is where you can see your data under the "Data" tab.

## Phase 3: Firebase App Hosting (The "Connect" Step)
This links your GitHub repo to your live URL:
1. In the Firebase Sidebar, navigate to **Build > App Hosting**.
2. Click **Get Started** and connect your GitHub account.
3. Select the repository: `6197577/Electric-Doctor-s-app`.
4. Select the `main` branch and keep root as `/`.
5. Click **Finish and Deploy**.

## Phase 4: Production Keys
Once the App Hosting backend is created, go to **Settings > Environment Variables** in the App Hosting dashboard and add these from your Firebase Web App Config:
- `NEXT_PUBLIC_FIREBASE_API_KEY`: ...
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: ...
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: ...
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: ...
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: ...
- `NEXT_PUBLIC_FIREBASE_APP_ID`: ...
- `GOOGLE_GENAI_API_KEY`: (Your Gemini API Key)

## Phase 5: Custom Domain
1. In the App Hosting dashboard, click "Connect Domain".
2. Add `emergencyelectricrepair.com`.
3. Follow the DNS instructions provided by Firebase.

---
## Managing Your Data
To see your users' audits, AI diagnoses, and generator logs:
1. Open [Firebase Console](https://console.firebase.google.com).
2. Select your project.
3. Click **Firestore Database** in the left menu.
4. Data is organized as: `users` > `properties` > `audits/diagnoses`.

**Support**: 304-410-9208 | support@emergencyelectricrepair.com
