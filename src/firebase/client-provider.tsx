'use client';

import React, { useMemo } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key } from 'lucide-react';

export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { firebaseApp, firestore, auth } = useMemo(() => initializeFirebase(), []);

  // If Firebase is not configured, show a helpful setup screen instead of crashing
  if (!firebaseApp) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <Card className="max-w-md border-primary/20 bg-card/50 backdrop-blur-xl orange-glow">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Key className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-black italic tracking-tight">Configuration Required</CardTitle>
            <CardDescription>
              Your app is ready for code, but not yet linked to its database.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              To enable database features and live tracking, you must add your 
              <strong> Firebase Configuration</strong> to your <code>.env</code> file or Phase 4 of the roadmap.
            </p>
            <div className="p-4 bg-muted/50 rounded-xl border border-white/5 text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Next Steps:</p>
              <ul className="text-xs space-y-2 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Push this code to GitHub (Phase 1)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Link GitHub to Firebase App Hosting (Phase 3)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Add Keys to App Hosting Environment (Phase 4)
                </li>
              </ul>
            </div>
            <p className="text-[10px] italic text-muted-foreground pt-2">
              Refer to the <strong>README.md</strong> for the full terminal command sequence.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <FirebaseProvider firebaseApp={firebaseApp} firestore={firestore} auth={auth}>
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
};
