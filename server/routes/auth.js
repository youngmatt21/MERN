const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// register routes
router.post("/register", async (req, res) => {
  // destruture request body

  const { firstname, lastname, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    user = new User({ firstname, lastname, email, password });

    // encrypt the password

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // jwt token

    const payload = {
      user: { id: user.id },
    };

    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;

      return res.json(token);
    });
  } catch (error) {
    return res.status(500).send("server error");
  }
});

//login routes

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // check User exists
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    //check password matches

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    // Generate JWT token

    const payload = {
      user: { id: user.id },
    };

    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;

      return res.json(token);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
