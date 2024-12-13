import { useState } from "react";

import { getDatabase, push, ref, set } from "firebase/database";
import app from "./firebase/firebaseConsole";

function Home() {
  const [url, setUrl] = useState("");
  const generateRandomAlphabetURL = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Alphabet pool
    let randomURL = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length); // Random index from the pool
      randomURL += characters[randomIndex];
    }

    return `https://trimio.vercel.app/${randomURL}`;
  };
  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0; // Random number between 0-15
      const value = char === "x" ? random : (random & 0x3) | 0x8; // Adjust `y` positions
      return value.toString(16); // Convert to hexadecimal
    });
  };
  const uuid = generateUUID();
  const randomURL = generateRandomAlphabetURL();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");

    const db = getDatabase(app); // Get a reference to the database
    const dbRef = ref(db, "url/"); // Path to store the data

    // Use `push()` to generate a unique key
    const newUrlRef = push(dbRef);

    // Set data to the new reference
    set(newUrlRef, {
      id: newUrlRef.key, // Use the unique key as an ID
      longURL: url,
      shortURL: randomURL,
    })
      .then(() => {
        console.log("Data successfully written!");
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-url">Enter Long URL</label>
        <input
          type="text"
          placeholder="Enter your long URL"
          id="input-url"
          name="input-url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <button type="submit">Short URL</button>
      </form>
    </>
  );
}

export default Home;
