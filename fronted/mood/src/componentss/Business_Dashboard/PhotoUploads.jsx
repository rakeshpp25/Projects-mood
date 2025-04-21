import React, { useState, useEffect } from "react";
import axios from "axios";

const PhotoUploads = () => {
  const [images, setImages] = useState([{ file: null, preview: null }]);
  const [savedImages, setSavedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/PhotoUploads", {
          withCredentials: true, // if you're using cookies with JWT
        });
        setSavedImages(response.data || []);
        console.log("Fetched saved images:", response.data); // Log fetched images
      } catch (error) {
        console.error("Error fetching saved images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedImages();
  }, []);

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = {
        file,
        preview: URL.createObjectURL(file),
      };
      setImages(newImages);
    }
  };

  const handleAddMore = () => {
    setImages([...images, { file: null, preview: null }]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    let hasImage = false;

    images.forEach((imgObj) => {
      if (imgObj.file) {
        formData.append("images", imgObj.file);
        hasImage = true;
      }
    });

    if (!hasImage) {
      alert("Please select at least one image before saving.");
      return;
    }

    try {
      setLoading(true); // Set loading state to true while uploading
      const response = await axios.post(
        "http://localhost:8000/PhotoUploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Images saved successfully!");
        const updated = await axios.get("http://localhost:8000/PhotoUploads", {
          withCredentials: true,
        });
        setSavedImages(updated.data || []);

        // Log the URLs of the newly uploaded images
        console.log("Uploaded image URLs:", updated.data);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error saving images.");
    } finally {
      setLoading(false); // Set loading state back to false after upload completes
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", maxWidth: "600px" }}
    >
      <h3>Upload Photos</h3>

      {images.map((img, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(index, e)}
          />
          {img.preview && (
            <img
              src={img.preview}
              alt={`Preview ${index}`}
              style={{ width: "100%", borderRadius: "8px", marginTop: "5px" }}
            />
          )}
        </div>
      ))}

      <button onClick={handleAddMore} style={btnStyle("#28a745")}>
        Add More
      </button>
      <button
        onClick={handleSave}
        style={btnStyle("#007bff")}
        disabled={loading || images.every((img) => !img.file)}
      >
        {loading ? "Uploading..." : "Save"}
      </button>

      <h4>Saved Images</h4>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {savedImages.length === 0 ? (
            <p>No images uploaded yet.</p>
          ) : (
            savedImages.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Saved ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  margin: "5px",
                  borderRadius: "8px",
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const btnStyle = (bgColor) => ({
  marginRight: "10px",
  padding: "8px 16px",
  backgroundColor: bgColor,
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});

export default PhotoUploads;
