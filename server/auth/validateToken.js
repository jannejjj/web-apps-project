const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader == undefined || authHeader === null) {
    return res.status(401).json({ error: "You are not logged in!" });
  } else {
    token = authHeader.split(" ")[1];
  }
  console.log(authHeader);

  jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      return res.status(401).json({ error: "You are not logged in!" });
    }
    next();
  });
};
