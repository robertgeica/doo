const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require('../utils/errorHandler');
const generateAuthToken = require("../utils/generateAuthToken");
require("dotenv").config();

// @route         POST /api/user/register
// @description   Register user
// @access        Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorHandler('User already exists.', 400));
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
    return next(new ErrorHandler('Invalid user data.', 400));
  }
});

// @route         POST /api/user/login
// @description   Login user
// @access        Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateAuthToken(user._id),
    });
  } else {
    return next(new ErrorHandler('Invalid user.', 401));
  }
});

// @route         PUT /api/user
// @description   Update user
// @access        Private
const updateUser = asyncHandler(async (req, res, next) => {
  const { profileId, settingsId, accountId } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.profileId = profileId || user.profileId;
    user.settingsId = settingsId || user.settingsId;
    user.accountId = accountId || user.accountId;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    return next(new ErrorHandler('User not found.', 404));
  }
});

// @route         Delete /api/user/:id
// @description   Delete user
// @access        Private
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    return next(new ErrorHandler('User not found.', 404));
  }
});
module.exports = { registerUser, authUser, updateUser, deleteUser };
