const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    a: "asim",
    roll: "1908878",
  };
  res.json(obj);
});

module.exports = router;
