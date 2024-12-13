import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, child } from "firebase/database";

import { useParams } from "react-router-dom";

const SeparateURL = () => {
  const [data, setData] = useState(null); // State to store fetched data
  const { id } = useParams();

  const fetchData = async () => {
    try {
      // Get the ID from the URL or wherever you need it from
      const id = window.location.pathname.split("/").pop(); // assuming id is in the URL
      const db = getDatabase(); // Get a reference to the database
      const dbRef = ref(db); // Reference to the root of the database

      // Fetch data from the "url" path
      const snapshot = await get(child(dbRef, "url/"));

      if (snapshot.exists()) {
        const maindata = Object.values(snapshot.val()).filter((item) => {
          return item.shortURL.split("/").pop() === id;
        });
        if (maindata.length > 0) {
          const longURL = maindata[0].longURL;

          // If longURL starts with http:// or https://, we leave it as is
          // If it starts with www., we prepend http:// or https://
          const finalURL = /^https?:\/\//i.test(longURL)
            ? longURL
            : longURL.startsWith("www.")
            ? `http://${longURL}` // Prepending http:// if it starts with www.
            : `http://${longURL}`; // Default to http:// if no scheme or www. is present

          // Redirect to the new URL
          window.location.replace(finalURL); // This should now work properly
        }
        setData(maindata); // Update state with fetched data
      } else {
        console.log("No data available.");
        setData(null); // Set data to null if no data is found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only once

  console.log(data);
  return <div></div>;
};

export default SeparateURL;
