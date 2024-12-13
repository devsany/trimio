import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConsole";
import useAuth from "../hook/useAuth";
import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  // Google Sign-In
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("Google Sign-In successful:", result.user);
    } catch (error) {
      console.error("Error with Google Sign-In:", error.message);
    }
  };

  // Email and Password Sign-Up
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  // Email and Password Sign-In
  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("User signed in:", userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  // Log Out
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out.");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // Modal for SignIn / SignUp
  const toggleModal = (isSignUpPage) => {
    setShowModal(true);
    setIsSignUp(isSignUpPage);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser)); // Store user in localStorage
      } else {
        localStorage.removeItem("user"); // Remove user from localStorage when logged out
      }
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in, store user info
        setUserInformation({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
      } else {
        // No user is signed in
        setUserInformation(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  console.log(userInformation);
  return (
    <div className="bg-white   shadow-md fixed top-0 left-0 w-full z-50 p-4">
      {/* Navbar */}
      <div className="max-w-screen-xl  relative  mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-700">
          <img
            className="w-[200px] rounded-lg shadow-sm"
            src="/public/Screenshot 2024-12-13 190438.png"
            alt=""
          />
        </div>
        <div className="space-x-4">
          {user ? (
            <>
              <div className="flex gap-6 ">
                <div className="text-md hover:border hover-border-slate-700 p-1 rounded-md hover:shadow-sm">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </div>
                <div>
                  <img
                    onClick={() => setShowMenu(!showMenu)}
                    src={userInformation.photoURL}
                    className="w-8 h-8 hover:cursor-pointer hover:border-2   rounded-full"
                    alt=""
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex space-x-6">
              {/* Sign In Button */}
              <button
                onClick={() => toggleModal(false)}
                className="px-6 py-3 bg-indigo-500 text-white rounded-xl shadow-lg hover:bg-indigo-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 transform hover:scale-105"
              >
                Sign In
              </button>

              {/* Sign Up Button */}
              <button
                onClick={() => toggleModal(true)}
                className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 transform hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for SignIn/SignUp */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">
              {isSignUp ? "Create an Account" : "Sign In"}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <button
                onClick={isSignUp ? signUp : signIn}
                className="w-full px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
              <button
                onClick={googleSignIn}
                className="flex items-center justify-center w-full px-8 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="24"
                  height="24"
                  className="mr-3"
                >
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.76-.07-1.48-.19-2.16H12v4.2h6.36c-.27 1.47-1.03 2.72-2.12 3.39v2.83h3.42c2.01-1.85 3.16-4.59 3.16-8.26z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 6.59c1.09 0 2.03.37 2.78.99l2.07-2.07C15.77 3.42 14.02 2.5 12 2.5c-3.29 0-6 2.69-6 6 0 2.74 1.83 5.07 4.3 5.91l2.53-2.02c-.61-.35-.99-.98-.99-1.74 0-1.16.96-2.1 2.1-2.1z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M7.3 8.91c-.35-.98-.35-2.04 0-3.02l-2.53-2.02C2.29 4.1 1.99 5.25 1.99 6.5c0 1.38.5 2.63 1.34 3.61l2.53-2.02z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 3.5c-.81 0-1.58.28-2.17.76l-2.07-2.07C9.8.56 10.89 0 12 0c3.31 0 6 2.69 6 6 0 2.75-1.84 5.09-4.3 5.92l-2.53-2.02c.61-.35.99-.99.99-1.74 0-1.16-.96-2.1-2.1-2.1z"
                  />
                </svg>
                Sign In with Google
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full text-center text-gray-500 hover:text-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showMenu ? null : (
        <div className="z-50 absolute ml-[200px] md:ml-[1050px] mt-[30px] w-[250px]  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {userInformation.displayName}
            </span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
              {userInformation.email}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <NavLink
                to="/dashboard"
                className="block px-4 py-2 text-sm font-mono  text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/setting"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Home
              </NavLink>
            </li>
            <li>
              <div
                onClick={logOut}
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainNavbar;
