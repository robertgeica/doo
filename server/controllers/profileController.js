const mongoose = require('mongoose');
const Profile = require("../models/Profile");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require('../utils/errorHandler');

// @route         GET /api/user/profile/:id
// @description   Get profile
// @access        Private
const getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (profile) {
    res.json({
      ...profile._doc
    });
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         POST /api/user/profile/:userId
// @description   Create a profile
// @access        Private
const createProfile = asyncHandler(async (req, res, next) => {
  const profileExists = await Profile.find({ userId: mongoose.Types.ObjectId(req.params.userId) });

  if (profileExists.length !== 0) {
    return next(new ErrorHandler('Profile already exists.', 400));
  }

  const profile = new Profile({
    ...req.body,
    userId: mongoose.Types.ObjectId(req.params.userId),
  });

  const createdProfile = await profile.save();
  const user = await User.findById(mongoose.Types.ObjectId(req.params.userId)).select('-password');

  if (user) {
    user.profileId = createdProfile._id;
    const updatedUser = await user.save();

    res.status(201).json({createdProfile, updatedUser});
  } else {
    return next(new ErrorHandler("Cannot find user.", 404));
  }
});

// @route         PATCH /api/user/profile/:id
// @description   Update a profile
// @access        Private
const updateProfile = asyncHandler(async (req, res, next) => {
  const { image, name, defaults } = req.body;
  const profile = await Profile.findById(req.params.id);

  if (profile) {
    profile.image = image || profile.image;
    profile.name = name || profile.name;
    profile.defaults = defaults || profile.defaults;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } else {
    return next(new ErrorHandler('Profile not found.', 404));
  }
});

// @route         Delete /api/profile/:id
// @description   Delete profile
// @access        Private
const deleteProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (profile) {
    await profile.remove()
    res.json({ message: 'Profile removed' })
  } else {
    return next(new ErrorHandler('Profile not found.', 404));
  }
});


module.exports = { getProfile, createProfile, updateProfile, deleteProfile };
