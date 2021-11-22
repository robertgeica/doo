const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    schemaVersion: { type: String, required: true },
    profileId: { type: Object },
    settingsId: { type: Object },
    accountId: { type: Object },

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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User = mongoose.model("User", UserSchema);
