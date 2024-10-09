import express from "express";
import dotenv from "dotenv";
import connection from "./database/config.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import blogRoutes from "./routes/blog.routes.js"

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.use('/api/auth',authRoutes)
app.use("/api/blogs",blogRoutes)

app.listen(port, () => {
  connection();
  console.log(`Server is running on port: ${port}`);
});
