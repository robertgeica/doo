var mongoose = require('mongoose');
const Collection = require("../models/Collection");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");


// @route         GET /api/user/collection/:id
// @description   Get collection
// @access        Private
const getCollection = asyncHandler(async (req, res, next) => {
  const collection = await Collection.findById(req.params.id);

  if (collection) {
    res.json({
      ...collection._doc,
    });
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});


// @route         POST /api/user/collection/:userId
// @description   Create collection
// @access        Private
const createCollection = asyncHandler(async (req, res, next) => {
  const collectionExists = await Collection.find({
    name: req.body.name,
  });
  if (collectionExists.length !== 0) {
    return next(new ErrorHandler("Collection already exists.", 400));
  }

  const collection = new Collection({
    ...req.body,
    userId: mongoose.Types.ObjectId(req.params.userId),
  });

  const createdCollection = await collection.save();

  if (createdCollection) {
    res.status(201).json({createdCollection});
  } else {
    return next(new ErrorHandler("Cannot find user.", 404));
  }
});


module.exports = { getCollection, createCollection }