var mongoose = require("mongoose");
const Block = require("../models/Block");
const {
  TASK_BLOCK_TYPE,
  SIMPLE_BLOCK_TYPE,
  COMPLEX_BLOCK_TYPE,
} = require("./blockContent");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

// @route         POST /api/user/block/:userId
// @description   Create collection
// @access        Private
const createBlock = asyncHandler(async (req, res, next) => {
  const blockType = req.body.blockType;
  const blockContent = {
    simple: SIMPLE_BLOCK_TYPE,
    complex: COMPLEX_BLOCK_TYPE,
    task: TASK_BLOCK_TYPE,
  };

  function blockTypeSchema(type) {
    return blockContent[type] || [];
  }

  const block = new Block({
    ...req.body,
    blockContent: blockTypeSchema(blockType),
    userId: mongoose.Types.ObjectId(req.params.userId),
  });

  await block.save();
  if (block) {
    res.status(201).json({ block });
  } else {
    return next(new ErrorHandler("Cannot find user.", 404));
  }
});

module.exports = {
  createBlock,
};
