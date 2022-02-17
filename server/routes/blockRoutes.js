const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createBlock,
} = require("../controllers/blockController");

router.route("/:userId").post(protect, createBlock);


module.exports = router;
