import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LibraryCard = lazy(() => import("./LibraryCard"));

const SuggestedLibraries = () => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLibraries = async () => {
    try {
      const storedLocation = localStorage.getItem("userLocation");
      let apiURL = "https://backend-wpv4.onrender.com/librarydetails";

      if (storedLocation) {
        let { city } = JSON.parse(storedLocation);

        if (city) {
          // Clean city name to remove pincode or extra parts
          city = city.split("-")[0].trim(); // This will give us only the city name, e.g., 'Sultanpur'
          console.log("Fetching libraries for city:", city);

          apiURL = `https://backend-wpv4.onrender.com/librarydetails?city=${encodeURIComponent(
            city
          )}`;
        }
      }

      const response = await axios.get(apiURL);
      console.log("Suggested Libraries API response:", response);

      if (Array.isArray(response.data)) {
        const formattedLibraries = response.data.map((lib) => ({
          id: lib._id,
          title: lib.library_name,
          location: lib.city || "Unknown Location",
          latitude: lib.latitude,
          longitude: lib.longitude,
          images: lib.images || [],
        }));

        setLibraries(formattedLibraries);
      } else {
        console.error(
          "Expected an array of libraries, but got:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching libraries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraries();
  }, []);

  return (
    <>
      <h2 className="text-3xl ml-10 font-bold my-6">Suggested For You</h2>
      <div className="w-[95%] mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          {loading ? (
            <div className="text-center py-6">Loading libraries...</div>
          ) : libraries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {libraries.map((lib, idx) => (
                <div
                  key={idx}
                  className="flex justify-center items-center px-2 py-4"
                >
                  <LibraryCard
                    id={lib.id}
                    title={lib.title}
                    location={lib.location}
                    liblat={lib.latitude}
                    liblang={lib.longitude}
                    images={lib.images}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">No libraries available</div>
          )}
        </Suspense>
      </div>
    </>
  );
};

export default SuggestedLibraries;
