import mongoose from "mongoose";

const userSignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Prevents duplicate emails
  },
  mobile_no: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "business"],
    default: "user",
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
}, { timestamps: true });

// Create a TTL index on the 'createdAt' field for unverified users
userSignupSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 300, // 300 seconds = 5 minutes
    partialFilterExpression: { isverified: false },
  }
);

const usermodel = mongoose.model("user", userSignupSchema);
export default usermodel;
