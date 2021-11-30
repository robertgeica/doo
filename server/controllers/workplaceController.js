const mongoose = require('mongoose');
const Workplace = require("../models/Workplace");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require('../utils/errorHandler');

// @route         GET /api/user/workplace/:id
// @description   Get workplace
// @access        Private
const getWorkplace = asyncHandler(async (req, res, next) => {
  const workplace = await Workplace.findById(req.params.id);

  if (workplace) {
    res.json({
      ...workplace._doc
    });
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         POST /api/user/workplace/:userId
// @description   Create workplace
// @access        Private
const createWorkplace = asyncHandler(async (req, res, next) => {
  const workplaceExists = await Workplace.find({ name: req.params.workplaceName });

  if (workplaceExists.length !== 0) {
    return next(new ErrorHandler('Workplace already exists.', 400));
  }

  const workplace = new Workplace({
    ...req.body,
    userId: req.userId,
    schemaVersion: "1.0.0",
  });

  const createdWorkplace = await workplace.save();
  res.status(201).json(createdWorkplace);
});



module.exports = { getWorkplace, createWorkplace };
