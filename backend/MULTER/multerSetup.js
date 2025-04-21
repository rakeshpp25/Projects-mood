import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary'; // ✅ fixed import
import cloudinary from './../cloudinary/cloudinarySetup.js';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'MOOD/documents',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'gif'],
    // transformation: [{ width: 500, height: 500, crop: 'limit' }], // optional
  },
});

const upload = multer({ storage });

export default upload;
