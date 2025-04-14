import express from "express";
const router = express.Router();
import AddressModel from "../models/Address.js"; // Your address model


// ✅ GET Address
router.get("/", async (req, res) => {
  try {
      const userId = req.userpayload.id;
   

    const address = await AddressModel.findOne({ user: userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(address);
  } catch (err) {
    console.error("Error fetching address:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/", async (req, res) => {
      try {
        const userId = req.userpayload.id; // from decoded JWT
        const {
          building_name,
          area_name,
          pin_code,
          city,
          state,
          landmark,
          location,
          coordinates,
        } = req.body;
    
        console.log("Received address data:", req.body);
    
        // 🔧 Correct field used here
        const existingAddress = await AddressModel.findOne({ user: userId });
    
        if (existingAddress) {
          // ✅ Update existing address
          existingAddress.building_name = building_name;
          existingAddress.area_name = area_name;
          existingAddress.pin_code = pin_code;
          existingAddress.city = city;
          existingAddress.state = state;
          existingAddress.landmark = landmark;
          existingAddress.location = location;
          existingAddress.coordinates = coordinates;
    
          await existingAddress.save();
          return res.status(200).json({ message: "Address updated successfully!" });
        } else {
          // ✅ Create new address
          const newAddress = new AddressModel({
            user: userId, // ✅ This was 'owner' before
            building_name,
            area_name,
            pin_code,
            city,
            state,
            landmark,
            location,
            coordinates,
          });
    
          await newAddress.save();
          return res.status(200).json({ message: "Address created successfully!" });
        }
      } catch (error) {
        console.error("Address error:", error);
        res.status(500).json({ message: "Error saving address" });
      }
    });
    
export const address = router;
