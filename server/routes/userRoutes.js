const express = require("express");
const router = express.Router();

const protect = require('../middleware/auth');
const { registerUser, authUser, updateUser, deleteUser, getUser } = require('../controllers/userController');
const { createProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

router
  .route('/register')
  .post(registerUser)

router
  .route('/login')
  .post(authUser)

router
  .route('/')
  .get(protect, getUser)

  
router
  .route('/:id')
  .put(protect, updateUser)
  .delete(protect, deleteUser)

router
  .route('/profile')
  .post(protect, createProfile)

router
  .route('/profile/:id')
  .put(protect, updateProfile)
  .delete(protect, deleteProfile)

module.exports = router;
