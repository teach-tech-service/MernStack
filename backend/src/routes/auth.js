import express from "express";
import { loginUser } from "../controllers/auth";

const router = express.Router();

export default () => {
  router.post("/login", loginUser);
  return router;
};
