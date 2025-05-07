import express from "express";
import OverviewModel from "../models/OverviewModel.js";


const router = express.Router();

router.get("/:id?",  async (req, res) => {
      try {
      let userId;

    // If route param `id` is present, use it (e.g., from /dashboard/imageuploads/:id for public)
    // Otherwise, fall back to authenticated user's ID for dashboard use
    if (req.params.id) {
      userId = req.params.id;
    } else {
      userId = req.userpayload.id;
    }
   
        const overview = await OverviewModel.findOne({user :userId });
      
       
    if (!overview) {
      return res.status(200).json([]);
    }
    
        res.status(200).json(overview);
      } catch (error) {
        
        res.status(500).json({ message: "Error fetching overview"});
      }
    });
// Protected route
router.put('/', async (req, res) => {
      try {
        const userId = req.userpayload.id; // from decoded JWT
        const {  time, special_features, about_library, amenities } = req.body;
        
        
        const existingOverview = await OverviewModel.findOne({user : userId });
    
        if (existingOverview) {
          // Update existing overview
          existingOverview.special_features = special_features;
          existingOverview.about_library = about_library;
          existingOverview.amenities = amenities;
          
          // Save time as an array of day objects (e.g. Monday, Tuesday, etc.)
          existingOverview.time = time; // Assuming time is an array of objects with day and status fields
    
          await existingOverview.save();
          return res.status(200).json({ message: 'Overview updated successfully!' });
        } else {
          // Create new overview
          const newOverview = new OverviewModel({
            user: userId,
            time, // Save the entire time object (array of day objects)
            special_features,
            about_library,
            amenities,
          });
    
          await newOverview.save();
          return res.status(200).json({ message: 'Overview created successfully!' });
        }
      } catch (error) {
        console.error("Overview error:", error);
        res.status(500).json({ message: 'Error saving overview' });
      }
    });
    
export const overview = router;
