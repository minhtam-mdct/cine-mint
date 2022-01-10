"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cinema, Seat }) {
      // define association here
      this.belongsTo(Cinema, { foreignKey: "cinemaId" });
      this.hasMany(Seat, { foreignKey: "showtimeId" });
    }
  }
  Showtime.init(
    {
      startTime: DataTypes.DATE,
      cinemaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Showtime",
    }
  );
  return Showtime;
};
