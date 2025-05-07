// businessRoutes.js
import express from 'express';
import BusinessModel from '../models/BusinessSignup.js'; // adjust path accordingly

const router = express.Router();

// This route will update the live status of a library.
router.put('/', async (req, res) => {
 const userId = req.userpayload.id;
  const { libraryLiveStatus } = req.body;

  try {
    // Validate the library live status
    if (typeof libraryLiveStatus !== 'boolean') {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find and update the business with the given businessId
    const updatedBusiness = await BusinessModel.findByIdAndUpdate(
      userId,
      { libraryLiveStatus },
      { new: true } // Return the updated business document
    );

    if (!updatedBusiness) {
      return res.status(404).json({ message: 'Business not found' });
    }

     res.status(200).json({
      status: updatedBusiness.status, // approved / pending / rejected
      libraryLiveStatus: updatedBusiness.libraryLiveStatus, // true / false
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update library status' });
  }
});

export const updateLibraryStatus = router;
