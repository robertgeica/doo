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

// @route         PUT /api/user/profile/:id
// @description   Update a profile
// @access        Private
const updateProfile = asyncHandler(async (req, res, next) => {
  const { username, image, name } = req.body;
  const profile = await Profile.findById(req.params.id);

  if (profile) {
    profile.username = username || profile.username;
    profile.image = image || profile.image;
    profile.name = name || profile.name;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } else {
    return next(new ErrorHandler('Profile not found.', 404));
  }
});


module.exports = { createProfile, updateProfile };
