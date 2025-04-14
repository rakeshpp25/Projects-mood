import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";
import {usersignupRoutes} from './routes/usersignpRoutes.js'
import { verifyEmailroutes } from "./routes/VerifyEmailroutes.js";
import { login } from "./routes/login.js";
import { product } from "./routes/product.js";
import {verifytoken} from './middleware/auth.js'
import cookieParser from 'cookie-parser';
import { profile } from "./routes/profile.js";
import { logoutRoute } from "./routes/logout.js";
import {overview} from './routes/overview.js'
import {UserLocation} from './routes/UserLocation.js'
import { address } from "./routes/address.js";
import { getInTouch } from "./routes/getInTouch.js";

dotenv.config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));
app.use(express.json())
const mongoURL = process.env.MONGODB_URL;
mongoose.connect((mongoURL))



app.use('/usersignup',usersignupRoutes)
app.use('/businessSignup',usersignupRoutes)
app.use('/emailverify',verifyEmailroutes)
app.use('/login',login)
app.use('/logout',logoutRoute)
app.use('/Profile',verifytoken,profile )
app.use('/overview',verifytoken,overview )
app.use('/location',UserLocation)
app.use('/address',verifytoken,address)
app.use('/getintouch',getInTouch)


// app.use('/product',verifytoken, product)
// app.use('/account/profile', verifytoken ,profile )
// app.use('/loginEmailVerify',verifyEmailLogin)
// app.use('/uploadImages',verifytoken ,ImageUploads)
// app.use('/location' ,UserLocation )


app.listen(PORT, () => {
  console.log("server started");
});
