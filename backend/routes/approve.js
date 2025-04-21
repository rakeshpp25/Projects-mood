import express from 'express';
import BusinessModel from '../models/BusinessSignup.js';

const router = express.Router();

// ✅ Approve Library
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the business by user ID
    const business = await BusinessModel.findById(id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Update the status to approved
    business.status = 'approved'; // Assuming you have a `status` field
    await business.save();

    res.status(200).json({ message: 'Library approved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong while approving' });
  }
});

// // ❌ Reject Library
// router.get('/reject/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Find the business by user ID
//     const business = await BusinessModel.findById(id);
//     if (!business) {
//       return res.status(404).json({ message: 'Business not found' });
//     }

//     // Update the status to rejected
//     business.status = 'rejected'; // Assuming you have a `status` field
//     await business.save();

//     res.status(200).json({ message: 'Library rejected successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Something went wrong while rejecting' });
//   }
// });

export const StatusUpdate = router;
