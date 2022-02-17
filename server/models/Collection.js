const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
  {
    schemaVersion: { type: String, required: true, default: "1.0.0" },
    userId: { type: Object },
    workplaceId: { type: Object },

    name: { type: String },
    icon: { type: String },
    background: { type: String },

    comments: [
      {
        accoundId: { type: Object },
        accountName: { type: String },
        content: { type: String },
      },
    ],

    labels: [
      {
        text: { type: String },
        color: { type: String },
      },
    ],

    blocks: [
      {
        blockId: { type: Object },
      },
    ],
  },
  { timestamps: true }
);

module.exports = Collection = mongoose.model("Collection", CollectionSchema);
