import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
      FirstName : {
            type : String,
            require : true,
      },
      LastName : {
            type : String,
      },
      EmailAdress : {
            type : String,
            require : true,
      },
      ContactNumber : {
            type : String,
            require : true,
      },
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
      },
});

const Profilemodel = mongoose.model("Profile", ProfileSchema);

export default Profilemodel;