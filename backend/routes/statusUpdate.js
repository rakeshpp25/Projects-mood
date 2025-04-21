import express from 'express';
import BusinessModel from "../models/BusinessSignup.js";
const router = express.Router();
router.get('/', async (req, res) => {
      const userId = req.userpayload.id;
    
      try {
        const business = await BusinessModel.findById(userId);
        if (!business) {
          return res.status(404).json({ message: 'Business not found' });
        }
    
        res.status(200).json({ status: business.status });
      } catch (err) {
        res.status(500).json({ message: 'Error fetching status' });
      }
    });
    export const BusinessUpdate = router;