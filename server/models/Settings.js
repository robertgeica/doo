const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema(
  {
    schemaVersion: { type: String, required: true, default: '1.0.0' },
    userId: { type: Object },

    preferences: {
      firstWeekDay: { type: Boolean },
      language: { type: String },
      dateFormat: { type: String },
      clockFormat: { type: Boolean }
    },

    theme: {
      activeTheme: { type: Number },
      customTheme: {}
    }

  },
  { timestamps: true }
);

module.exports = Settings = mongoose.model("Settings", SettingsSchema);
