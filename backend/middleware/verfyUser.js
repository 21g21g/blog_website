const jwt = require("jsonwebtoken");
const errorHandler = require("./error");
const User = require("../models/usermodel/UesrModel");
const verifyToken = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded.userId);

      if (!user) {
        // console.log("user not found");
        return next(errorHandler(400, "the user is not found"));
      }
      // console.log("user is", user);
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return res.status(401).json({ message: "Authorization header missing" });
  }
};

// first of all the user completly logged into the database then by using jwt we can create token and send that token into the front end as a response and on the frontend the user store that token on the localstorage using locallstorage.setitem methode then when i want to autherize first of all i get that token from the localstorage using localstorage.getitem metode and after i get it i send it to headers and autherization and at the backend the verfyuser midddlewire use it for verfication purpose.

module.exports = verifyToken;
