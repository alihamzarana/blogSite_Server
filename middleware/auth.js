const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("this is token", token);
  console.log("header request", req.headers);
  const decodedToken = jwt.verify(token, "blogsite");
  console.log("decodeToken", decodedToken);
  req.body.userId = decodedToken.payload._id;

  next();
};

module.exports = authenticate;
