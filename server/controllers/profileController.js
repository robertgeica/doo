const Profile = require("../models/Profile");
const asyncHandler = require("../utils/asyncHandler");

const createProfile = asyncHandler(async (req, res) => {
  const profileExists = await Profile.find({ userId: req.user._id });

  if (profileExists) {
    res.status(400);
    throw new Error("Profile already exists");
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
