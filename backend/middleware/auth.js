import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const generatetoken = (userdata) => {
  const token = jwt.sign(
    {
      email: userdata.email,
      id: userdata.id,
      role : userdata.role,
    },
    process.env.JWT_SECRET,
    
  );

  return token;
};

//function to verify the token

const verifytoken = (req, res, next) => {
  //extract the jwt token from server
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).redirect("/auth/login");
  }

  try {
    //verify the token
    const decodepayload = jwt.verify(token, process.env.JWT_SECRET);
    //userpayload act as a key which contain values of decodepayload
    req.userpayload = decodepayload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
};

export { generatetoken, verifytoken };
