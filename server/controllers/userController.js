const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateAuthToken = require("../utils/generateAuthToken");
require("dotenv").config();

// @route         POST /api/user/register
// @description   Register user
// @access        Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    email,
    password,
    emailVerificationToken: "",
    isVerifiedEmail: false,
    passwordResetToken: "",
    schemaVersion: "1.0.0",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      password: user.password,
      authToken: generateAuthToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route         POST /api/user/login
// @description   Login user
// @access        Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateAuthToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid user");
  }
});

// @route         PUT /api/user
// @description   Update user
// @access        Private
const updateUser = asyncHandler(async (req, res) => {
  const { profileId, settingsId, accountId } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.profileId = profileId || user.profileId;
    user.settingsId = settingsId || user.settingsId;
    user.accountId = accountId || user.accountId;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, authUser, updateUser };
