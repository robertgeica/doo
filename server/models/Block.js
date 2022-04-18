const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlockSchema = new Schema(
  {
    schemaVersion: { type: String, required: true, default: "1.0.0" },
    userId: { type: Object },
    parentId: { type: Object, required: true },

    icon: { type: String },
    background: { type: String },

    blockName: { type: String },
    textFormat: {
      textColor: { type: String },
      backgroundColor: { type: String },
    },

    comments: [
      {
        accoundId: { type: Object },
        accountName: { type: String },
        content: { type: String },
      },
    ],

    blockType: { type: String },
    blockContent: { type: Object },
  },
  { timestamps: true }
);

module.exports = Block = mongoose.model("Block", BlockSchema);
