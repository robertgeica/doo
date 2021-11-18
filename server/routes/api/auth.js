const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
require("dotenv").config();

const User = require("../../models/User");

// @route         POST /api/auth
// @description   Auth user
// @access        Public
router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password required").exists(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) return res.status(400).json({ error: result.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword)
        return res.status(400).json({ msg: "Invalid credentials" });

      const payload = {
        user: { id: user._id },
      };

      jwt.sign(
        payload,
        process.env.JWT_TOKEN,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;