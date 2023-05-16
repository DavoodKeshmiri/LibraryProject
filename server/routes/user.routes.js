const UserController = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/login", UserController.userLogin);
router.post("/register", UserController.userRegister);
router.get("/all", UserController.getAllUsers);
router.patch("/fav/:userId", UserController.addFavorite);

module.exports = router;
