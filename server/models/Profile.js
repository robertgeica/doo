const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    schemaVersion: { type: String, required: true },
    userId: { type: Object },

    username: { type: String },
    image: { type: String },
    name: { type: String },

  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
