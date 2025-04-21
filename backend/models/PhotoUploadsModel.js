import mongoose from "mongoose";

const photoUploadsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  photos: [
    {
      url: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
});


const PhotoUploadsModel = mongoose.model("PhotoUpload", photoUploadsSchema);
export default PhotoUploadsModel;

