import express from "express";
const router = express.Router();
import FeesDetails from "../models/FeesDetails.js"; // FeesDetails model import



// Fetching the fee details for the logged-in user (business)
router.get("/", async (req, res) => {
  try {
    const userId = req.userpayload.id; // Access user ID from JWT payload

    const feesDetails = await FeesDetails.findOne({user : userId }); // Find fee details by userId

    if (!feesDetails) {
      return res.status(404).json({ message: "Fees details not found" });
    }

    res.status(200).json(FeesDetails);
  } catch (error) {
    console.error("Error fetching fees details:", error);
    res.status(500).json({ message: "Error fetching fees details" });
  }
});

// Protected route for updating or creating the fee details
router.put('/', async (req, res) => {
  try {
    const userId = req.userpayload.id; // Access user ID from JWT payload
    const { Hourly, Weekly, Monthly } = req.body; // The fee details sent in the request

    // Try to find an existing fee details document for the business user
    let existingFeesDetails = await FeesDetails.findOne({user : userId });

    if (existingFeesDetails) {
      // If the fees details exist, update them with the new data
      existingFeesDetails.Hourly = Hourly; // Assuming Hourly is an array of fee items
      existingFeesDetails.Weekly = Weekly; // Weekly fee details
      existingFeesDetails.Monthly = Monthly; // Monthly fee details

      await existingFeesDetails.save();
      return res.status(200).json({ message: 'Fees details updated successfully!' });
    } else {
      // If no fee details exist, create a new one
      const newFeesDetails = new FeesDetails({
        businessId: userId,
        Hourly,
        Weekly,
        Monthly,
      });

      await newFeesDetails.save();
      return res.status(200).json({ message: 'Fees details created successfully!' });
    }
  } catch (error) {
    console.error("Error saving fees details:", error);
    res.status(500).json({ message: 'Error saving fees details' });
  }
});

export const feesDetails = router;
