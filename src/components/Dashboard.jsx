import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import MainNavbar from "./navbar/MainNavbar";
import { getDatabase, ref, onValue, update } from "firebase/database";
import app from "./firebase/firebaseConsole";
import TimestampGraph from "./sections/DashboardCharSection";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Access the current authenticated user
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Store the item being edited
  const [newUrl, setNewUrl] = useState(""); // Store the new URL (last 4 chars)

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

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setNewUrl(item.shortURL.slice(-4)); // Only allow the last 4 characters to be edited
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setNewUrl("");
  };

  const handleUpdate = () => {
    if (newUrl !== selectedItem.shortURL.slice(-4)) {
      const db = getDatabase(app);
      const itemRef = ref(db, "url/" + selectedItem.id);
      update(itemRef, {
        shortURL: selectedItem.shortURL.slice(0, -4) + newUrl, // Update only last 4 chars
      })
        .then(() => {
          console.log("Item updated successfully");
          setSelectedItem(null); // Close the popup
          setNewUrl(""); // Clear the input
        })
        .catch((error) => {
          console.error("Error updating item: ", error);
        });
    }
  };
  const handleDeactivate = (item) => {
    const db = getDatabase(app);
    const itemRef = ref(db, "url/" + item.id);
    update(itemRef, {
      isActive: false, // Set the isActive status to false
    })
      .then(() => {
        console.log("Item deactivated successfully");
      })
      .catch((error) => {
        console.error("Error deactivating item: ", error);
      });
  };
  const handleActivate = (item) => {
    const db = getDatabase(app);
    const itemRef = ref(db, "url/" + item.id);
    update(itemRef, {
      isActive: true, // Set the isActive status to false
    })
      .then(() => {
        console.log("Item deactivated successfully");
      })
      .catch((error) => {
        console.error("Error deactivating item: ", error);
      });
  };
  console.log(data);
  // const data1 = [
  //   { timestamp: "2024-12-15T10:30:00.000Z" },
  //   { timestamp: "2024-12-15T12:45:00.000Z" },
  //   { timestamp: "2024-12-16T14:20:00.000Z" },
  //   { timestamp: "2024-12-16T14:30:00.000Z" },
  //   { timestamp: "2024-12-16T14:30:00.000Z" },
  //   { timestamp: "2024-12-17T14:30:00.000Z" },
  // ];
  return (
    <div>
      <MainNavbar />
      <div className="mt-[100px] px-4 md:px-12">
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
        {data && <TimestampGraph data={data} />}

        <div className="overflow-x-auto h-[300px] overflow-y-scroll bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3 font-semibold text-sm text-gray-700 uppercase tracking-wider">
                  User Image
                </th>
                <th className="px-6 py-3 font-semibold text-sm text-gray-700 uppercase tracking-wider text-center">
                  ID
                </th>
                <th className="px-6 py-3 font-semibold text-sm text-gray-700 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 font-semibold text-sm text-gray-700 uppercase tracking-wider">
                  Long URL
                </th>
                <th className="px-6 py-3 font-semibold text-sm text-gray-700 uppercase tracking-wider">
                  Short URL
                </th>
                <th className="px-6 py-3 font-semibold text-sm text-gray-700 uppercase tracking-wider text-center">
                  Status
                </th>
                <th className="px-6 py-3 font-semibold text-sm text-gray-700 uppercase tracking-wider text-center">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-center">
                    {item.photoURL ? (
                      <img
                        className="rounded-full w-12 h-12 border-2 border-purple-500"
                        src={item.photoURL}
                        alt={item.displayName}
                      />
                    ) : (
                      <img
                        className="rounded-full w-12 h-12 border-2 border-purple-500"
                        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?ga=GA1.1.1554930220.1726334736&semt=ais_hybrid"
                        alt="image not available"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-900 font-medium">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">
                    {item.timestamp}
                  </td>
                  <td className="px-6 py-4 text-center text-blue-600 truncate max-w-xs">
                    {item.longURL}
                  </td>
                  <td className="px-6 py-4 text-center text-blue-600 truncate max-w-xs">
                    {item.shortURL}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        item.isActive
                          ? handleDeactivate(item)
                          : handleActivate(item)
                      }
                      className={`text-sm px-4 py-1 rounded-full ${
                        item.isActive
                          ? "bg-green-500 text-white"
                          : "bg-red-400 text-white"
                      }`}
                    >
                      {item.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Popup UI for Editing */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Short URL</h3>
            <div className="flex items-center mb-4">
              <label htmlFor="shortUrl" className="text-gray-700 mr-2">
                Last 4 characters:
              </label>
              <input
                id="shortUrl"
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                maxLength={4}
                className="border px-2 py-1 rounded-md w-20"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
