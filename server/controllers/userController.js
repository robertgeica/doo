const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const generateAuthToken = require("../utils/generateAuthToken");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SG_API);

// @route         GET /api/user
// @description   Get logged in user
// @access        Private
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
    });
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         POST /api/user/register
// @description   Register user
// @access        Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorHandler("User already exists.", 400));
  }

  const user = await User.create({
    email,
    password,
    emailVerificationToken: "",
    isVerifiedEmail: false,
    passwordResetToken: "",
    schemaVersion: "1.0.0",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      password: user.password,
      authToken: generateAuthToken(user._id),
    });
  } else {
    return next(new ErrorHandler("Invalid user data.", 400));
  }
});

// @route         POST /api/user/login
// @description   Login user
// @access        Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateAuthToken(user._id),
    });
  } else {
    return next(new ErrorHandler("Invalid user.", 401));
  }
});

// @route         PUT /api/user
// @description   Update user
// @access        Private
const updateUser = asyncHandler(async (req, res, next) => {
  const { profileId, settingsId, accountId } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.profileId = profileId || user.profileId;
    user.settingsId = settingsId || user.settingsId;
    user.accountId = accountId || user.accountId;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    return next(new ErrorHandler("User not found.", 404));
  }
});

// @route         Delete /api/user/:id
// @description   Delete user
// @access        Private
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    return next(new ErrorHandler("User not found.", 404));
  }
});

// @route         PATCH /api/user/verifyemail
// @description   Send verification email
// @access        Private
const sendVerificationEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  // generate token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: "60m",
  });

  const emailData = {
    from: "geicarobert@gmail.com",
    to: user.email,
    subject: `Verify your email`,
    html: `
    <p>http://localhost:3000/verifyemail/${token}</p>
  `,
  };

  if (user) {
    user.emailVerificationToken = token;

    const sendEmail = await sgMail.send(emailData);
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         PUT /api/user/verifyemail/:token
// @description   Verify email
// @access        Private
const verifyEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  if(req.params.id === user.emailVerificationToken) {
    user.isVerifiedEmail = true;
    user.emailVerificationToken = '';
    
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }

});


module.exports = {
  getUser,
  registerUser,
  authUser,
  updateUser,
  deleteUser,
  verifyEmail,
  sendVerificationEmail
};
