import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { syncFirebaseUser } from '../services/api';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to sync user with Firestore
  const syncUserWithFirestore = async (firebaseUser) => {
    if (!firebaseUser) return null;
    console.log("🔍 Syncing user with Firestore:", firebaseUser.email);
    
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);
      console.log("📄 Firestore User Snap exists:", userSnap.exists());
      
      let userData;
      if (userSnap.exists()) {
        userData = userSnap.data();
      } else {
        // Create new user profile
        userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          photoURL: firebaseUser.photoURL,
          role: firebaseUser.email === 'admin@rupiksha.com' ? 'admin' : 'user', // Hardcoded admin for now
          createdAt: new Date().toISOString(),
          phone: '',
          bio: 'Traveling the world!'
        };
        console.log("🆕 Creating new user in Firestore...");
        await setDoc(userRef, userData);
        console.log("✅ User created in Firestore");
      }
      
      // Sync with Node.js backend
      try {
        const response = await syncFirebaseUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: userData.name,
          photoURL: firebaseUser.photoURL
        });
        
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
      } catch (backendError) {
        console.error("Backend sync failed:", backendError);
      }

      return userData;
    } catch (error) {
      console.error("Error syncing user with Firestore:", error);
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || 'Traveler',
        role: 'user'
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const fullProfile = await syncUserWithFirestore(firebaseUser);
        setUser(fullProfile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google login failed", error);
      throw error;
    }
  };

  const [authModal, setAuthModal] = useState({ isOpen: false, type: 'login' });

  const openAuth = (type) => setAuthModal({ isOpen: true, type });
  const closeAuth = () => setAuthModal({ ...authModal, isOpen: false });

  const logout = () => signOut(auth);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, logout, setUser, loginWithGoogle, authModal, openAuth, closeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
