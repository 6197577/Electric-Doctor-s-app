# Electric Doctor's - Firebase Launch Roadmap

Follow this sequence to launch your app using the unified Firebase + GitHub stack. This is the most efficient workflow for your team.

## Phase 1: Source Control (GitHub)
Run these commands in your local terminal to push your code to your repository:

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
1. **Firebase Console**: Go to [console.firebase.google.com](https://console.firebase.google.com) and create a new project.
2. **Authentication**: Enable the **Google** sign-in provider in the "Authentication" tab.
3. **Firestore Database**: 
   - Create a database in "Production Mode".
   - Choose a location (e.g., `us-east1`).
   - Refer to `docs/backend.json` for data structures.

## Phase 3: Firebase App Hosting (The "Connect" Step)
This is where you link your GitHub repo to Firebase for "push-to-deploy" functionality:
1. In the Firebase Sidebar, navigate to **Build > App Hosting**.
2. Click **Get Started** and connect your GitHub account.
3. Select the repository: `6197577/Electric-Doctor-s-app`.
4. Select the `main` branch.
5. **Root Directory**: Keep as `/`.
6. **App Settings**: Firebase will auto-detect Next.js. Keep defaults.
7. Click **Finish and Deploy**. Firebase now watches your GitHub for every change.

## Phase 4: Production Keys
Once the App Hosting backend is created, go to **Settings > Environment Variables** in the App Hosting dashboard and add:
- `GOOGLE_GENAI_API_KEY`: (From Google AI Studio)
- `NEXT_PUBLIC_FIREBASE_API_KEY`: (From your Firebase Config)
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: ...
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: ...
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: ...
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: ...
- `NEXT_PUBLIC_FIREBASE_APP_ID`: ...

## Phase 5: Custom Domain
1. In the App Hosting dashboard, click "Connect Domain".
2. Add your domain (e.g., `emergencyelectricrepair.com`).
3. Follow the DNS instructions. SSL is handled automatically.

---
**Team Sync**: Every time you push to GitHub, the app updates live.
**Support**: 304-410-9208 | support@emergencyelectricrepair.com
