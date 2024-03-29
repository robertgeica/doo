const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getBlock,
  createBlock,
  deleteBlock,
  getBlocks,
  updateBlock,
  loadSubBlocks
} = require("../controllers/blockController");

router.route("/").get(getBlocks);
router.route("/subblocks").post(loadSubBlocks);
router.route("/:userId").post(protect, createBlock);

router.route("/:id").get(protect, getBlock).delete(protect, deleteBlock).patch(protect, updateBlock);

module.exports = router;
