import mongoose, { Schema } from "mongoose";
import CommentSchema from "./comment";

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(val) {
        return validateEmail(val);
      },
      message: props => `${props.value} is not valid email address`
    }
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  comments: [CommentSchema],
  password: {
    type: String,
    required: true
  },
  posts: [
    {
      ref: "post",
      type: Schema.Types.ObjectId
    }
  ],
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
  }
});

export default mongoose.model("user", UserSchema);
