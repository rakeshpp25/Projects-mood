import mongoose from "mongoose";

const OverviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    time: [
      {
        day: {
          type: String,
          required: true,
        },
        status: {
          type: String, // e.g. "24", "close", "custom"
          enum: ["24", "close", "custom"],
          required: true,
        },
        customTime: {
          type: String, // e.g. "10 AM - 5 PM" only if status is custom
          default: "",
        },
      },
    ],
    amenities: {
      type: [String],
      default: [],
    },
    special_features: {
      type: [String],
      default: [],
    },
    about_library: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const OverviewModel = mongoose.model("Overview", OverviewSchema);
export default OverviewModel;
