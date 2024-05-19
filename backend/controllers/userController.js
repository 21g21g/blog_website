const errorHandler = require("../middleware/error");
const User = require("../models/usermodel/UesrModel");

const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorHandler(400, "you cannot see all users"));
  } else {
    try {
      const users = await User.find();
      if (!users) {
        next(errorHandler(400, "there is no user is found"));
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      next(error);
    }
  }
};
const getuser = async (req, res, next) => {
  const id = req.params.id;
  if (!req.user.isAdmin || !id) {
    next(errorHandler(400, "there is no errors in this id"));
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      next(errorHandler(400, "there is no errors in this id"));
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  if (!req.user.isAdmin && req.user._id === id) {
    next(errorHandler(400, "you cannot delete this user"));
  } else {
    try {
      const deleteuser = await User.findByIdAndDelete(id);
      res.status(200).json("you delete the user succesfully");
    } catch (error) {
      next(error);
    }
  }
};
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updateuser = await User.findByIdAndUpdate(id);
    res.status(200).json(updateuser);
  } catch (error) {
    next(error);
  }
};
const profileController=async(req,res,next)=>{
  const id=req.params.id
  try{
    const profileUpdate=await User.findByIdAndUpdate(id)
    if(profileUpdate){
      res.status(200).json(profileUpdate)
    }
    else{
      next(errorHandler(400,"you cannot update  this profile"))
    }

  }
  catch(error){
    next(error)
  }


}

module.exports = { getUsers, getuser, deleteUser, updateUser,profileController };
