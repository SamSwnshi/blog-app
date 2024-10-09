import express from "express";
import { createBlogs, getAllBlogs } from "../controllers/blog.controllers.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js";
router.post("/", verifyToken, createBlogs);
router.get("/", verifyToken, getAllBlogs);

export default router;
