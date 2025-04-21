import express from "express";
const router = express.Router();
import businessmodel from "../models/BusinessSignup.js"; // adjust the path as needed

// GET /librarydetails - Return libraries filtered by city if provided
router.get('/', async (req, res) => {
  const { city } = req.query; // grab city from query params
console.log("recwived " , city)
  try {
    let filter = { libraryLiveStatus: true };

    if (city) {
      // Case-insensitive city search
      filter.city = { $regex: new RegExp(city, 'i') };
    }

    const libraries = await businessmodel.find(filter);
    console.log(libraries)
    res.status(200).json(libraries);
  } catch (err) {
    console.error("Error fetching suggested libraries:", err);
    res.status(500).json({ message: 'Failed to fetch libraries' });
  }
});

export const LibraryDetails = router;
