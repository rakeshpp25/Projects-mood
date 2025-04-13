import express from "express";
import upload from "../MULTER/multerSetup.js";
import cloudinary from "../cloudinary/cloudinarySetup.js";
import UploadImages from "../models/ImageUploads.js";
import usermodel from "../models/usersignup.js";

const router = express.Router();


// Upload images to Cloudinary and save URLs in MongoDB
router.post("/", upload.array("images", 10), async (req, res) => {
      
        const userId = req.userId;
        
    
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: "No files uploaded" });
        }
    
        // Check if the user exists
        const user = await usermodel.findById(userId);
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Upload each image to Cloudinary and store URLs
        const imageUploadPromises = req.files.map(async (file) => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "uploads" }, (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }).end(file.buffer);
          });
        });
    
        // Get all the uploaded image URLs
        const uploadedUrls = await Promise.all(imageUploadPromises);
    
        // Find if the user already has uploaded images and add new ones
        const userImages = await UploadImages.findOne({ userId });
    
        if (userImages) {
          // Update existing record with new image URLs
          userImages.profilePictures.push(...uploadedUrls);
          await userImages.save();
        } else {
          // Create new record if none exists for the user
      //     const newUserImages = new UploadImages({ usermodel: userId, profilePictures: uploadedUrls });
      //     await newUserImages.save();
      console.log("sorry can't upload images ")
        }
    
        res.status(201).json({ message: "Images uploaded successfully!", profilePictures: uploadedUrls });
      } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ message: "Server Error" });
      }
    });
    
    // Get all uploaded images for a specific user
    router.get("/", async (req, res) => {
      const { userId } = req;
    
      try {
        // Find images for the specific user
        const userImages = await UploadImages.findOne({ userId });
        
        if (!userImages) {
          return res.status(404).json({ message: "No images found for this user" });
        }
        res.status(200).json(userImages);
      } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ message: "Server Error" });
      }
    });
    
    export const ImageUploads = router;