const Profile = require("../models/Profile");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require('../utils/errorHandler');

// @route         POST /api/user/profile
// @description   Create a profile
// @access        Private
const createProfile = asyncHandler(async (req, res, next) => {
  const profileExists = await Profile.find({ userId: req.user._id });

  if (profileExists.length !== 0) {
    return next(new ErrorHandler('Profile already exists.', 400));
  }

  const profile = new Profile({
    ...req.body,
    userId: req.user._id,
    schemaVersion: "1.0.0",
  });

  const createdProfile = await profile.save();
  res.status(201).json(createdProfile);
});

module.exports = { createProfile };
