// import mongoose from "mongoose";

// const ProfileSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true, // Changed 'require' to 'required'
//   },
//   gender: {
//     type: String,
//   },
//   emailAddress: {
//     type: String,
//     required: true, // Changed 'require' to 'required'
//   },
//   aadharNumber: {
//     type: String,
//     required: true, // Changed 'require' to 'required'
//   },
//   mobileNumber: {
//     type: String,
//     required: true, // Changed 'require' to 'required'
//   },
//   altMobileNumber: {
//     type: String,
//     required: true, // Changed 'require' to 'required'
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Ensure the reference is consistent (make sure the User model is named "User")
//     required: true,
//   },
// });

// const ProfileModel = mongoose.model("Profile", ProfileSchema);

// export default ProfileModel;
