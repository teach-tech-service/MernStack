import express from "express";
import {
  getUsers,
  getUsersByPage,
  getUserById,
  postUser,
  deleteUserByAdmin,
  deleteUser
} from "../../controllers/user/user";

const router = express.Router();

export default () => {
  router.get("/", getUsers);
  router.get("/page/:page", getUsersByPage)
  router.get("/:userId", getUserById);
  router.post("/register", postUser);
  router.delete("/admin-delete/:userId", deleteUserByAdmin);
  router.get("/user-delete/:userId", deleteUser);
  return router;
};
