const jwt = require("jsonwebtoken");
require('dotenv').config()
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]||req.headers["token"] ;
  console.log(token,req.headers)

  if (!token) {
    console.log('no token')
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ",""), config.TOKEN_KEY);
    //console.log(decoded,token);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;

