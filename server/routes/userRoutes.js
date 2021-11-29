const express = require("express");
const router = express.Router();

const protect = require('../middleware/auth');
const { registerUser, authUser, updateUser, deleteUser, getUser, verifyEmail, sendVerificationEmail, sendResetPasswordEmail, resetPassword } = require('../controllers/userController');
const { createProfile, updateProfile, deleteProfile, getProfile } = require('../controllers/profileController');

router
  .route('/register')
  .post(registerUser)

router
  .route('/login')
  .post(authUser)

router
.route('/resetpassword')
.patch(sendResetPasswordEmail)

router
  .route('/:id')
  .get(protect, getUser)

router
  .route('/:id')
  .patch(protect, updateUser)
  .delete(protect, deleteUser)

router
  .route('/sendverificationemail/:id')
  .patch(protect, sendVerificationEmail)

router
  .route('/verifyemail/:id/:token')
  .patch(protect, verifyEmail)

router
  .route('/resetpassword/:id/:token')
  .patch(resetPassword)

router
  .route('/profile/:userId')
  .post(protect, createProfile)

router
  .route('/profile/:id')
  .get(protect, getProfile)
  .patch(protect, updateProfile)
  .delete(protect, deleteProfile)

module.exports = router;
