const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    schemaVersion: { type: String, required: true, default: '1.0.0' },
    userId: { type: Object },

    username: { type: String },
    image: { type: String },
    name: { type: String },

    notifications: [
      {
        blockId: { type: Object },
        blockTitle: { type: String },
        notificationTitle: { type: String },
        notificationsTrigger: { type: Date },
        isRead: { type: Boolean }
      }
    ]

  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
