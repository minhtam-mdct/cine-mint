const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const decode = jwt.verify(token, "MinT");
    console.log("decode:", decode);
    if (decode) {
      req.user = decode;
      return next();
    } else {
      res.status(401).send("You are not logged in");
    }
  } catch (error) {
    res.status(401).send("You are not logged in");
  }
};

const authorize = (arrType) => (req, res, next) => {
  const { user } = req;
  if (arrType.findIndex((ele) => ele === user.type) > -1) {
    next();
  } else {
    res.status(403).send("You are logged in but not have permission");
  }
};

module.exports = {
  authenticate,
  authorize,
};
