import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  posts: [
    {
      ref: "post",
      type: Schema.Types.ObjectId
    }
  ]
});

export default mongoose.model("category", CategorySchema);
