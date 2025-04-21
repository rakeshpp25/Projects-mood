import React, { lazy, Suspense, useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LibraryCard = lazy(() => import('./LibraryCard'));

const SuggestedLibraries = () => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLibraries = async () => {
    try {
      const storedLocation = localStorage.getItem('userLocation');
      let apiURL = 'http://localhost:8000/librarydetails';

      if (storedLocation) {
        let { city } = JSON.parse(storedLocation);

        if (city) {
          // Clean city name to remove pincode or extra parts
          city = city.split("-")[0].trim();  // This will give us only the city name, e.g., 'Sultanpur'
          console.log("Fetching libraries for city:", city);

          apiURL = `http://localhost:8000/librarydetails?city=${encodeURIComponent(city)}`;
        }
      }

      const response = await axios.get(apiURL);
      console.log("Suggested Libraries API response:", response);

      if (Array.isArray(response.data)) {
        const formattedLibraries = response.data.map(lib => ({
          title: lib.library_name,
          location: lib.city || 'Unknown Location',
          latitude: lib.latitude,
          longitude: lib.longitude,
        }));

        setLibraries(formattedLibraries);
      } else {
        console.error('Expected an array of libraries, but got:', response.data);
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

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <>
      <h2 className="text-3xl ml-10 font-bold my-6">Suggested For You</h2>
      <div className="w-[95%] mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          {loading ? (
            <div className="text-center py-6">Loading libraries...</div>
          ) : libraries.length > 0 ? (
            <Slider {...settings}>
              {libraries.map((lib, idx) => (
                <div key={idx} className="px-2">
                 <LibraryCard
  title={lib.title}
  location={lib.location}
  libLat={lib.latitude}
  libLng={lib.longitude}
/>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center py-6">No libraries available</div>
          )}
        </Suspense>
      </div>
    </>
  );
};

export default SuggestedLibraries;
