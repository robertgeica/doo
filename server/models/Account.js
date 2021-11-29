const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    schemaVersion: { type: String, required: true },
    userId: { type: Object },

    collections: [
      {
        collectionId: { type: Object },
        collectionName: { type: String }
      }
    ],

    favorites: [
      {
        blockId: { type: Object },
        blockName: { type: String }
      }
    ],

    latestNotifications: [],

  },
  { timestamps: true }
);

module.exports = Account = mongoose.model("Account", AccountSchema);
