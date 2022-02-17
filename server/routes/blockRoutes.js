const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getBlock,
  createBlock,
  deleteBlock,
} = require("../controllers/blockController");

router
  .route("/:userId")
  .post(protect, createBlock);
  
router
  .route("/:id")
  .get(protect, getBlock)
  .delete(protect, deleteBlock);

module.exports = router;
