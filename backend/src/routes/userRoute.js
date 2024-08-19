const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = Router();
const UserModel = require("../models/userModel");

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (err) {
    console.log(err);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await UserModel.findOne({ email });
  if (!userDoc) {
    return res.status(404).json({ error: "User not Found" });
  }
  const passOK = bcrypt.compareSync(password, userDoc.password);
  if (!passOK) {
    return res.status(401).json({ error: "Invalid Password" });
  }

  jwt.sign(
    {
      email: userDoc.email,
      id: userDoc._id,
    },
    jwtSecret,
    {},
    (err, token) => {
      if (err) {
        return res.status(500).json({ error: "Failed to generate Token" });
      }
      localStorage.setItem("token", token);
    }
  );
});

app.get("/profile", (req, res) => {
  const { token } = localStorage.getItem("token");
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await UserModel.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  localStorage.removeItem("token");
});

module.exports = app;
