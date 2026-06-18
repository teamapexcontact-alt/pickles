"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phoneNumber: string, appVerifier: any) => Promise<{ confirm: (otp: string) => Promise<any> }>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdTokenResult();
          const customClaims = token.claims;
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            phoneNumber: firebaseUser.phoneNumber,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: (customClaims?.role as "customer" | "admin") || "customer",
            createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
            updatedAt: new Date(firebaseUser.metadata.lastSignInTime || Date.now()),
          });
        } catch (error) {
          console.error("Error fetching user claims:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase not initialized");
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    if (!auth) throw new Error("Firebase not initialized");
    const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
  };

  const signInWithGoogle = async () => {
    if (!auth) throw new Error("Firebase not initialized");
    const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithPhone = async (phoneNumber: string, appVerifier: any) => {
    if (!auth) throw new Error("Firebase not initialized");
    const { signInWithPhoneNumber } = await import("firebase/auth");
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return { confirm: (otp: string) => confirmationResult.confirm(otp) };
  };

  const signOut = async () => {
    if (!auth) return;
    await auth.signOut();
  };

  const sendPasswordReset = async (email: string) => {
    if (!auth) throw new Error("Firebase not initialized");
    const { sendPasswordResetEmail } = await import("firebase/auth");
    await sendPasswordResetEmail(auth, email);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!firebaseUser) return;
    const { updateProfile: updateFirebaseProfile } = await import("firebase/auth");
    if (data.displayName || data.photoURL) {
      await updateFirebaseProfile(firebaseUser, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInWithPhone,
        signOut,
        sendPasswordReset,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}