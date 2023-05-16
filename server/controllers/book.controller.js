const Book = require("../models/book.model.js");
const User = require("../models/user.model.js");
module.exports = {
  getAllBooks: (req, res) => {
    Book.find({})
      .populate("fans")
      .exec()
      .then((allBooks) => res.json(allBooks))
      .catch((err) => console.log(err));
  },

  getOneBook: (req, res) => {
    Book.findOne({ _id: req.params.id })
      .then((oneProduct) => res.json(oneProduct))
      .catch((err) => console.log(err));
  },

  createBook: (req, res) => {
    let id = req.body.bookId;
    let userId = req.body.userId;
    // let fans = req.body.fans;
    Book.create(req.body)
      .then((newBook) => {
        res.json(newBook);
        id = newBook._id;
        newBook.fans.push(userId);
        newBook.save();
        
      })

      .catch((err) => console.log(err));
  },

  updateBook: (req, res) => {
    Book.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updateBook) => res.json(updateBook))
      .catch((err) => console.log(err));
  },

  deleteBook: (req, res) => {
    Book.deleteOne({ _id: req.params.id })
      .then((deletedId) => res.json(deletedId))
      .catch((err) => console.log(err));
  },
  getFans: (req, res) => {
    Book.find()
      .populate("fans")
      .exec()
      .then((favorites) => {
        res.json(favorites);
        console.log(favorites);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  },

  addFavorite: async (req, res) => {
    //console.log("body: ", req.body);
    const bookId = req.params.bookId;
    const userId = req.body.userId;
    try {
      const exists = await Book.find({ _id: bookId, fans: { $in: userId } });
      console.log("exists", exists);

      if (exists.length == 0) {
        //console.log(exists);
        const newFav = await Book.findByIdAndUpdate(
          { _id: bookId },
          { $push: { fans: userId } },
          { safe: true, upsert: true, new: true }
        ).populate("fans");

        res.send({ newFav, isFavorite: true });
      } else {
        const newFav = await Book.findByIdAndUpdate(
          { _id: bookId },
          { $pull: { fans: userId } },
          { safe: true, upsert: true, new: true }
        ).populate("fans");
        res.send({ newFav, isFavoourite: false });
      }
    } catch (err) {
      console.log(err);
    }
  },
  checkFavorite: async (req, res) => {
    const exists = await Book.find({ fans: { $in: req.params.userId } });
    if (exists.length == 0) {
      res.json({ isFavorite: false });
      console.log(false);
    } else {
      for (let i = 0; i < exists.length; i++) {
        exists[i].isFavorite = true;
      }
      res.json({ exists, isFavorite: true });
    }
  },
};
