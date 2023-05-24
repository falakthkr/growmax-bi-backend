const User = require("../models/User");
const bcrypt = require("bcrypt");
const rounds = 10;

const jwt = require("jsonwebtoken");
const tokenSecret = "my-token"

const generateToken = (user) => {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
};

const loginUser = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) res.status(404).json({ error: "User not found!" });
    else {
      bcrypt.compare(req.body.password, user.password, (error, match) => {
        if (error) res.status(500).json(error);
        else if (match) res.status(200).json({ token: generateToken(user) });
        else res.status(403).json({ error: "Password incorrect" });
      });
    }
  });
};

const signupUser = (req, res) => {
  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) {
      console.log(error);
      res.status(500).json(error);
    } else {
      const newUser = User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      newUser
        .save()
        .then((user) => {
          res.status(200).json({ token: generateToken(user) });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  });
};

module.exports = { loginUser, signupUser };
