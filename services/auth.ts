import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  getIdToken,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const token = await user.getIdToken();
    await storeUserData(user, token);
    return { user, token };
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const signOut = () => firebaseSignOut(auth);

export const getCurrentUser = (): Promise<{ user: User | null; token: string | null }> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe();
        if (user) {
          const token = await user.getIdToken();
          resolve({ user, token });
        } else {
          resolve({ user: null, token: null });
        }
      },
      reject
    );
  });
};

async function storeUserData(user: User, token: string) {
  try {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to store user data');
    }
  } catch (error) {
    console.error('Error storing user data:', error);
  }
}

