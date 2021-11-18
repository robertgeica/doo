const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
require("dotenv").config();

const User = require("../../models/User");

// @route         POST /register
// @description   Register user
// @access        Public
router.post(
  "/",
  [
    check("email", "Email must be valid.").isEmail(),
    check("password", "Enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = validationResult(req);
      const hasErrors = !result.isEmpty();

      if (hasErrors) return res.status(400).json({ error: result.array() });

      // check for unique email
      let user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email is already used." });

      user = new User({
        email,
        password,
        isVerified: false,
        schemaVersion: "1.0.0",
      });

      // password encryption
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // return jwt
      const payload = {
        user: { id: user._id },
      };

      jwt.sign(payload, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
