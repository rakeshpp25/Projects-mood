import express from "express";
import OverviewModel from "../models/OverviewModel.js";


const router = express.Router();

router.get("/",  async (req, res) => {
      try {
        const userId = req.userpayload.id;
    
        const overview = await OverviewModel.findOne({ businessId: userId });
    
        if (!overview) {
          return res.status(404).json({ message: "Overview not found" });
        }
    
        res.status(200).json(overview);
      } catch (error) {
        console.error("Error fetching overview:", error);
        res.status(500).json({ message: "Error fetching overview" });
      }
    });
// Protected route
router.put('/', async (req, res) => {
      try {
        const userId = req.userpayload.id; // from decoded JWT
        const { Library_name, time, special_features, about_library, amenities } = req.body;
        
        
        const existingOverview = await OverviewModel.findOne({ userId });
    console.log("hello")
        if (existingOverview) {
          // Update existing overview
          existingOverview.Library_name = Library_name;
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
            userId,
            Library_name,
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
