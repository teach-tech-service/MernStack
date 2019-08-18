import express from "express";
import { postComment, putComment, deletComment } from "../controllers/comment";

const router = express.Router();

export default () => {
  router.post("/:postId/:id", postComment);
  router.put("/:postId/:id", putComment);
  router.delete("/:postId/:id", deletComment);
  return router
};
