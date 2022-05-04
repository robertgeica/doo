var mongoose = require("mongoose");
const Block = require("../models/Block");
const Collection = require("../models/Collection");

const {
  TASK_BLOCK_TYPE,
  SIMPLE_BLOCK_TYPE,
  COMPLEX_BLOCK_TYPE,
} = require("./blockContent");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

// @route         GET /api/user/block/:id
// @description   Get block
// @access        Private
const getBlock = asyncHandler(async (req, res, next) => {
  const block = await Block.findById(mongoose.Types.ObjectId(req.params.id));
  if (block) {
    res.json({
      block,
    });
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         POST /api/user/block/:userId
// @description   Create collection
// @access        Private
const createBlock = asyncHandler(async (req, res, next) => {
  const blockType = req.body.blockType;
  const blockContent = req.body.blockContent || {
    simple: SIMPLE_BLOCK_TYPE,
    complex: COMPLEX_BLOCK_TYPE,
    task: TASK_BLOCK_TYPE,
  };

  function blockTypeSchema(type) {
    return blockContent[type] || [];
  }

  const block = new Block({
    ...req.body,
    blockContent: req.body.blockContent || blockTypeSchema(blockType),
    userId: mongoose.Types.ObjectId(req.params.userId),
  });

  await block.save();

  const collection = await Collection.findById(
    mongoose.Types.ObjectId(req.body.parentId)
  );

  collection.blocks = [...collection.blocks, block._id];
  collection.save();

  if (block) {
    res.status(201).json({ block });
  } else {
    return next(new ErrorHandler("Cannot find user.", 404));
  }
});

// @route         Delete /api/block/:id
// @description   Delete block
// @access        Private
const deleteBlock = asyncHandler(async (req, res, next) => {
  const block = await Block.findById(req.params.id);

  try {
    await block.remove();

    const collection = await Collection.findById(
      mongoose.Types.ObjectId(block.parentId)
    );

    const newBlocks = collection.blocks.filter(
      (block) => block.toString() !== req.params.id
    );

    collection.blocks = newBlocks;
    collection.save();

    res.json({ message: "Block removed" });
  } catch (error) {
    return next(new ErrorHandler("Block not found.", 404));
  }
  if (block) {
  } else {
  }
});

// @route         GET /api/user/block/:userid
// @description   Get block
// @access        Private
const getBlocks = asyncHandler(async (req, res, next) => {
  // const blocks = await Block.findById(mongoose.Types.ObjectId(req.params.id));
  const blocks = await Block.find({ '_id': { $in: req.body.ids } });
  console.log(blocks)
  if (blocks) {
    res.json({
      blocks,
    });
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});
module.exports = {
  getBlock,
  createBlock,
  deleteBlock,
  getBlocks,
};
