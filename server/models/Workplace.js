const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkplaceSchema = new Schema(
  {
    schemaVersion: { type: String, required: true, default: '1.0.0' },
    userId: { type: Object },

    workplaceName: { type: String, required: true },

    collections: [
      {
        collectionId: { type: Object },
        collectionName: { type: String },
        collectionIcon: { type: String }
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

module.exports = Workplace = mongoose.model("Workplace", WorkplaceSchema);
