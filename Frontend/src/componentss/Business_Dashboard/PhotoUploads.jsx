import React, { useState, useRef, useEffect } from "react";
import EditButton from "../Reuse/EditButton";
import SaveButton from "../Reuse/SaveButton";
import axios from "axios";
import Loader from "../Reuse/Loader";
import { FiTrash } from "react-icons/fi"; // ✅ React Icons

function PhotoUploads() {
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState([]); // Uploaded images from backend
  const [previewImages, setPreviewImages] = useState([]); // New selected images
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null); // Track image for deletion confirmation
  const fileInputRef = useRef();

  // Fetch already uploaded images on mount
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://backend-wpv4.onrender.com/dashboard/imageuploads",
        {
          withCredentials: true,
        }
      );
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previewImages.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [previewImages]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setPreviewImages([]); // Reset previews when toggling
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    if (!files) return;

    const fileArray = Array.from(files);

    if (fileArray.length + images.length + previewImages.length > 8) {
      alert("You can only upload up to 8 images total.");
      fileInputRef.current.value = "";
      return;
    }

    const newPreviews = fileArray.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // ✅ Handle preview image delete
  const handleDeletePreview = (indexToDelete) => {
    setPreviewImages((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  // ✅ Handle delete image from saved images with modal confirmation
  const handleDeleteImage = (publicId) => {
    // Confirm that the publicId is passed correctly
    setImageToDelete(publicId); // Set the image to delete in the state
    setShowModal(true); // Show modal
  };

  const confirmDelete = async () => {
    if (!imageToDelete) {
      return; // Prevent delete if no public_id is passed
    }

    setLoading(true);
    try {
      await axios.delete(
        "https://backend-wpv4.onrender.com/dashboard/imageuploads",
        {
          data: { public_id: imageToDelete }, // Use the publicId directly
          withCredentials: true,
        }
      );
      setShowModal(false);
      await fetchImages(); // Re-fetch images to stay in sync
    } catch (err) {
      console.error("Failed to delete image:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setImageToDelete(null); // Reset imageToDelete on cancel
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setLoading(true);

    const files = previewImages.map((item) => item.file);
    if (files.length === 0) {
      alert("Please select images before saving.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      await axios.post(
        "https://backend-wpv4.onrender.com/dashboard/imageuploads",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      await fetchImages();
      setPreviewImages([]);
      setIsEditing(false);
      fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSave} className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center">
          <h2>Upload Photos</h2>
          <EditButton isEditing={isEditing} onClick={handleEditToggle} />
        </div>

        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            disabled={!isEditing || images.length + previewImages.length >= 8}
          />
          {images.length + previewImages.length >= 8 && (
            <p className="text-red-500 mt-1">
              You can only upload a maximum of 8 images.
            </p>
          )}
        </div>

        {/* ✅ Preview newly selected images */}
        {previewImages.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Selected Images (Preview)</h3>
            <div className="flex flex-wrap gap-4 mt-2">
              {previewImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Preview ${index}`}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    className="rounded shadow border-2 border-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeletePreview(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100 transition"
                  >
                    <FiTrash className="text-red-500" size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Already uploaded images */}
        {images.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Uploaded Images</h3>
            <div className="flex flex-wrap gap-4 mt-2">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={`Uploaded ${index}`}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    className="rounded shadow"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image.public_id)} // Pass public_id for deletion
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100 transition"
                  >
                    <FiTrash className="text-red-500" size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        {isEditing && (
          <div className="mt-4">
            <SaveButton />
          </div>
        )}
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm mx-auto">
            <h3 className="text-lg font-semibold">
              Are you sure you want to delete this image?
            </h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={confirmDelete} // No need to pass anything, imageToDelete is used directly
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PhotoUploads;
