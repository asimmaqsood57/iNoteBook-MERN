const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "asimisagoodboy";
//for sign up
router.post(
  "/createuser",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);

    try {
      let newUser = await User.findOne({ email: req.body.email });

      if (newUser) {
        res.send("this user  is  already exists");
      } else {
        newUser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
        const data = {
          user: {
            id: newUser._id,
          },
        };
        const authToken = await jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        res.send(newUser);
      }
    } catch (error) {
      res.status(500).send("some thing went wrong");
    }
  }
);

// for login

router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blanked").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      console.log(user);
      if (!user) {
        res.status(400).json({ error: "Invalid Credentials 1" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      console.log(passwordCompare);
      console.log("after password compare");
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid Credentials 2" });
      }

      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = await jwt.sign(data, JWT_SECRET);
      res.send(authToken);
    } catch (error) {
      console.log("Invalid Credentials");
    }
  }
);

// get logged in user details

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
