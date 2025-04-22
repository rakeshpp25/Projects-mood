import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Status = ({ businessId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [documentStatus, setDocumentStatus] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // 👇 Fetch the current document status when component mounts
  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/statusUpdate`);
      console.log(response)
      if (response.data && response.data.status) {
        setDocumentStatus(response.data.status);
      }
    } catch (err) {
      console.error('Error fetching status:', err.message);
      setError('Could not fetch current status.');
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      
      const response = await axios.get('http://localhost:8000/status');

      if (response.data) {
        alert('PDF sent successfully to your email!');
        await fetchStatus(); // 🔁 Check the status again
      } else {
        throw new Error('PDF generation failed.');
      }
    } catch (err) {
      console.error('Error generating PDF:', err.message);
      setError('There was an error generating the PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    if (documentStatus === 'approved') {
      setIsActive(!isActive);

      // Send PUT request to update the status in the database
      try {
        const response = await axios.put(`http://localhost:8000/updateLibraryStatus`, {
          libraryLiveStatus: !isActive,
        });
        if (response.data) {
          console.log('Library live status updated:', response.data);
        }
      } catch (err) {
        console.error('Error updating library live status:', err.message);
        setError('There was an error updating the library status.');
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Library Status</h2>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        disabled={isLoading}
      >
        {isLoading ? 'Generating PDF...' : 'Submit Details for Verification'}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {documentStatus === 'approved' && (
        <div className="mt-4">
          <label className="text-lg">Library Status: </label>
          <button
            onClick={handleToggleStatus}
            className={`px-4 py-2 rounded ${isActive ? 'bg-green-600' : 'bg-gray-400'} text-white`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </button>
        </div>
      )}

      {documentStatus === 'rejected' && (
        <p className="mt-4 text-red-600">Your document has been rejected. Please contact support.</p>
      )}

      {documentStatus === 'pending' && (
        <p className="mt-4 text-yellow-600">Document is under review...</p>
      )}
    </div>
  );
};

export default Status;
