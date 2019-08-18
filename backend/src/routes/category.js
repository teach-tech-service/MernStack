import express from "express";
import {
  postCategory,
  putCategory,
  deletComment
} from "../controllers/category";

const router = express.Router();

export default () => {
  router.post("/", postCategory);
  router.put("/:categoryId", putCategory);
  router.delete("/:categoryId", deletComment);
  return router;
};
