const express = require("express");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const { rootRouter } = require("./src/router/root.router");
const { passport } = require("./src/services/login-with-facebook");
const { configEnv } = require("./src/config");
dotenv.config();
app.use(express.json());
app.use(
  require("express-session")({
    secret: "thisissecretkey",
    resave: true,
    saveUninitialized: true,
  })
);

// setup static file
const pathPublicDirectory = path.join(__dirname, "./public");
// http://localhost:7000/public <==> folder public
app.use("/public", express.static(pathPublicDirectory));

//login FB
app.use(passport.initialize());
app.use(passport.session());
// app.get("/", function (req, res) {
//   res.render("home", { user: req.user });
// });
// app.get("/login", function (req, res) {
//   res.render("login");
// });
app.get("/login/facebook", passport.authenticate("facebook"));
app.get(
  "/return",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);
app.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function (req, res) {
    console.log("req.user: ", req.user);
    res.render("profile", { user: req.user });
  }
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome To CineMinT");
});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/api/v1", rootRouter);

const port = configEnv.server.port;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
