import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConsole"; // Import your firebase auth instance

// Create the context for authentication
export const AuthContext = createContext();

// AuthProvider component to provide the auth state to the rest of the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the user
  const [loading, setLoading] = useState(true); // Loading state while checking auth

  // Check Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state if authenticated
      setLoading(false); // Stop loading once the user state is resolved
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
