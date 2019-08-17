import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import CommentSchema from "./comment";
import dotenv from "dotenv/config";
import { isEmail } from "../helpers/checkDataType";
import { AUTH_FAILURE, AUTH_SUCCESS } from "../statuses/authStatuses";

const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR || 6;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(val) {
        return isEmail(val);
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

UserSchema.pre("save", function(next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcryptjs.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcryptjs.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  bcryptjs.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      throw err;
    }
    return isMatch;
  });
};

UserSchema.statics.authenticateUser = async function(email, password) {
  const user = this.model.find({ email });
  if (!user) {
    throw AUTH_FAILURE;
  }

  let isMatch;
  try {
    isMatch = await UserSchema.comparePassword(password);
  } catch (err) {
    throw AUTH_FAILURE;
  }
  
  if (isMatch) {
    return AUTH_SUCCESS;
  }

  return AUTH_FAILURE;
};

export default mongoose.model("user", UserSchema);
