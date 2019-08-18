import express from "express";
import {
  confirmUserChangeEmail,
  confirmUserChangePassword,
  confirmUserDelete,
  confirmUserEmail,
  confirmUserUpdate
} from "../../controllers/user/confirmUserActivity";

const router = express.Router();

export default () => {
  router.get("/confirm-email/:code", confirmUserEmail);
  router.get("/confirm-update/:code", confirmUserUpdate);
  router.get("/confirm-delete/:code", confirmUserDelete);
  router.get("/confirm-update-email/:code", confirmUserChangeEmail);
  router.get("/confirm-update-password/:code", confirmUserChangePassword);
  return router;
};
