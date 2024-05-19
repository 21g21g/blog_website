const express = require("express");
const {
  authController,
  loginController,
  updateController,
  deleteController,
  signoutController,
} = require("../controllers/authController");
const verfyToken = require("../middleware/verfyUser");
const router = express.Router();
const multer=require("multer")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + " " + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/register", authController);
router.post("/login", loginController);
router.put("/update/:id", upload.single("image"), updateController);
router.delete("/delete/:id", verfyToken, deleteController);
router.post("/signout", signoutController);
module.exports = router;
