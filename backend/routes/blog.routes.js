import express from "express";
import {
  createBlogs,
  getAllBlogs,
  getBlogById,
} from "../controllers/blog.controllers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Protect the create route with verifyToken
router.post("/", verifyToken, createBlogs);

// Publicly accessible routes for fetching blogs
router.get("/", getAllBlogs);  // No auth needed for fetching all blogs
router.get("/:id", getBlogById);  // No auth needed for fetching a single blog by id

export default router;
