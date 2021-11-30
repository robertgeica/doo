const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDataSchema = new Schema(
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

  },
  { timestamps: true }
);

module.exports = UserData = mongoose.model("UserData", UserDataSchema);
