const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.String,
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    favs: [{ type: mongoose.Schema.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
