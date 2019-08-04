import express from "express";
import { postComment, putComment, deletComment } from "../controllers/comment";

const router = express.Router();

export default () => {
  router.post("/:post_id/:id", postComment);
  router.put("/:post_id/:id", putComment);
  router.delete("/:post_id/:id", deletComment);
  return router
};
