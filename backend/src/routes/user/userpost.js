import express from "express";
import {
    getUserPosts
} from "../../controllers/user/user";

const router = express.Router();

export default () => {
  router.get("/", getUserPosts);
  return router;
};

