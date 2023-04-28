const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.json({ message: "User not found" });
    } else if (user.password === req.body.password) {
      res.json(user);
    } else {
      res.json({ message: "Wrong password" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/", async (req, res) => {
  const oldUser = await User.findOne({ username: req.body.username });
  if (oldUser) {
    return res.json({ message: "User existed" });
  } else {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    });
    console.log(user);
    try {
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (err) {
      res.json({ message: err });
    }
  }
});
router.patch("/:username", async (req, res) => {
  try {
    const oldUser = await User.findOne({ username: req.body.username });
    if (oldUser) {
      return res.json({ message: "User existed" });
    } else {
      const updatedUser = await User.updateOne({
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          point: req.body.point,
          savedBooks: req.body.savedBooks,
        },
      });
    }
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:username", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ username: req.params.username });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
