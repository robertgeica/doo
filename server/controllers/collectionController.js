var mongoose = require("mongoose");
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
    res.status(201).json({ createdCollection });
  } else {
    return next(new ErrorHandler("Cannot find user.", 404));
  }
});

// @route         PATCH /api/user/collection/:id
// @description   Update collection
// @access        Private
const updateCollection = asyncHandler(async (req, res, next) => {
  const { name, icon, background, comments, labels, blocks } = req.body;
  const collection = await Collection.findById(req.params.id);

  if (collection) {
    collection.name = name || collection.name;
    collection.icon = icon || collection.icon;
    collection.background = background || collection.background;
    collection.comments = comments || collection.comments;
    collection.labels = labels || collection.labels;
    collection.blocks = blocks || collection.blocks;

    const updatedCollection = await collection.save();
    res.json(updatedCollection);
  } else {
    return next(new ErrorHandler("Collection not found.", 404));
  }
});

// @route         Delete /api/collection/:id
// @description   Delete collection
// @access        Private
const deleteCollection = asyncHandler(async (req, res, next) => {
  const collection = await Collection.findById(req.params.id);

  if (collection) {
    await collection.remove();
    res.json({ message: "Collection removed" });
  } else {
    return next(new ErrorHandler("Workplace not found.", 404));
  }
});

module.exports = {
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
};
