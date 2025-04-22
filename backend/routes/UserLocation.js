import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
    const { latitude, longitude } = req.body;

    const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;// Replace with your Geoapify API Key

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    try {
        // Call Geoapify API for reverse geocoding
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_API_KEY}`);
        
        if (response.data.features.length > 0) {
            const locationData = response.data.features[0].properties;

            // Extract relevant address details
            const formattedAddress = locationData.formatted || "Address not found";
            const street = locationData.street || locationData.road || locationData.name || locationData.address_line1 || "N/A";
            const city = locationData.city || "N/A";
            const state = locationData.state || "N/A";
            const postalCode = locationData.postcode || "N/A";

            console.log("Full Address Response:", JSON.stringify(locationData, null, 2)); // Log full response

            return res.status(200).json({
                formattedAddress,
                street,
                city,
                state,
                postalCode
            });
        } else {
            return res.status(404).json({ error: "Address not found" });
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        return res.status(500).json({ error: "Failed to fetch address", details: error.message });
    }
});

export const UserLocation = router;
