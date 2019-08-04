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
  router.get("/:id", getPostById);
  router.post("/", postPost);
  router.put("/company-info/:id", putPost);
  router.delete("/admin-delete/:id", deletePostByAdmin);
  router.get("/post-delete/:id", deletePost);
  router.get("/post-delete-confirm", deletePostConfirmation);
  return router;
};
