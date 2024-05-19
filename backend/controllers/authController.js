const User = require("../models/usermodel/UesrModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../middleware/error");
const jwt = require("jsonwebtoken");
const authController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "all feilds must be required"));
    }

    const user = await User.findOne({ email });
    if (user) {
      return next(errorHandler(400, "user already exists"));
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashPassword,
      email,
      isAdmin: false,
    });

    try {
      return res.status(200).json(newUser);
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "all feids are must be required"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(errorHandler(400, "user doesnot found"));
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return next(errorHandler(400, "incorrect password"));
  }

  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  // console.log(token);
  const { password: pass, ...rest } = user._doc;

  const responseData = {
    token,
    user: {
      ...rest,
    },
    message: "you are logged successfuly",
  };
  res.status(200).json(responseData);
};
//check the routes
const updateController = async (req, res, next) => {
   const { id } = req.params;
   const image=req.file;
   console.log(image)
   //accept image
  try {
   


    if (req.body.password) {
      if (req.body.password.length < 8) {
        return next(
          errorHandler(400, "The password length must be at least 8 characters")
        );
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.body.username) {
      if (req.body.username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contain spaces"));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, "Username must be in lowercase"));
      }
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
          image: "upload/" + image.filename,
        },
      },
      { new: true }
    );

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteController = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User has been deleted successfuly" });
  } catch (error) {
    next(error);
  }
};
const signoutController = (req, res, next) => {
  res.status(200).json({ message: "user signout successfully" });
};

module.exports = {
  authController,
  loginController,
  updateController,
  deleteController,
  signoutController,
};
