import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { usersignupRoutes } from "./routes/usersignpRoutes.js";
import { verifyEmailroutes } from "./routes/VerifyEmailroutes.js";
import { login } from "./routes/login.js";
import { verifytoken } from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import { profile } from "./routes/profile.js";
import { logoutRoute } from "./routes/logout.js";
import { overview } from "./routes/overview.js";
import { UserLocation } from "./routes/UserLocation.js";
import { address } from "./routes/address.js";
import { getInTouch } from "./routes/getInTouch.js";
import { feesDetails } from "./routes/feesDetails.js";
import { DocumentUploads } from "./routes/DocumentsUpload.js";
import { PhotoUploads } from "./routes/PhotoUploads.js";
import { Status } from "./routes/status.js";
import path from "path";
import { fileURLToPath } from "url";
import { StatusUpdate } from "./routes/approve.js";
import { BusinessUpdate } from "./routes/statusUpdate.js";
import { updateLibraryStatus } from "./routes/updateLibraryStatus.js";
import { LibraryDetails } from "./routes/LibraryDetails.js";
import { connectDB } from "./DB/dbConnect.js";
import { ImageUploads } from "./routes/imageUpload.js";
dotenv.config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/auth/userSignup", usersignupRoutes);
app.use("/auth/businessSignup", usersignupRoutes);
app.use("/auth/emailVerify", verifyEmailroutes);
app.use("/auth/login", login);
app.use("/auth/logout", logoutRoute);

// access for private
app.use("/dashboard/profile", profile);
app.use("/dashboard/overview", overview);
app.use("/dashboard/location", UserLocation);
app.use("/dashboard/address", verifytoken, address);
app.use("/dashboard/feesdetails", verifytoken, feesDetails);
app.use("/dashboard/documentUploads", verifytoken, DocumentUploads);
app.use("/dashboard/imageuploads", ImageUploads);
app.use("/dashboard/status", verifytoken, Status);

app.use("/approve", StatusUpdate);
app.use("/reject", Status);
app.use("/statusUpdate", verifytoken, BusinessUpdate);
app.use("/dashboard/updateLibraryStatus", verifytoken, updateLibraryStatus);
app.use("/librarydetails", LibraryDetails);
app.use("/getintouch", getInTouch);

app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

app.get("/", (req, res) => {
  res.send("backend is live ");
});

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
