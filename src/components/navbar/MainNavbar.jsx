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
      console.log("Google SignIn successful:", result.user);
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
  const handleCancel = () => {
    setShowMenu(!showMenu);
    setShowModal(false);
  };
  const handleLogout = () => {
    setShowModal(!showModal);
    logOut();
  };
  return (
    <div className="bg-white   shadow-md fixed top-0 left-0 w-full z-50 p-4">
      {/* Navbar */}
      <div className="max-w-screen-xl  relative  mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-700">
          <img
            className="w-[200px] rounded-lg shadow-sm"
            src="/Screenshot 2024-12-13 190438.png"
            // src="/Screenshot 2024-12-13 190438.png"
            alt=""
          />
        </div>
        <div className="space-x-4">
          {user ? (
            <>
              <div className="flex gap-6 ">
                <div className="text-md hover:border hover-border-slate-700 p-1 rounded-md hover:shadow-sm">
                  <NavLink to="/">Home</NavLink>
                </div>
                <div className="text-md  hover-border-slate-700 p-1 rounded-md hover:shadow-sm">
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
                className="p-[3px] relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                  Login In
                </div>
              </button>
              {/* Sign Up Button */}

              <button
                onClick={() => toggleModal(true)}
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                Signup free
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for SignIn/SignUp */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              {isSignUp ? "Sign Up" : "Log In"}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              {isSignUp
                ? "Join us and start your journey!"
                : "Welcome back! Please log in to continue."}
            </p>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none text-gray-700 transition"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none text-gray-700 transition"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <button
                onClick={isSignUp ? signUp : signIn}
                className="w-full py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition duration-200"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
              <button
                onClick={googleSignIn}
                className="flex items-center justify-center w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="24"
                  height="24"
                  className="mr-2"
                >
                  <g>
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.17 0 5.67 1.05 7.65 3.07l5.74-5.74C34.19 3.17 29.61 1.5 24 1.5c-8.64 0-15.88 5.03-19.45 12.34l6.94 5.38C13.54 12.14 18.42 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.14 24.3c0-1.33-.12-2.6-.36-3.84H24v7.32h12.46c-.53 2.75-2.09 5.08-4.45 6.65l6.94 5.38c4.05-3.73 6.19-9.23 6.19-15.51z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.55 14.16L-.4 8.78C-3.05 14.3-3.05 21.2-.4 26.72l6.95-5.37C5.14 18.4 5.14 15.6 6.55 14.16z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 46.5c5.61 0 10.19-1.67 13.67-4.59l-6.94-5.38c-2.04 1.37-4.7 2.17-7.73 2.17-5.59 0-10.47-2.64-13.45-6.84l-6.94 5.38C8.12 41.47 15.36 46.5 24 46.5z"
                    />
                  </g>
                </svg>
                Continue with Google
              </button>
              <button
                onClick={handleCancel}
                className="w-full text-center text-gray-400 hover:text-gray-600 transition"
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
              {userInformation?.displayName}
            </span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
              {userInformation?.email}
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
                onClick={handleLogout}
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
