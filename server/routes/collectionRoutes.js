const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/collectionController");

router.route("/:userId").post(protect, createCollection);

router
  .route("/:id")
  .get(protect, getCollection)
  .patch(protect, updateCollection)
  .delete(protect, deleteCollection);

module.exports = router;
