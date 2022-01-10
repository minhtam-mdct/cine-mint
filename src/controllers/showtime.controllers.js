const {
  Movie,
  CinemaMovie,
  Cinema,
  Cineplex,
  Showtime,
  Seat,
} = require("../models");
const createShowtime = async (req, res) => {
  const { startTime, cinemaId } = req.body;
  try {
    const showTime = await Showtime.create({ startTime, cinemaId });
    res.status(200).send(showTime);
  } catch (error) {}
};
const getShowtime = async (req, res) => {
  try {
    const showTime = await Showtime.findAll();

    res.status(200).send(showTime);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getShowtimeWithCinema = async (req, res) => {
  const { cinemaId } = req.params;
  const cinemaID = cinemaId.slice(9);

  try {
    const showTimeWithCinema = await Showtime.findAll({
      where: { cinemaID },
    });
    res.status(200).send(showTimeWithCinema);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getShowtime,
  getShowtimeWithCinema,
  createShowtime,
};
