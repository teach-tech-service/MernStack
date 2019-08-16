import mongoose from "mongoose";
import { importDataFromFiles } from "../helpers/loadData";
import Category from "../models/category";
import Post from "../models/post";
import Users from "../models/user";
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
        "mockData/posts.json",
        "defaultData/categories.json"
      ]).then((data) => {
        console.log(data)
      })
    }
  );
};
