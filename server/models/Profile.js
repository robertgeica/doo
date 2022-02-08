const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    schemaVersion: { type: String, required: true, default: '1.0.0' },
    userId: { type: Object },

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
    ],

    defaults: {
      workplace: { type: Object },
      collection: { type: Object },
      block: { type: Object }
    }

  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
