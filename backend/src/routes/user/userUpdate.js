import express from "express";
import {
  changeUserEmail,
  changeUserPassword,
  putUserInfo
} from "../../controllers/user/userUpdate";

const router = express.Router();

export default () => {
  router.put("/:userId", putUserInfo);
  router.put("/change-user-email/:userId", changeUserEmail);
  router.put("/change-user-password/:userId", changeUserPassword);
  return router;
};
