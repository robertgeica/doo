const mongoose = require('mongoose');
const Settings = require("../models/Settings");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require('../utils/errorHandler');

// @route         GET /api/user/settings/:id
// @description   Get user settings
// @access        Private
const getSettings = asyncHandler(async (req, res, next) => {
  const settings = await Settings.findById(req.params.id);

  if (settings) {
    res.json({
      ...settings._doc
    });
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         POST /api/user/settings/:userId
// @description   Create user settings
// @access        Private
const createSettings = asyncHandler(async (req, res, next) => {
  const settingsExists = await Settings.find({ userId: mongoose.Types.ObjectId(req.params.userId) });
  console.log(settingsExists.length)

  if (settingsExists.length !== 0) {
    return next(new ErrorHandler('Settings already exists.', 400));
  }

  const settings = new Settings({
    ...req.body,
    userId: mongoose.Types.ObjectId(req.params.userId),
    schemaVersion: "1.0.0",
  });

  const createdSettings = await settings.save();
  const user = await User.findById(mongoose.Types.ObjectId(req.params.userId)).select('-password');

  if (user) {
    user.settingsId = createdSettings._id;
    const updatedUser = await user.save();

    res.status(201).json({createdSettings, updatedUser});
  } else {
    return next(new ErrorHandler("Cannot find user.", 404));
  }

});

// @route         PUT /api/settings/profile/:id
// @description   Update user settings
// @access        Private
const updateSettings = asyncHandler(async (req, res, next) => {
  const { preferences, theme } = req.body;
  
  const settings = await Settings.findById(req.params.id);

  if (settings) {
    settings.preferences = {...settings.preferences, ...preferences };
    settings.theme = {...settings.theme, ...theme };

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } else {
    return next(new ErrorHandler('Settings not found.', 404));
  }
});

// @route         Delete /api/settings/:id
// @description   Delete settings
// @access        Private
const deleteSettings = asyncHandler(async (req, res, next) => {
  const settings = await Settings.findById(req.params.id);

  if (settings) {
    await settings.remove()
    res.json({ message: 'Settings removed' })
  } else {
    return next(new ErrorHandler('Settings not found.', 404));
  }
});


module.exports = { getSettings, createSettings, updateSettings, deleteSettings };
