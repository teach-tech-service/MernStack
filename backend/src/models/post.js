import mongoose, { Schema } from "mongoose";
import CommentSchema from "./comment";

const PostSchema = new mongoose.Schema({
  userCreated: {
    ref: "user",
    type: Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
    //this makes field read only (you can only one time set value)
    set: function(val) {
      if (!this.createdAt || this.createdAt === "") {
        return val;
      }
      return this.createdAt;
    }
  },
  title: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 3000
  },
  isVisible: {
    type: Boolean,
    required: true,
    default: true
  },
  comments: [CommentSchema]
});

export default mongoose.model("post", PostSchema);
