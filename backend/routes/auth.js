const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

router.post(
  "/",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);
    console.log(req.body.email);

    let newUser = await User.findOne({ email: req.body.email });

    if (newUser) {
      res.send("this user  is  already exists");
    } else {
      newUser = new User(req.body);

      await newUser.save();

      res.send("data saved");
    }
  }
);

module.exports = router;
