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
  aadharNumber: {
    type: String,
    // required: true, // Changed 'require' to 'required'
  },
  altMobileNumber: {
    type: String,
    // required: true, // Changed 'require' to 'required'
  },
  gender: {
    type: String,
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
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  libraryLiveStatus: {
    type: Boolean,
    default: false, // Default to false, assuming the library is not live initially
  }
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
