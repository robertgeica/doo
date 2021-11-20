const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    schemaVersion: { type: String, required: true },
    profileId: { type: Object },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerificationToken: { type: String },
    emailVerificationExpire: { type: Date },
    isVerifiedEmail: { type: Boolean },

    password: { type: String, required: true },
    passwordResetToken: { type: String },
    passwordResetExpire: { type: Date },
  },
  { timestamps: true }
);


module.exports = User = mongoose.model("User", UserSchema);
