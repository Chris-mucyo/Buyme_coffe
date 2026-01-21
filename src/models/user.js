// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String }, // ✅ NOT required
  role: { type: String, default: "artist" },
  country: { type: String, default: "Rwanda" },
  createdAt: { type: Date, default: Date.now }
});

userSchema.virtual("password").set(function (password) {
  this._password = password;
});

userSchema.pre("save", async function () {
  if (this._password) {
    this.passwordHash = await bcrypt.hash(this._password, 10);
  }
});


/* Compare password */
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

/* Hide passwordHash */
userSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.passwordHash;
    return ret;
  }
});

/* SAFE EXPORT */
export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
