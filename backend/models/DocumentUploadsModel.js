// models/DocumentUpload.js

import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business", // or "User" based on your auth logic
    required: true,
  },
  documents: [
    {
      label: { type: String, required: true },
      url: { type: String, required: true }, // Cloudinary URL
    },
  ],
}, { timestamps: true });

const DocumentUploadModel = mongoose.model("DocumentUpload", documentSchema);

export default DocumentUploadModel;
