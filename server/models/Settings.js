const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema(
  {
    schemaVersion: { type: String, required: true },
    userId: { type: Object },
    
    notifications: [
      {
        notificationId: { type: Object, required: true }
      }
    ],

    preferences: {
      firstWeekDay: { type: Boolean },
      language: { type: String },
      dateFormat: { type: String },
      clockFormat: { type: Boolean }
    }

  },
  { timestamps: true }
);

module.exports = Settings = mongoose.model("Settings", SettingsSchema);
