const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader == undefined) {
    return res.status(401).json({ error: "You are not logged in!" });
  } else {
    token = authHeader;
  }
  console.log(token);
  /*
  if (token === null)
    return res.status(401).json({ error: "You are not logged in!" }); */

  jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "An error occurred during token verification." });
    }
    next();
  });
};
