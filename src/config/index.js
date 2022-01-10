const dotenv = require("dotenv");
dotenv.config();

const server = {
  host: process.env.HOST,
  port: process.env.PORT,
};

const configEnv = {
  server,
};

module.exports = { configEnv };
