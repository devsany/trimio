import { getDatabase, onValue, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import app from "../firebase/firebaseConsole";
import { AuthContext } from "../AuthContext";
import { NavLink } from "react-router-dom";

const DashboardHeader = () => {
  const { user } = useContext(AuthContext); // Access the current authenticated user
  const [data, setData] = useState([]);
  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "url/");

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const dataObj = snapshot.val();
          const dataList = Object.keys(dataObj).map((key) => ({
            id: key,
            ...dataObj[key],
          }));
          const mainData = dataList.filter((item) => item.uid === user?.uid);
          setData(mainData);
        } else {
          setData([]);
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <div>
      <div className="flex items-center justify-center text-center mt-[100px]">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl border border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-blue-600 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
            <p className="text-2xl font-semibold text-gray-700">
              Welcome Back!
            </p>
          </div>
          <p className="text-lg mt-2 text-gray-600">
            Hello,{" "}
            <span className="text-blue-500 font-semibold">
              {user.displayName || user.email}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            We're excited to have you back on the platform! Let's start
            shortening those URLs.
            <br />
            Make your URL Play Over the World .
          </p>
          <div className="mt-6">
            <NavLink
              to="/"
              className="bg-blue-600 text-white text-lg px-6 py-2 rounded-md hover:bg-blue-500 transition duration-200"
            >
              Start Shortening URLs
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
