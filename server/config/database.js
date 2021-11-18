const mongoose = require("mongoose");

const db = process.env.MONGODB_URI || "mongodb://127.0.0.1/doocli";

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected ...`)
  } catch (error) {
    console.log(`Error connecting. ${error.message}`);
  }
};

module.exports = connectDb;
