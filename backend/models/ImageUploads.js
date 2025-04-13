// Here we create a User model that stores the user's profile pictures as an array of Cloudinary URLs.

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
      userId: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "usermodel",
             required: true,
       },
  profilePictures: [{ type: String }], // Array of Cloudinary image URLs
});

const UploadImages = mongoose.model("ImageUploads", UserSchema);
export default UploadImages;