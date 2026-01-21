import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export const Register = async (req, res, next) => {
  try {
    const { fullName, email, password, role, country } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ error: "Missing required fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "Email already exists" });

    const user = new User({ fullName, email, role, country });
    user.password = password; // triggers pre-save hash
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
}


export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
