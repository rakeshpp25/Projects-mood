import express from "express";
import PDFDocument from "pdfkit";
import BusinessModel from "../models/BusinessSignup.js";
import OverviewModel from "../models/OverviewModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { transporter } from "../middleware/emailConfig.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Generate PDF and send email with Approve/Reject buttons
router.get("/", async (req, res) => {
  try {
    const userId = req.userpayload.id;
    const user = await BusinessModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const libraryOverview = await OverviewModel.findOne({ userId });
    if (!libraryOverview)
      return res.status(404).json({ message: "Library details not found" });

    const pdfPath = path.join(
      __dirname,
      `../pdfs/library-details-${userId}.pdf`
    );
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // PDF content
    doc.fontSize(20).text("Library Details", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Library Name: ${libraryOverview.Library_name}`);
    doc.text(`Amenities: ${libraryOverview.amenities.join(", ")}`);
    doc.end();

    writeStream.on("finish", async () => {
      const baseUrl = "https://projects-mood-backend-yugw.onrender.com"; // change to your deployed URL if needed

      const approveLink = `${baseUrl}/approve/${userId}`;
      const rejectLink = `${baseUrl}/status/reject/${userId}`;

      await transporter.sendMail({
        from: `"MOOD App" <${process.env.EMAIL_ADDRESS}>`,
        to: "milliodream584@gmail.com", // update to dynamic admin if needed
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
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

export const Status = router;
