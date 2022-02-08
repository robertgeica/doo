const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const generateAuthToken = require("../utils/generateAuthToken");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SG_API);
const axios = require("axios");

// @route         GET /api/user/:id
// @description   Get user
// @access        Private
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json({
      ...user._doc,
    });
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         POST /api/user/register
// @description   Register user
// @access        Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) 
    return next(new ErrorHandler("Email already exists.", 400));

  const user = await User.create({
    email,
    password,
  });

  if (user) {
    await createProfile(user, email);
    await createSettings(user);
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
  const { username, email, password } = req.body;

  const user = username ? await User.findOne({ username }) : await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      username: user.username,
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
  const user = await User.findOne({ email: req.body.email }).select(
    "-password"
  );

  // generate token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: "60m",
  });

  const emailData = {
    from: "geicarobert@gmail.com",
    to: req.body.email,
    subject: `Reset your password`,
    html: `
    <p>http://localhost:3000/resetpassword/${user._id}/${token}</p>
  `,
  };

  if (user) {
    user.passwordResetToken = token;

    await sgMail.send(emailData);
    const updatedUser = await user.save();
    return res.json('email sent with success');
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

    await user.save();
    return res.json('password changed with success');
  } else {
    return next(new ErrorHandler("Invalid token", 401));
  }
});

const createProfile = async (user, email) => {
  const url = `http://localhost:4000/api/user/profile/${user._id}`;
  const profile = {
    image: "",
    name: email,
    notifications: [],
  };

  let config = {
    headers: {
      Authorization: "Bearer " + generateAuthToken(user._id),
    },
  };

  await axios.post(url, profile, config);
};

const createSettings = async (user) => {
  const url = `http://localhost:4000/api/user/settings/${user._id}`;
  const settings = {
    preferences: {},
    theme: {},
  };
  let config = {
    headers: {
      Authorization: "Bearer " + generateAuthToken(user._id),
    },
  };
  await axios.post(url, settings, config);
};

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
};
