import express from "express";
import PostModel from "../models/postModel.js";
import { verifytoken } from "../middleware/auth.js";
const router = express.Router();

router.post("/", verifytoken, async (req, res) => {
  const { text } = req.body;
  const userId = req.userpayload.id; // assuming user is authenticated
  const userRole = req.userpayload.role; // either "User" or "Business"

  try {
    const newPost = await PostModel.create({
      user: userId,
      userModel: userRole,
      text
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

export const post= router
