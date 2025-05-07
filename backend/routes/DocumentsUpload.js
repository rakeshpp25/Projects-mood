import express from "express";
import upload from "../MULTER/multerSetup.js";
import DocumentUpload from "../models/DocumentUploadsModel.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { label } = req.body;
    const userId = req.userpayload.id;
   
    if (!req.file || !label) {
      return res.status(400).json({ message: "Missing image or label" });
    }

    const imageUrl = `${req.file.path.replace(/\\/g, "/")}`; // Normalize path for all OS

    let existingDoc = await DocumentUpload.findOne({user : userId });

    if (existingDoc) {
      const index = existingDoc.documents.findIndex(doc => doc.label === label);

      if (index !== -1) {
        existingDoc.documents[index].url = imageUrl;
      } else {
        existingDoc.documents.push({ label, url: imageUrl });
      }
console.log("Existing Doc:", existingDoc);
      await existingDoc.save();
    } else {
      await DocumentUpload.create({
        user: userId,
        documents: [{ label, url: imageUrl }],
      });
    }

    res.status(200).json({
      message: "Uploaded and saved successfully",
      imageUrl, // Make sure frontend uses this key
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.userpayload.id;

    const userDocs = await DocumentUpload.findOne({user : userId });

    if (!userDocs || userDocs.documents.length === 0) {
      return res.status(200).json([]);
    }

    const response = userDocs.documents.map((doc) => ({
      label: doc.label,
      imageUrl: doc.url.replace(/\\/g, "/"),
    }));

    res.status(200).json(response);
  } catch (err) {
    console.error("Fetch documents error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export const DocumentUploads = router;
