import express from "express";
import upload from "../MULTER/multerSetup.js";
import PhotoUpload from "../models/PhotoUploadsModel.js";

const router = express.Router();

router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const userId = req.userpayload.id; // Assuming you have user payload from JWT

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    const photoData = req.files.map((file) => ({
      url: `https://projects-mood-backend-yugw.onrender.com/${file.path.replace(
        /\\/g,
        "/"
      )}`, // Full URL for the image
      uploadedAt: new Date(),
    }));

    let userPhotos = await PhotoUpload.findOne({ user: userId });

    if (userPhotos) {
      userPhotos.photos.push(...photoData);
      await userPhotos.save();
    } else {
      await PhotoUpload.create({
        userId,
        photos: photoData,
      });
    }

    res.status(200).json({
      message: "Photos uploaded successfully",
      photos: photoData,
    });
  } catch (err) {
    console.error("Photo upload error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.userpayload.id; // Assuming you have user payload from JWT
    const userPhotos = await PhotoUpload.findOne({ user: userId });

    if (!userPhotos || userPhotos.photos.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(userPhotos.photos);
  } catch (err) {
    console.error("Fetch photos error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export const PhotoUploads = router;
