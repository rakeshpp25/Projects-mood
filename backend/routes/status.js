import express from "express";
import PDFDocument from "pdfkit";
import BusinessModel from "../models/BusinessSignup.js";
import OverviewModel from "../models/OverviewModel.js";
import FeesDetails from "../models/FeesDetails.js";
import Address from "../models/Address.js";
import DocumentUploadsModel from "../models/DocumentUploadsModel.js";
import PhotoUploadsModel from "../models/PhotoUploadsModel.js";
import fs from "fs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";
import { transporter } from "../middleware/emailConfig.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Generate PDF and send email
router.get("/", async (req, res) => {
  try {
    const userId = req.userpayload.id;
    const user = await BusinessModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const libraryOverview = await OverviewModel.findOne({ user: userId });
    const libraryFees = await FeesDetails.findOne({ user: userId });
    const libraryAddress = await Address.findOne({ user: userId });
    const libraryDocumentUploads = await DocumentUploadsModel.findOne({
      user: userId,
    });
    const libraryPhotoUploads = await PhotoUploadsModel.findOne({
      user: userId,
    });

    if (!libraryOverview)
      return res.status(404).json({ message: "Library details not found" });

    const pdfPath = path.join(
      __dirname,
      `../pdfs/library-details-${userId}.pdf`
    );
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // ✅ Textual Data
    doc.fontSize(20).text("Library Details", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Library Profile:\n${JSON.stringify(user, null, 2)}`);
    doc.moveDown();

    doc
      .fontSize(14)
      .text(`Library Overview:\n${JSON.stringify(libraryOverview, null, 2)}`);
    doc.moveDown();

    doc
      .fontSize(14)
      .text(`Library Address:\n${JSON.stringify(libraryAddress, null, 2)}`);
    doc.moveDown();

    doc
      .fontSize(14)
      .text(`Library Fees:\n${JSON.stringify(libraryFees, null, 2)}`);
    doc.moveDown();

    // ✅ Document Uploads (on one page)
    if (libraryDocumentUploads?.documents?.length > 0) {
      doc.addPage();
      doc.fontSize(18).text("📄 Document Uploads", { underline: true });
      doc.moveDown();

      let yPosition = 100; // Starting Y position for documents

      for (const docItem of libraryDocumentUploads.documents) {
        try {
          console.log(`📥 Fetching document image from: ${docItem.url}`);
          const response = await axios.get(docItem.url, {
            responseType: "arraybuffer",
            timeout: 10000,
          });

          const imageBuffer = Buffer.from(response.data, "binary");

          doc.fontSize(14).text(docItem.label, { underline: true });
          doc.moveDown();

          // Add the document image with a fixed position
          doc.image(imageBuffer, {
            fit: [200, 200], // Reduced size
            align: "center",
            valign: "center",
            y: yPosition, // Set position on the page
          });

          yPosition += 250; // Move down after each document

          // If documents are too many, add a new page after a certain threshold
          if (yPosition > 700) {
            doc.addPage();
            yPosition = 100; // Reset Y position for the new page
          }
        } catch (err) {
          console.error(`Failed to load ${docItem.label}:`, err.message);
          doc
            .addPage()
            .fontSize(14)
            .text(`⚠️ Could not load image for ${docItem.label}`);
        }
      }
    } else {
      doc.addPage().fontSize(14).text("No documents uploaded.");
    }

    // ✅ Photo Uploads (on a separate page)
    if (libraryPhotoUploads?.photos?.length > 0) {
      doc.addPage();
      doc.fontSize(18).text("📸 Photo Uploads", { underline: true });
      doc.moveDown();

      let yPosition = 100; // Starting Y position for photos

      for (const [index, photo] of libraryPhotoUploads.photos.entries()) {
        try {
          console.log(`📥 Fetching photo ${index + 1}: ${photo.url}`);

          const response = await axios.get(photo.url, {
            responseType: "arraybuffer",
            timeout: 10000,
          });

          const imageBuffer = Buffer.from(response.data, "binary");

          doc.fontSize(14).text(`Photo ${index + 1}`, { underline: true });
          doc.moveDown();

          // Add the photo with a fixed position
          doc.image(imageBuffer, {
            fit: [200, 200], // Smaller size
            align: "center",
            valign: "center",
            y: yPosition, // Set position on the page
          });

          yPosition += 250; // Move down after each photo

          // If photos are too many, add a new page after a certain threshold
          if (yPosition > 700) {
            doc.addPage();
            yPosition = 100; // Reset Y position for the new page
          }
        } catch (err) {
          console.error(`Failed to load photo ${index + 1}:`, err.message);
          doc
            .addPage()
            .fontSize(14)
            .text(`⚠️ Could not load photo ${index + 1}`);
        }
      }
    } else {
      doc.addPage().fontSize(14).text("No photos uploaded.");
    }

    doc.end();

    writeStream.on("finish", async () => {
      const baseUrl = "http://localhost:8000";
      const approveLink = `${baseUrl}/approve/${userId}`;
      const rejectLink = `${baseUrl}/status/reject/${userId}`;

      await transporter.sendMail({
        from: `"MOOD App" <${process.env.EMAIL_ADDRESS}>`,
        to: "milliodream584@gmail.com",
        subject: "Library Approval Request - MOOD App",
        html: `
          <p>📚 <strong>${libraryOverview.Library_name}</strong> has submitted their library for review.</p>
          <p>Attached is the PDF with all the details.</p>
          <br />
          <a href="${approveLink}" style="padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">✅ Approve</a>
          <a href="${rejectLink}" style="padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">❌ Reject</a>
        `,
        attachments: [
          {
            filename: `library-details-${userId}.pdf`,
            path: pdfPath,
          },
        ],
      });

      res.status(200).json({ message: "PDF emailed with action links!" });
    });
  } catch (err) {
    console.error("Error in PDF/email generation:", err.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

export const Status = router;
