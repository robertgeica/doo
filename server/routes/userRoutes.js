const express = require("express");
const router = express.Router();

const { registerUser, authUser} = require('../controllers/userController');

router.route('/register').post(registerUser)
router.route('/login').post(authUser)


module.exports = router;
