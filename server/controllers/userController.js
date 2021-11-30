const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const generateAuthToken = require("../utils/generateAuthToken");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SG_API);

// @route         GET /api/user/:id
// @description   Get user
// @access        Private
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

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

// @route         PATCH /api/user/:id
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

// @route         PATCH /api/user/sendverificationemail/:id
// @description   Send verification email
// @access        Private
const sendVerificationEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

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

    await sgMail.send(emailData);
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         PATCH /api/user/verifyemail/:id/:token
// @description   Verify email
// @access        Private
const verifyEmail = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const user = await User.findById(id).select("-password");

  if (token === user.emailVerificationToken) {
    user.isVerifiedEmail = true;
    user.emailVerificationToken = "";

    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         PATCH /api/user/resetpassword
// @description   Send reset password email
// @access        Private
const sendResetPasswordEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select("-password");

  // generate token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: "60m",
  });

  const emailData = {
    from: "geicarobert@gmail.com",
    to: req.body.email,
    subject: `Reset your password`,
    html: `
    <p>http://localhost:3000/resetpassword/${token}</p>
  `,
  };

  if (user) {
    user.passwordResetToken = token;

    await sgMail.send(emailData);
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         PATCH /api/user/resetpassword/:id/:token
// @description   Reset Password
// @access        Private
const resetPassword = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const user = await User.findById(id).select("-password");

  if (token === user.passwordResetToken) {
    user.passwordResetToken = "";
    user.password = req.body.password;

    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

const updateUserWithWorkplace = asyncHandler(async (req, res, next) => {
  const { workplaceName, workplaceId, userId } = req.params;
  const user = await User.findById(userId).select('-password');

  if (user) {
    const newWorkplace = {
      workplaceId: workplaceId,
      name: workplaceName
    };
    user.workplacesIds = [ ...user.workplacesIds, newWorkplace ];

    const updatedUser = await user.save();
    console.log(updatedUser)
    return updatedUser;
  }

});

module.exports = {
  getUser,
  registerUser,
  authUser,
  updateUser,
  deleteUser,
  verifyEmail,
  sendVerificationEmail,
  resetPassword,
  sendResetPasswordEmail,
  updateUserWithWorkplace
};
