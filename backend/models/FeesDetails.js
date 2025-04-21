import mongoose from "mongoose";

// Schema for individual fee items
const feeItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

// Schema for fee details (Hourly, Weekly, Monthly)
const feeDetailsSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  Hourly: [feeItemSchema],
  Weekly: [feeItemSchema],
  Monthly: [feeItemSchema]
}, { timestamps: true });

// Create the FeesDetails model using feeDetailsSchema
const FeesDetails = mongoose.model("FeesDetails", feeDetailsSchema);

export default FeesDetails;
