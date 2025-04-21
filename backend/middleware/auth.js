import jwt from "jsonwebtoken";

const generatetoken = (userdata) => {
  const token = jwt.sign(
    {
      email: userdata.email,
      id: userdata.id,
    },
    "helloji",
    
  );

  return token;
};

//function to verify the token

const verifytoken = (req, res, next) => {
  //extract the jwt token from server
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).redirect("/login");
  }

  try {
    //verify the token
    const decodepayload = jwt.verify(token, "helloji");
    //userpayload act as a key which contain values of decodepayload
    req.userpayload = decodepayload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
};

export { generatetoken, verifytoken };
