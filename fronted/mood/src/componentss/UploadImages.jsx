import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadImages = () => {
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const maxImages = 10;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/uploadImages");
      setUploadedImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFileChange = (e) => {
      const selectedImages = e.target.files;
    if (selectedImages.length + images.length > maxImages) {
      alert(`You can upload a maximum of ${maxImages} images.`);
    } else {
      setImages([...images, ...selectedImages]);  // Add the selected images to the state
    }
  };


  const handleUpload = async (e) => {
    e.preventDefault();

    if (!images.length) {
      alert("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      await axios.post("http://localhost:8000/uploadImages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Images uploaded successfully!");
      fetchImages(); // Refresh uploaded images
    } catch (error) {
      console.error("Upload failed:", error.message);
      alert("Upload failed.");
    }
  };

  return (
    <div>
      <h1>Upload Multiple Images</h1>
      <form onSubmit={handleUpload}>
        <input type="file" multiple onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>

      {uploadedImages.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          {uploadedImages.map((user, index) => (
            <div key={index}>
              {user.profilePictures.map((url, i) => (
                <img key={i} src={url} alt={`Uploaded ${i + 1}`} width="100" />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImages;
