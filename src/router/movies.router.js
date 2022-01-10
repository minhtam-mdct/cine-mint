const express = require("express");

const movieRouters = express.Router();

const {
  getMovieList,
  getMovieDetail,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controller.js");

const {
  authenticate,
  authorize,
} = require("../middlewares/auth.middlewares.js");
const { uploadImage } = require("../middlewares/upload.middlewares.js");

movieRouters.get("/", getMovieList);

movieRouters.get("/:id", getMovieDetail);

movieRouters.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  uploadImage("poster"),
  createMovie
);

movieRouters.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  uploadImage("poster"),
  updateMovie
);

movieRouters.delete("/:id", authenticate, authorize(["ADMIN"]), deleteMovie);

module.exports = {
  movieRouters,
};
