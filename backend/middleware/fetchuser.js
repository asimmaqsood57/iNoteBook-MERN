const jwt = require("jsonwebtoken");

fetchuser = (req, res, next) => {
  // get the user from jwt token and id to req

  const token = req.header("auth-token");

  if (!token) {
    req.status(401).send({ err: "Please enter a valid token" });
  }

  try {
    const data = jwt.verify(token, "asimisagoodboy");

    req.user = data.user;
  } catch (error) {
    res.status(500).send({ err: "token is not verified" });
  }

  next();
};

module.exports = fetchuser;
