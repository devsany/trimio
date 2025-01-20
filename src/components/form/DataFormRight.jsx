import { getDatabase, push, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import app, { auth } from "../firebase/firebaseConsole";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import { FaClipboard, FaLink } from "react-icons/fa";

const DataFormRight = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [urlView, setUrlView] = useState(false);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const { shortUrl } = useParams(); // Extracts unique URL segment if route includes it.
  const [loading, setLoading] = useState(false);
  const [clicks, setClicks] = useState(0); // Mocking the click count for the shortened URL

  const generateRandomAlphabetURL = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomURL = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomURL += characters[randomIndex];
    }

    return `https://trimio.vercel.app/${randomURL}`;
  };

  const fetchGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a URL");
      return;
    } // Simulate URL shortening

    setError(null);

    const randomURL = generateRandomAlphabetURL();
    const timestamp = new Date().toISOString();
    const db = getDatabase(app);
    const dbRef = ref(db, "url/");

    const newUrlRef = push(dbRef);

    set(newUrlRef, {
      id: newUrlRef.key,
      longURL: url,
      shortURL: randomURL,
      uid: user ? user.uid : null,
      photoURL: user ? user.photoURL : null,
      email: user ? user.email : null,
      displayName: user ? user.displayName : null,
      timestamp: timestamp,
      location: location.latitude && location.longitude ? location : null,
      isActive: true, // Set the isActive status to false
    })
      .then(() => {
        console.log("Data successfully written!");
        setUrlView(randomURL);
        setUrl("");
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  };

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(urlView)
      .then(() => {
        setClicks(clicks + 1); // Increment the click count when the URL is copied
        window.alert("Your link has been copied to the clipboard!");
        setUrlView(false);
      })
      .catch((err) => {
        window.alert("Failed to copy link. Please try again.");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    fetchGeolocation();

    if (shortUrl) {
      // Update the location if accessing via shared URL
      const db = getDatabase(app);
      const dbRef = ref(db, `url/${shortUrl}`);

      update(dbRef, { location }).then(() =>
        console.log("Location updated for shared URL")
      );
    }

    return () => unsubscribe();
  }, [shortUrl, location]);
  return (
    <div>
      <div className="w-full max-w-lg p-8 bg-gradient-to-t from-white to-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-4xl font-semibold text-gray-900 mb-6 text-center">
          URL Shortener - Trimio
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Shorten your long URLs into quick, easy-to-share links with Trimio.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label
            htmlFor="input-url"
            className="block text-lg font-medium text-gray-800"
          >
            Enter the URL you want to shorten:
          </label>

          <input
            type="text"
            placeholder="Enter your long URL"
            id="input-url"
            name="input-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 text-gray-800 placeholder-gray-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block mr-2">Loading...</span>
            ) : (
              <>
                <FaLink className="inline-block mr-2" />
                Shorten URL
              </>
            )}
          </button>
        </form>

        {urlView && (
          <div className="flex items-center justify-between mt-6 p-4 bg-gray-50 rounded-md shadow-sm">
            <p className="text-gray-800 text-sm font-medium break-words">
              {urlView}
            </p>

            <button
              onClick={handleCopyText}
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none transition duration-200"
            >
              <FaClipboard className="inline-block mr-2" />
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataFormRight;
