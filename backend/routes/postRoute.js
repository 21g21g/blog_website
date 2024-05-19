const express = require("express");
const verifyToken = require("../middleware/verfyUser");
const {
  postController,
  getController,
  getcontrollerPginated,
  deletePosts,
  editHandller,
  getposbyId,
} = require("../controllers/postController");

const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "post/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + " " + file.originalname);
  },
});
const post = multer({ storage: storage });
//create a new blog
router.post("/create", verifyToken, post.single("image"), postController);
//get all posts route
router.get("/getpost", getController);
//paginate blogs
router.get("/paginate", getcontrollerPginated);
//get single posts by id
router.get("/getpostid/:id", getposbyId);
//to delete the single posts
router.delete("/delete/:id",verifyToken, deletePosts);
router.put("/update/:id", verifyToken, post.single("image"), editHandller);

module.exports = router;
