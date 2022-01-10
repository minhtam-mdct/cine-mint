const {
  Movie,
  CinemaMovie,
  Cinema,
  Cineplex,
  Showtime,
  Seat,
} = require("../models");

const { configEnv } = require("../config");

const getMovieList = async (req, res) => {
  try {
    const movieList = await Movie.findAll();
    res.status(200).send(movieList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMovieDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const movieDetail = await Movie.findOne({
      include: [
        {
          model: CinemaMovie,
          include: [
            {
              model: Cinema,
              include: [
                { model: Cineplex },
                { model: Showtime, include: Seat },
              ],
            },
          ],
        },
      ],

      where: {
        id,
      },
    });

    if (movieDetail) {
      res.status(200).send(movieDetail);
    } else {
      res.status(404).send(`Not Found!`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createMovie = async (req, res) => {
  const { file } = req;
  const urlImage = configEnv.server.host + file.path;
  const { name, startDate, time, evaluate, trailer } = req.body;
  try {
    const newMovie = await Movie.create({
      name,
      startDate,
      time,
      evaluate,
      trailer,
      poster: urlImage,
    });

    res.status(201).send(newMovie);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  const urlImage = configEnv.server.host + file.path;
  const { name, startDate, time, evaluate, trailer } = req.body;
  try {
    const movieUpdate = await Movie.findOne({
      where: {
        id,
      },
    });
    if (movieUpdate) {
      movieUpdate.name = name;
      movieUpdate.trailer = trailer;
      movieUpdate.poster = urlImage;
      movieUpdate.startDate = startDate;
      movieUpdate.time = time;
      movieUpdate.evaluate = evaluate;
      await movieUpdate.save();
      res.status(200).send(movieUpdate);
    } else {
      res.status(404).send(`Not Found!`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    let movieDelete = await Movie.findOne({
      where: {
        id,
      },
    });
    if (movieDelete) {
      Movie.destroy({
        where: {
          id,
        },
      });
      res.status(200).send(movieDelete);
    } else {
      res.status(404).send(`Not Found!`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getMovieList,
  getMovieDetail,
  createMovie,
  updateMovie,
  deleteMovie,
};
