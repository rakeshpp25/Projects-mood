import express from "express";
import upload from "../MULTER/multerSetup.js"; // Already configured with CloudinaryStorage
import UploadImages from "../models/PhotoUploadsModel.js";
import cloudinary from "../cloudinary/cloudinarySetup.js";
import { verifytoken } from "../middleware/auth.js";
const router = express.Router();
import jwt from "jsonwebtoken";

// Upload multiple images to Cloudinary and save URLs in MongoDB
router.post("/", verifytoken, upload.array("images"), async (req, res) => {
  try {
    const userId = req.userpayload.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const imageUrls = req.files.map((file) => ({
      url: file.path, // Cloudinary URL
      public_id: file.filename, // This is the public_id in Cloudinary when using CloudinaryStorage
      uploadedAt: new Date(),
    }));

    let existingDoc = await UploadImages.findOne({
      user: userId,
    });

    if (!existingDoc) {
      existingDoc = new UploadImages({ user: userId, photos: imageUrls });
    } else {
      existingDoc.photos = [...existingDoc.photos, ...imageUrls];
    }
    await existingDoc.save();

    // Return the new array of photos as part of the response
    res.status(200).json({ photos: existingDoc.photos });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET images - supports both dashboard (authenticated) and public view by ID
router.get("/:id?", async (req, res) => {
  try {
    let userId;

    if (req.params.id) {
      userId = req.params.id;
    } else {
      let token = req.cookies.token;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    }

    const userDoc = await UploadImages.findOne({ user: userId });

    if (!userDoc || userDoc.photos.length === 0) {
      return res.status(200).json([]);
    }

    console.log("User Doc Photos:", userDoc.photos);
    res.status(200).json(userDoc.photos);
  } catch (err) {
    console.error("Fetch images error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /imageuploads
// DELETE /imageuploads
router.delete("/", verifytoken, async (req, res) => {
  const { public_id } = req.body;
  const userId = req.userpayload.id;

  if (!public_id || !userId) {
    return res.status(400).json({ error: "Missing public_id or userId" });
  }

  try {
    const userPhotos = await UploadImages.findOne({ user: userId });

    if (!userPhotos) {
      return res.status(404).json({ error: "User photos not found" });
    }

    // Check if the photo exists in the database
    const photo = userPhotos.photos.find((p) => p.public_id === public_id);

    if (!photo) {
      return res.status(404).json({ error: "Photo not found for this user" });
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);
    if (result.result !== "ok") {
      return res
        .status(500)
        .json({ error: "Failed to delete from Cloudinary" });
    }

    // Remove from MongoDB (delete the photo from the user's photos array)
    userPhotos.photos = userPhotos.photos.filter(
      (p) => p.public_id !== public_id
    );
    await userPhotos.save();

    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Delete photo error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

export const ImageUploads = router;
