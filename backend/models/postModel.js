import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "userModel" // Dynamically refers to the right model
  },
  userModel: {
    type: String,
    required: true,
    enum: ["user", "Business"] // Must match model names exactly
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
