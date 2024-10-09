import Blog from "../models/blog.models.js";

export const createBlogs = async (req, res) => {
  try {
    const { title, content, location } = req.body;
    const author = req.user.id;

    const newBlog = new Blog({
      title,
      content,
      author,
      location,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating blog post" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};
