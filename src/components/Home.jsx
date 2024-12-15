import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, update } from "firebase/database";
import app, { auth } from "./firebase/firebaseConsole";
import MainNavbar from "./navbar/MainNavbar";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useParams } from "react-router-dom"; // If using React Router
import {
  BarChart,
  CheckCircle,
  Clipboard,
  Link2,
  Settings,
  Share2,
} from "react-feather";
import PerformanceAnalytics from "./sections/PerformanceAnalytics";
import Pricing from "./sections/PricingSection";
import ThreadAnimation from "./animation/ThreadAnimation ";
import TreeAnimation from "./animation/TreeAnimation";
import FloatingDots from "./animation/FloatingDots";
import WaveAnimation from "./animation/WaveAnimation ";
import WaveAnimationGSAP from "./animation/WaveAnimation";
import ServicesSection from "./sections/ServicesSection";
import { FaClipboard, FaLink } from "react-icons/fa";
import ExtraInfoSections from "./sections/TestimonialCarousel";
import TestimonialSection from "./sections/TestimonialCarousel";
import TestimonialCarousel from "./sections/TestimonialCarousel";

function Home() {
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

  // const handleCopy = () => {
  //   if (urlView) {
  //     navigator.clipboard.writeText(urlView).then(
  //       () => {
  //         alert("Short URL copied to clipboard!");
  //       },
  //       (err) => {
  //         console.error("Failed to copy:", err);
  //       }
  //     );
  //   }
  // };

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
  const [position, setPosition] = useState({ x: 49, y: 49 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
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
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center py-8 px-4">
      <MainNavbar />

      <section className="text-center mb-8">
        <div className="m-[10px] relative pt-10 pb-10 bg-blue-50 mt-[70px] rounded-tl-3xl  rounded-tr-3xl   ">
          <div className="absolute ml-14">
            <div className="flex gap-30">
              <div></div>
              <div>
                <FloatingDots />
              </div>
            </div>
          </div>

          <div className="hidden md:block w-[400px] opacity-60  right-0 mt-[60px]   absolute">
            <img
              src="/illustration-ezgif.com-png-to-jpg-converter.png"
              alt=""
            />
          </div>

          <div className="flex justify-center mt-10 pt-[50px] hover:cursor-auto  mb-5 ">
            <h1
              onMouseMove={handleMouseMove}
              style={{
                transform: `perspective(1000px) rotateX(${
                  (position.y - 50) / 2
                }deg) rotateY(${(position.x - 50) / 2}deg)  `,
              }}
              className="text-5xl w-[75%] font-bold text-blue-600"
            >
              Trimio: Simplifying URLs with style and{" "}
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-[#FECC39] bg-clip-text text-transparent">
                powerful analytics.
              </span>
              <div className="flex justify-center">
                <p className="  text-slate-700 text-lg w-[75%] font-thin mt-4">
                  Trimio simplifies long URLs into short, shareable links with a
                  sleek design and powerful analytics. Perfect for anyone who
                  values efficiency and style.
                </p>
              </div>
            </h1>
          </div>
          <div className="flex justify-center mt-[50px]">
            <div className="bg-slate-800 text-white pl-4 pr-4 pt-1 pb-1 cursor-pointer font-semibold text-sm shadow-md rounded-full">
              Get Started
            </div>
            <div className="bg-[#75c4ec] ml-2 text-slate-700 pl-4 pr-4 pt-1 pb-1 cursor-pointer font-semibold text-sm shadow-md rounded-full">
              Contact Us
            </div>
          </div>
          <div className="mb-[-38px]">
            <WaveAnimationGSAP />
          </div>
        </div>
      </section>
      {/* <URLShortenerForm /> */}

      <section className="py-16">
        <div className="container   mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="   bg-gradient-to-t from-[#FAFDD1] to-white p-6 rounded-lg shadow-lg">
              <Link2 className="mx-auto mb-6 w-12 h-12 text-blue-500" />
              <h3 className="text-xl font-semibold mb-4">URL Shortening</h3>
              <p className="text-gray-600">
                Shorten URLs for easy sharing and tracking.
              </p>
            </div>
            <div className=" bg-gradient-to-t from-[#DCF3EF] to-white p-6 rounded-lg shadow-lg">
              <BarChart className="mx-auto mb-6 w-12 h-12 text-green-500" />
              <h3 className="text-xl font-semibold mb-4">Analytics</h3>
              <p className="text-gray-600">
                Track your shortened links with detailed analytics.
              </p>
            </div>
            <div className="bg-gradient-to-t from-[#EBD5F3] to-white p-6 rounded-lg shadow-lg">
              <Settings className="mx-auto mb-6 w-12 h-12 text-red-500" />
              <h3 className="text-xl font-semibold mb-4">Custom URLs</h3>
              <p className="text-gray-600">
                Create custom short links for your branding.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center py-12 rounded-xl bg-blue-50">
        <div className="container relative max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section: Informative Icons */}
          <div className="absolute ml-[-100px]">
            <ThreadAnimation />
          </div>
          <div className="flex flex-col space-y-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              Why Use Our URL Shortener?
            </h2>
            <div className="flex items-start space-x-6">
              <Link className="text-blue-500" size={48} />
              <div>
                <h3 className="text-xl font-semibold text-blue-700">
                  URL Shortening
                </h3>
                <p className="text-gray-700 text-sm">
                  Easily shorten long URLs for better sharing and tracking.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <Clipboard className="text-pink-500" size={48} />
              <div>
                <h3 className="text-xl font-semibold text-blue-700">
                  Copy to Clipboard
                </h3>
                <p className="text-gray-700 text-sm">
                  Quickly copy shortened URLs to your clipboard for fast
                  sharing.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <CheckCircle className="text-yellow-400" size={48} />
              <div>
                <h3 className="text-xl font-semibold text-blue-700">
                  Track Success
                </h3>
                <p className="text-gray-700 text-sm">
                  Monitor the engagement of your shortened URLs with ease.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <Share2 className="text-red-500" size={48} />
              <div>
                <h3 className="text-xl font-semibold text-blue-700">
                  Share Fast
                </h3>
                <p className="text-gray-700 text-sm">
                  Share shortened links directly across social media platforms.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: URL Shortening Form */}
          <div className="w-full max-w-lg p-8 bg-gradient-to-t from-white to-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6 text-center">
              URL Shortener - Trimio
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Shorten your long URLs into quick, easy-to-share links with
              Trimio.
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
      </section>
      <PerformanceAnalytics />
      {/* <Pricing /> */}
      <ServicesSection />
      <TestimonialCarousel />
    </div>
  );
}

export default Home;
