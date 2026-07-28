import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
  token : {
    type: String,
    required: [true, "Token is required to be added to the blacklist"],
  }
},{
  timestamps: true
})

const blackListModel = mongoose.model("blacklist", blackListSchema);
export default blackListModel;