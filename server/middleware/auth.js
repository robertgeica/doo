const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token)
    return res.status(401).json({ msg: "No token. Authentication denied!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = decoded.user;
    next();
    
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Invalid token." });
  }
};
