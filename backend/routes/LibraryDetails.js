import express from "express";
const router = express.Router();
import businessmodel from "../models/BusinessSignup.js"; // adjust the path as needed
import UploadImages from "../models/PhotoUploadsModel.js";
// GET /librarydetails - Return libraries filtered by city if provided
router.get('/', async (req, res) => {
  const { city } = req.query;

  try {
    let filter = { libraryLiveStatus: true };

    if (city) {
      filter.city = { $regex: new RegExp(city, 'i') };
    }

    const libraries = await businessmodel.find(filter);

    // Fetch images for each library
    const librariesWithImages = await Promise.all(
      libraries.map(async (lib) => {
        const images = await UploadImages.findOne({ user: lib._id }); // or use `.find()` if multiple entries per user
        return {
          ...lib.toObject(),
          images: images ? images.photos : [], // add images array to each library
        };
      })
    );

    res.status(200).json(librariesWithImages);
  } catch (err) {
    console.error("Error fetching suggested libraries:", err);
    res.status(500).json({ message: 'Failed to fetch libraries' });
  }
});


export const LibraryDetails = router;
