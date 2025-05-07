import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business", // or "Business"
    required: true,
    unique: true
  },
  building_name: {
    type: String,
    required: true
  },
  area_name: {
    type: String,
    required: true
  },
  pin_code: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  landmark: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

// Enable geospatial queries
addressSchema.index({ coordinates: '2dsphere' });

const AddressModel = mongoose.model("Address", addressSchema);
export default AddressModel;
