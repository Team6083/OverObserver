"use client";
import { createContext, useContext, ReactNode } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export interface FirebaseContext {
  app: ReturnType<typeof initializeApp>;
  db: ReturnType<typeof getFirestore>;
}

export const firebaseCtx = createContext<FirebaseContext | null>(null);

export interface FirebaseProviderProps {
  children: ReactNode;
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyC0Hlc9IZMn0ztiaLGMcIxQkLHQRhaMFy4",
    authDomain: "overobserver-cdec9.firebaseapp.com",
    projectId: "overobserver-cdec9",
    storageBucket: "overobserver-cdec9.firebasestorage.app",
    messagingSenderId: "650482326968",
    appId: "1:650482326968:web:bfe3458c52c4ae65e3034d",
    measurementId: "G-F1L2XW3L0L"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <firebaseCtx.Provider value={{ app, db }}>
      {children}
    </firebaseCtx.Provider>
  );
}

export function useFirebase(): FirebaseContext {
  const ctx = useContext(firebaseCtx);
  if (!ctx) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return ctx;
}
