import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConsole"; // Make sure to import your Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null); // User will be null initially, meaning not authenticated
  const [loading, setLoading] = useState(true); // Tracks if Firebase is still determining the auth state

  useEffect(() => {
    // Set up the authentication state observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state to the current authenticated user
      setLoading(false); // Set loading to false once we know the user's auth state
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  return { user, loading }; // Return the user and loading state
};

export default useAuth;
