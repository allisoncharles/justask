import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    fullname: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    access: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
