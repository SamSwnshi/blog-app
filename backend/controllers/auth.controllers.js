import User from "../models/auth.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || username.length < 3 || username.length > 10) {
      return res
        .status(400)
        .json({
          message: "Username must be between 3 and 10 characters long.",
        });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already exists." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
