const express = require("express");
const userRouter = express.Router();
const { User } = require("../models");

const {
  findAllUser,
  findDetailUser,
  createUser,
  updateUser,
  removeUser,
  uploadAvatar,
} = require("../controllers/user.controllers");

const { authenticate, authorize } = require("../middlewares/auth.middlewares");

const { uploadImage } = require("../middlewares/upload.middlewares");

const { checkExist } = require("../middlewares/check-exist.middlewares");

userRouter.post(
  "/upload-avatar",
  authenticate,
  uploadImage("avatar"),
  uploadAvatar
);

userRouter.get("/", findAllUser);
userRouter.get("/:id", [checkExist(User)], findDetailUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  checkExist(User),
  removeUser
);

module.exports = {
  userRouter,
};
