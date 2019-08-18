import express from "express";
import {
  getPostByPage,
  getPostById,
  postPost,
  putPost,
  deletePostByAdmin,
  deletePost,
  deletePostConfirmation
} from "../controllers/post";

const router = express.Router();

export default () => {
  router.get("/page/:page", getPostByPage);
  router.get("/:postId", getPostById);
  router.post("/", postPost);
  router.put("/company-info/:postId", putPost);
  router.delete("/admin-delete/:postId", deletePostByAdmin);
  router.get("/post-delete/:postId", deletePost);
  router.get("/post-delete-confirm", deletePostConfirmation);
  return router;
};
