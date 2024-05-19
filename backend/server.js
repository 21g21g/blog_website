const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const commetRoute = require("./routes/commetRoute");
const dotenv = require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/post", express.static("post"));
app.use("/upload",express.static("upload"))
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/commet", commetRoute);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "internal server error";

  res.status(status).json({
    success: false,
    status,
    message,
  });
});
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("mongoose connected");
  app.listen(PORT, () => {
    console.log(`the server is runing on${PORT}`);
  });
});
