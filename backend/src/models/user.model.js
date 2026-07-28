import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true,"username already exists"],
    required: true,
  },
  email: {
    type: String,
    unique: [true,"email already exists"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

const UserModel = mongoose.model("user",UserSchema);
export default UserModel;