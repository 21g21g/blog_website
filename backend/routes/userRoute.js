const express = require("express");
const {
  getUsers,
  getuser,
  deleteUser,
  updateUser,
  profileController,
} = require("../controllers/userController");
const verfyToken=require("../middleware/verfyUser")
// const multer=require("multer")
const router = express.Router();



router.get("/getusers",verfyToken,getUsers)
router.get("/getuser/:id",verfyToken,getuser)
router.delete("/delete/:id", verfyToken, deleteUser);
router.put("/update/:id", verfyToken,updateUser);
// router.put("/profile/:id",verfyToken,upload.single("image"),profileController);

module.exports = router;
