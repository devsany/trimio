import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import MainNavbar from "./navbar/MainNavbar";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import app from "./firebase/firebaseConsole";
import MapComponent from "./MapComponent";

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Access the current authenticated user
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  console.log(user?.uid);
  console.log(data);

  useEffect(() => {
    const db = getDatabase(app); // Initialize the database
    const dbRef = ref(db, "url/"); // Reference to the database path

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const dataObj = snapshot.val();
          // Convert the object into an array of values (optional)
          const dataList = Object.keys(dataObj).map((key) => ({
            id: key,
            ...dataObj[key],
          }));
          const mainData = dataList.filter((item) => item.uid === user?.uid);
          console.log(mainData);
          setData(mainData);
        } else {
          console.warn("No data available");
          setData([]);
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    );

    // Cleanup listener when the component unmounts
    return () => unsubscribe();
  }, [user?.uid]);
  const handleDelete = (itemId) => {
    const db = getDatabase(app);
    const itemRef = ref(db, "url/" + itemId);

    remove(itemRef)
      .then(() => {
        console.log("Item deleted successfully");
        // Optionally, update the state to remove the item from the UI
        // For example, filter out the deleted item from your data
      })
      .catch((error) => {
        console.error("Error deleting item: ", error);
      });
  };
  return (
    <div>
      <MainNavbar />
      {data.length === 0 ? (
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            viewBox="3 3 18 18"
          >
            <circle
              cx="9"
              cy="9"
              r="7"
              stroke="#000000"
              strokeWidth="2"
              fill="none"
            ></circle>
          </svg>
        </div>
      ) : (
        <div className="mt-[100px] px-4 md:px-12">
          {user && (
            <p className="text-xl font-bold text-gray-800 mb-6">
              Welcome,{" "}
              <span className="text-blue-600">
                {user.displayName ? user.displayName : user.email}
              </span>
            </p>
          )}

          {/* Table Layout */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 font-medium text-gray-700">
                    User Image
                  </th>
                  {/* <th className="px-4 py-2 font-medium text-gray-700">
                    Location
                  </th> */}
                  <th className="px-4 py-2 font-medium text-gray-700 text-center">
                    ID
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700">
                    Timestamp
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700">
                    Long URL
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700">
                    Short URL
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700">
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
                    <td className="px-4 py-4 text-center">
                      <img
                        className="rounded-full w-10 h-10 border-2 border-purple-500"
                        src={item.photoURL}
                        alt={item.displayName}
                      />
                    </td>
                    {/* <td className="px-4 py-4 text-center">
                      {item.location?.latitude && item.location?.longitude ? (
                        <MapComponent
                          latitude={item.location.latitude}
                          longitude={item.location.longitude}
                          className="w-32 h-32 rounded-md"
                        />
                      ) : (
                        <span className="text-gray-500">No Location</span>
                      )}
                    </td> */}
                    <td className="px-4 py-4 text-center   text-gray-900 font-semibold">
                      {item.id}
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-600">
                      {item.timestamp}
                    </td>
                    <td className="px-4   py-4 text-center text-blue-600 truncate max-w-xs">
                      {" "}
                      {item.longURL}
                    </td>
                    <td className="px-4 py-4 text-center text-blue-600 truncate max-w-xs">
                      {item.shortURL}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="bg-green-500 text-white text-sm px-4 py-1 rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="px-4 cursor-pointer py-4 text-center">
                      <span
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white text-sm px-4 py-1 rounded-full"
                      >
                        Disactive
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
