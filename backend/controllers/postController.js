const Post = require("../models/postmodel/PostModel");
const errorHandler = require("../middleware/error");
const postController = async (req, res, next) => {
  const { title, content, category } = req.body;
  const image = req.file;

  if (!req.user.isAdmin) {
    return next(errorHandler(400, "the user in this id cannot create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "all feilds must be required"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace("/[^a-zA-Z0-9-]", "-");

  const newPost = await Post.create({
    title,
    content,
    category,
    userId: req.user._id,
    slug,
    image: "post/" + image.filename,
  });
  try {
    res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
};
const getController = async (req, res, next) => {
  try {
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      // ...(req.query.id && { postId: req.query.id }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    });

    const totalPosts = await Post.countDocuments(); //this are used to count total number of posts on  our database.
    const now = new Date();
    const onemonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastmonthPosts = await Post.countDocuments({
      createdAt: { $gte: onemonthAgo },
    }); //this are used to find last month posts
    res.status(200).json({
      posts,
      totalPosts,
      lastmonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

const getposbyId = async (req, res, next) => {
  const id = req.params.id;

  try {
    const getpostbyid = await Post.findById(id);

    res.status(200).json(getpostbyid);
  } catch (error) {
    next(error);
  }
};
const getcontrollerPginated = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit || 3;
  const startIndex = (parseInt(page) - 1) * limit;
  const sort = req.query.order === "desc" ? -1 : 1;
  try {
    const blogs = await Post.find()
      .sort({ title: sort })
      .skip(startIndex)
      .limit(limit);

    const totlablogs = await Post.countDocuments();

    res.status(200).json({
      blogs: blogs,
      page: parseInt(page),
      totalpages: Math.ceil(totlablogs / limit),
    });
  } catch (error) {
    next(error);
  }
};

const deletePosts = async (req, res, next) => {
  const id  = req.params.id;
  if(req.user.isAdmin){
    try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "delete the post succesfully" });
  } catch (error) {
    next(error);
  }
  }
  
};

const editHandller = async (req, res, next) => {
  const  id  = req.params.id;

  const { title, content, category } = req.body;
  const image = req.file;
  if (!req.user.isAdmin) {
    next(errorHandler(400, "the user is cannot update the post"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace("/[^a-zA-Z0-9-]", "-");
  const newEdit = await Post.findByIdAndUpdate(id, {
    title,
    content,
    category,
    slug,
    image: "post/" + image.filename,
  });
  res.status(200).json(newEdit);
};

module.exports = {
  postController,
  getController,
  getcontrollerPginated,
  deletePosts,
  editHandller,
  getposbyId,
};
