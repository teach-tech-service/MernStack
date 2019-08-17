import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model("category", CategorySchema);
