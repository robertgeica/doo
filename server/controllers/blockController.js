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
// @description   Create block
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
  if (req.body.parentType === 'block') {
    
    const parent = await Block.findById(
      mongoose.Types.ObjectId(req.body.parentId)
    );

    parent.blockContent.blocks = [
      ...parent.blockContent.blocks,
      block._id.toString(),
    ];
    parent.markModified("blockContent");

    parent.save();
  } else {
    const collection = await Collection.findById(
      mongoose.Types.ObjectId(req.body.parentId)
    );

    collection.blocks = [...collection.blocks, block._id.toString()];
    collection.save();
  }

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

    console.log(res.body, res.data, req.data, req.body)
    if (req.body.parentType === 'block') {
      const parent = await Block.findById(
        mongoose.Types.ObjectId(block.parentId)
      );

      const newBlocks = parent.blockContent.blocks.filter(
        (block) => block.toString() !== req.params.id
      );

      // parent.blockContent.blocks = [
      //   ...parent.blockContent.blocks,
      //   block._id.toString(),
      // ];
      // parent.markModified("blockContent");
      parent.blockContent.blocks = newBlocks;
      parent.markModified("blockContent");
      console.log(parent.blokContent)
      console.log(parent.blockContent.blocks, parent);
      parent.save();
    } else {
      const collection = await Collection.findById(
        mongoose.Types.ObjectId(block.parentId)
      );

      const newBlocks = collection.blocks.filter(
        (block) => block.toString() !== req.params.id
      );

      collection.blocks = newBlocks;
      collection.save();
    }
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
  const blocks = await Block.find({ _id: { $in: req.body.ids } });
  if (blocks) {
    res.json({
      blocks,
    });
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         PATCH /api/user/block/:id
// @description   Update block
// @access        Private
const updateBlock = asyncHandler(async (req, res, next) => {
  const { block } = req.body;

  const blockToUpdate = await Block.findById(req.params.id);
  if (blockToUpdate) {
    blockToUpdate.blockName = req.body.blockName;
    blockToUpdate.blockContent = req.body.blockContent;
    blockToUpdate.comments = req.body.comments;
    blockToUpdate.icon = req.body.icon;

    await blockToUpdate.save();
    res.json(block);
  } else {
    return next(new ErrorHandler("Block not found.", 404));
  }
});

module.exports = {
  getBlock,
  createBlock,
  deleteBlock,
  getBlocks,
  updateBlock,
};
