const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerificationToken: { type: String },
    emailVerificationExpire: { type: Date },
    isVerified: { type: Boolean },

    password: { type: String, required: true },
    passwordResetToken: { type: String },
    passwordResetExpire: { type: Date },

    collections: [
      {
        collectionId: { type: Object, required: true },
        collectionName: { type: String, required: true },
      },
    ],

    profileId: { type: Object },
    schemaVersion: { type: String, required },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);
