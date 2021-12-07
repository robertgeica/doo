const express = require("express");
const router = express.Router();
const protect = require('../middleware/auth');
const { getWorkplace, createWorkplace, updateWorkplace, deleteWorkplace } = require('../controllers/workplaceController');

router
  .route('/:userId')
  .post(protect, createWorkplace)

router
  .route('/:id')
  .get(protect, getWorkplace)
  .patch(protect, updateWorkplace)
  .delete(protect, deleteWorkplace)


module.exports = router;
