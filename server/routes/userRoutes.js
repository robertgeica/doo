const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");
const {
  registerUser,
  authUser,
  updateUser,
  deleteUser,
  getUser,
  verifyEmail,
  sendVerificationEmail,
  sendResetPasswordEmail,
  resetPassword,
} = require("../controllers/userController");
const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");
const {
  getSettings,
  createSettings,
  updateSettings,
  deleteSettings,
} = require("../controllers/settingsController");


router.route("/register").post(registerUser);
router.route("/login").post(authUser);

router.route("/resetpassword").patch(sendResetPasswordEmail);

router.route("/").get(protect, getUser);
router.route("/:id").patch(protect, updateUser).delete(protect, deleteUser);

router
  .route("/sendverificationemail/:id")
  .patch(protect, sendVerificationEmail);

router.route("/verifyemail/:id/:token").patch(protect, verifyEmail);
router.route("/resetpassword/:id/:token").patch(resetPassword);

router.route("/profile/:userId").post(protect, createProfile);
router
  .route("/profile/:id")
  .get(protect, getProfile)
  .patch(protect, updateProfile)
  .delete(protect, deleteProfile);

router.route("/settings/:userId").post(protect, createSettings);
router
  .route("/settings/:id")
  .get(protect, getSettings)
  .patch(protect, updateSettings)
  .delete(protect, deleteSettings);

module.exports = router;
