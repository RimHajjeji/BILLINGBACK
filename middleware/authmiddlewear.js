const jwt=require('jsonwebtoken');

const dotenv=require('dotenv');
dotenv.config()
const secret=process.env.ACCESS_TOKEN_KEY

const   verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token,secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized Verify your token!" });
      }
      req.userId = decoded.id;
      next();
    });
  };
  module.exports = {
    verifyToken
  }
  