import mongoose from "mongoose";

const BusinessSignupSchema = new mongoose.Schema({
  library_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
    default: "business", // This is a business model, so default should be "business"
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

// Create a TTL index on the 'createdAt' field for unverified businesses
BusinessSignupSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 300, // 300 seconds = 5 minutes
    partialFilterExpression: { isverified: false },
  }
);

const BusinessModel = mongoose.model("Business", BusinessSignupSchema);
export default BusinessModel;
