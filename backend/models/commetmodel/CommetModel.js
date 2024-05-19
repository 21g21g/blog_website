const mongoose=require("mongoose")

const Schema=mongoose.Schema
const commetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOflikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Commet=mongoose.model("Commet",commetSchema)
module.exports =Commet
