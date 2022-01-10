const express = require("express");
const { signIn, signUp } = require("../controllers/auth.controllers");
const authRouter = express.Router();

authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);

module.exports = {
  authRouter,
};
