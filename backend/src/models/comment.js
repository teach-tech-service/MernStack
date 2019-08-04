import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    default: "",
    minlength: 100
  },
  upVotes: {
    type: Number,
    default: 0
  },
  //this makes field read only (you can only one time set value)
  createdAt: {
    type: Date,
    default: new Date(),
    set: function(val) {
      if (!this.createdAt || this.createdAt === "") {
        return val;
      }
      return this.createdAt;
    }
  }
});

export default CommentSchema;
