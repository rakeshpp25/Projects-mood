import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Required for identifying which user/business the OTP is for
  },

  role: {
    type: String,
    enum: ['user', 'business'],
    required: true, //  Required in both signup and login to decide collection (UserModel or BusinessModel)
  },

  code: {
    type: String,
    required: true, // The actual OTP code sent to user
  },

  purpose: {
    type: String,
    enum: ['signup', 'login'],
    required: true, // Helps you decide what flow is happening (login vs signup)
  },

  createdAt: {
    type: Date,
    default: Date.now, // Tracks when the OTP was generated
  },

  expireAt: {
    type: Date,
    default: () => new Date(Date.now() + 5 * 60 * 1000), // OTP expires after 5 minutes
    index: { expires: '5m' }, // TTL index: MongoDB will auto-delete the document after 5 mins
  },
});

// Create model
const OtpModel = mongoose.model('Otp', otpSchema);
export default OtpModel;
