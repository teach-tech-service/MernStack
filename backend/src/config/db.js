import mongoose from "mongoose";
import { importDataFromFiles } from "../helpers/loadData";
import CategoryModel from "../models/category";
import PostModel from "../models/post";
import UserModel from "../models/user";
import dotenv from "dotenv/config";
import fs from "fs";
import path from "path";

const MONGO_DB_URL =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/mernstack";

export default () => {
  mongoose.connect(
    MONGO_DB_URL,
    { useCreateIndex: true, useNewUrlParser: true },
    err => {
      if (err) {
        throw new Error(`Error while trying to connect MongoDB ${err}`);
      }
      console.log(`Connected to MongoDB on port ${MONGO_DB_URL}`);
      importDataFromFiles([
        "mockData/users.json",
        "defaultData/categories.json",
        "mockData/posts.json"
      ]).then(async data => {
        await UserModel.deleteMany({});
        await CategoryModel.deleteMany({});
        await PostModel.deleteMany({});
        const users = await UserModel.create(data[0]),
          categories = await CategoryModel.create(data[1]),
          posts = data[2];

        for (let p = 0; p < posts.length; p++) {
          posts[p].userCreated = users[0]._id;
          posts[p].category = categories[0]._id;
        }
        posts[0].comments = users[0].comments;
        posts[1].comments = users[1].comments;
        posts[2].comments = users[2].comments;

        await PostModel.create(posts)
      });
    }
  );
};
