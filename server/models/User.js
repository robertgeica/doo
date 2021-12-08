const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    schemaVersion: { type: String, required: true, default: '1.0.0' },
    profileId: { type: Object },
    settingsId: { type: Object },
    workplacesIds: [ 
      {
        workplaceId: { type: Object },
        name: { type: String }
      }
    ],

    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: { type: String },
    
    emailVerificationToken: { type: String, default: '' },
    emailVerificationExpire: { type: Date },
    isVerifiedEmail: { type: Boolean, default: false },

    password: { type: String, required: true },
    passwordResetToken: { type: String, default: '' },
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
