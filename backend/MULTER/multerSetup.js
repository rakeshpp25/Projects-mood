// This file handles the file upload using Multer and stores the images directly on Cloudinary.
import multer from "multer";

const storage = multer.memoryStorage(); // Keep files in memory, NOT on server
const upload = multer({ storage });

export default upload;
