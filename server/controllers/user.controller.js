const User = require("../models/user.model.js");

module.exports = {
  userLogin: (req, res) => {
    console.log("login ===", req.body);
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          if (password === user.password) {
            res.send({ message: "login sucess", user: user });
          } else {
            res.send({ message: "wrong credentials" });
          }
        } else {
          res.send({ message: "not register" });
        }
      })
      .catch((err) => console.log(err));
  },

  userRegister: (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    User.findOne({ email: email })
      .then(async(result) => {
        if (result) {
         return res.status(409).json({ message: "user already exist" });
        } else {
          const user = await User.create({
            first_name,
            last_name,
            email,
            password,
          });
          //   const insertedUser = user.save();
          return res.status(201).json({ message: "successful", user });
        }
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  },

  getAllUsers: (req, res) => {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => console.log(err));
  },

  //   addFavorite: (req, res) => {
  //     var user_id = req.params.userId;
  //     User.findByIdAndUpdate(
  //       user_id,
  //       { $push: { favs: req.body } },
  //       { safe: true, upsert: true, new: true },
  //       function (err, model) {
  //         if (err) {
  //           console.log(err);
  //           return res.send(err);
  //         }
  //         return res.json(model);
  //       }
  //     ).populate("favs");
  //   },
  addFavorite: (req, res) => {
    const id = req.params.userId;
    const favId = req.body.bookId;

    if (req.body.delete) {
      User.findOneAndUpdate(
        { _id: id },
        { $pull: { favs: favId } },
        function (error, success) {
          if (error) {
            res.status(400).json("Error: ", error);
          } else {
            res.json("Favorite deleted");
          }
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: id },
        { $push: { favs: favId } },
        function (error, success) {
          if (error) {
            res.status(400).json(error);
          } else {
            res.json("Favorite added");
          }
        }
      );
    }
  },
};
