import React, { useState, useEffect, act } from "react";
import axios from "axios";
import Loader from "../Reuse/Loader";

const Status = ({ businessId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [documentStatus, setDocumentStatus] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // Fetch the current document status when component mounts
 

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/statusUpdate`);
      
      if (response.data && response.data.status) {
        setDocumentStatus(response.data.status);
        setIsActive(response.data.libraryLiveStatus); // ✅ update from backend
      }
    } catch (err) {
      console.error("Error fetching status:", err.message);
      setError("Could not fetch current status.");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:8000/dashboard/status");

      if (response.data) {
        alert("PDF sent successfully to your email!");
        await fetchStatus(); // 🔁 Check the status again
      } else {
        throw new Error("PDF generation failed.");
      }
    } catch (err) {
      
      setError("There was an error generating the PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    if (documentStatus === "approved") {
     
      // Send PUT request to update the status in the database
      try {
        const response = await axios.put(
          `http://localhost:8000/dashboard/updateLibraryStatus`,
          {
            libraryLiveStatus: !isActive,
          }
        );
        if (response.data && typeof response.data.libraryLiveStatus === 'boolean') {
          setIsActive(response.data.libraryLiveStatus); // ✅ update from backend
        }
      } catch (err) {
        console.error("Error updating library live status:", err.message);
        setError("There was an error updating the library status.");
      }
    }
  };

  return (
   <>
   {isLoading && <Loader/>}
    <div className="p-6 max-w-md mx-auto border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Library Status</h2>
      
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        disabled={isLoading}
      >
       Click for submit 
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {documentStatus === "approved" && (
        <div className="mt-4">
          <label className="text-lg">Library Status: </label>
          <button
            onClick={handleToggleStatus}
            className={`px-4 py-2 rounded ${
              isActive ? "bg-green-600" : "bg-gray-400"
            } text-white`}
          >
            {isActive ? "Active" : "Inactive"}
          </button>
        </div>
      )}

      {documentStatus === "rejected" && (
        <p className="mt-4 text-red-600">
          Your document has been rejected. Please contact support.
        </p>
      )}

      {documentStatus === "pending" && (
        <p className="mt-4 text-yellow-600">Document is under review...</p>
      )}
    </div>
   </>
  );
};

export default Status;
