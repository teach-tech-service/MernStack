import express from "express";
import {
  getUsers,
  getUsersByPage,
  getUserById,
  postUser,
  loginUser,
  putUser,
  deleteUserByAdmin,
  confirmUserDelete,
  deleteUser
} from "../controllers/user";

const router = express.Router();

export default () => {
  router.get("/", getUsers);
  router.get("/page/:page", getUsersByPage)
  router.get("/:id", getUserById);
  router.post("/register", postUser);
  router.post("/login", loginUser);
  router.put("/", putUser);
  router.delete("/admin-delete/:id", deleteUserByAdmin);
  router.get("/user-delete/:id", deleteUser);
  router.delete("/user-delete-confirm/:unique", confirmUserDelete);
  return router;
};
