import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  userModel: { type: String, enum: ["user", "business"], required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostModel = mongoose.model('Post', postSchema); // Capitalized model name
export default PostModel;
