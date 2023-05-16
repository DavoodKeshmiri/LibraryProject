const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    // _id: String,
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    fans: [
      {
        type: mongoose.Schema.Types.String,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
