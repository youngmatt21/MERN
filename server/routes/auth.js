const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  // destruture request body

  const { firstname, lastname, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: "User Already Exists" });
    }

    user = new User({ firstname, lastname, email, password });

    // encrypt the password

    const salt = await bcrypt.genSalt(10);

    user.password =await bcrypt.hash(password, salt);

    user.save();

    // jwt token

    const payload = {
      user: { id: user.id },
    };

    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;

      res.json(token);
    });
  } catch (error) {
    res.status(500).send("server error");
  }
});

module.exports = router;
