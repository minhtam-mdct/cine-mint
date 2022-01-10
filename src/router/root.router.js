const express = require("express");
const rootRouter = express.Router();

const { movieRouters } = require("../router/movies.router");
const { authRouter } = require("../router/auth.router");
const { userRouter } = require("../router/user.router");
const { showtimeRouter } = require("../router/showtime.router");

rootRouter.use("/movies", movieRouters);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/showtime", showtimeRouter);

module.exports = {
  rootRouter,
};
