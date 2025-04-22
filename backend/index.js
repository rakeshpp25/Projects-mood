import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { usersignupRoutes } from "./routes/usersignpRoutes.js";
import { verifyEmailroutes } from "./routes/VerifyEmailroutes.js";
import { login } from "./routes/login.js";
import { product } from "./routes/product.js";
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
import path from 'path';
import { fileURLToPath } from 'url';
import {StatusUpdate} from './routes/approve.js'
import { BusinessUpdate } from "./routes/statusUpdate.js";
import { updateLibraryStatus } from "./routes/updateLibraryStatus.js";
import { LibraryDetails } from "./routes/LibraryDetails.js";
import { connectDB } from "./DB/dbConnect.js";
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

const __filename = fileURLToPath(import.meta.url);  // Get the current file path
const __dirname = path.dirname(__filename);          // Get the directory name of the current file

app.use("/usersignup", usersignupRoutes);
app.use("/businessSignup", usersignupRoutes);
app.use("/emailverify", verifyEmailroutes);
app.use("/login", login);
app.use("/logout", logoutRoute);
app.use("/Profile", verifytoken, profile);
app.use("/overview", verifytoken, overview);
app.use("/location", UserLocation);
app.use("/address", verifytoken, address);
app.use("/getintouch", getInTouch);
app.use("/feesdetails", verifytoken, feesDetails);
app.use("/documentUploads", verifytoken,DocumentUploads);
app.use("/PhotoUploads", verifytoken,PhotoUploads);
app.use("/status", verifytoken,Status);
app.use("/approve", StatusUpdate);
app.use("/reject",Status);
app.use("/statusUpdate",verifytoken, BusinessUpdate);
app.use("/updateLibraryStatus",verifytoken, updateLibraryStatus);
app.use("/librarydetails", LibraryDetails);
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));


app.listen(PORT, () => {
  console.log("server started");
});
