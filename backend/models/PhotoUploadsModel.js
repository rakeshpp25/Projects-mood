import mongoose from "mongoose";

// Photo schema embedded directly into the main schema
const photoUploadsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business", // or "User" based on your auth logic
    required: true,
  },
  photos: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true }, // Needed for deleting from Cloudinary
      uploadedAt: { type: Date, default: Date.now },
    },
  ], 
});

const PhotoUploadsModel = mongoose.model("PhotoUpload", photoUploadsSchema);
export default PhotoUploadsModel;
