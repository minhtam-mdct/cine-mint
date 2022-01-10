const express = require("express");

const showtimeRouter = express.Router();

const {
  getShowtime,
  getShowtimeWithCinema,
  createShowtime,
} = require("../controllers/showtime.controllers");

showtimeRouter.get("/", getShowtime);
showtimeRouter.get("/:cinemaId", getShowtimeWithCinema);
showtimeRouter.post("/", createShowtime);
module.exports = {
  showtimeRouter,
};
