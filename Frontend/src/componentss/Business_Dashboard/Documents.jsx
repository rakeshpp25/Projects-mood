import React, { useState, useEffect } from "react";
import axios from "axios";
import SaveButton from "../Reuse/SaveButton";
import EditButton from "../Reuse/EditButton";

const Documents = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [documents, setDocuments] = useState([
    { label: "Aadhar Card", file: null, preview: "" },
    { label: "PAN Card", file: null, preview: "" },
    { label: "Library Certificate", file: null, preview: "" },
  ]);
  const [error, setError] = useState(null);

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updated = [...documents];
    updated[index].file = file;
    updated[index].preview = URL.createObjectURL(file);
    setDocuments(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updated = [...documents];

      await Promise.all(
        documents.map(async (doc, index) => {
          if (!doc.file) return;

          const formData = new FormData();
          formData.append("image", doc.file);
          formData.append("label", doc.label);

          const response = await axios.post(
            "http://localhost:8000/documentUploads",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            }
          );

          if (response.status === 200 && response.data.imageUrl) {
            console.log(`Uploaded ${doc.label} successfully`);
            updated[index].preview = response.data.imageUrl;
            updated[index].file = null;
          }
        })
      );

      setDocuments(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Upload Error:", err);
      setError("Failed to upload one or more documents. Please try again.");
    }
  };

  const fetchUploadedDocuments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/documentUploads", {
        withCredentials: true,
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        const uploadedDocs = response.data;
        const updated = documents.map((doc) => {
          const match = uploadedDocs.find((d) => d.label === doc.label);
          return match ? { ...doc, preview: match.imageUrl } : doc;
        });
        setDocuments(updated);
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  useEffect(() => {
    fetchUploadedDocuments();
  }, []);

  return (
    <form
      onSubmit={handleSave}
      className="min-h-screen md:px-12 w-full max-w-6xl flex flex-col"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold mb-2 md:mb-0">
          Documents Details
        </h2>
        <div className="md:mr-10">
          <EditButton isEditing={isEditing} onClick={handleEditToggle} />
        </div>
      </header>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="flex flex-col gap-6">
        {documents.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white shadow-sm"
          >
            <img
              src={item.preview || "https://via.placeholder.com/150"}
              alt={`${item.label} preview`}
              className="w-24 h-24 rounded-md object-cover"
            />
            <div className="flex flex-col justify-center gap-2 w-full">
              <div className="text-sm font-medium text-gray-700">
                Please Upload {item.label}
              </div>
              <input
                type="file"
                accept="image/*"
                disabled={!isEditing}
                onChange={(e) => handleFileChange(e, index)}
                className={`text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 ${
                  isEditing
                    ? "file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
                    : "file:bg-gray-200 file:text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-8">
          <SaveButton />
        </div>
      )}
    </form>
  );
};

export default Documents;
