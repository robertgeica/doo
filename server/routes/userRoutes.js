const express = require("express");
const router = express.Router();

const protect = require('../middleware/auth');
const { registerUser, authUser} = require('../controllers/userController');
const { createProfile } = require('../controllers/profileController');

router.route('/register').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').post(protect, createProfile)

module.exports = router;
