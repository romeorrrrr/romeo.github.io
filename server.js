const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://Romeo:YrVMdf5vDuATwJwt@romeo.hup0c.mongodb.net/dataOfUsers?retryWrites=true&w=majority&appName=Romeo",
  {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
);

mongoose.connection
  .once("open", () => {
    console.log("Connected to MongoDB Atlas");
  })
  .on("error", (error) => {
    console.error("Connection error:", error);
  });

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePic: { type: String },
});

const User = mongoose.model("User", userSchema);

app.post("/saveUser", async (req, res) => {
  try {
    console.log("Received request to save user:", req.body);
    const existingEmail = await User.findOne({
      email: req.body.email,
    });

    if (existingEmail) {
      console.log("Email already in use:", req.body.email);
      return res.status(400).send("Emailul este deja folosit !");
    }

    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      profilePic: req.body.profilePic,
    });

    await newUser.save();
    console.log("User saved successfully", newUser);
    res.status(200).send("User saved successfully");
  } catch (error) {
    console.error("Error saving user", error);
    res.status(500).send("Error saving user");
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("Received login request:", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      console.log("User found:", user);
      res.status(200).json({
        message: "Te-ai logat cu success!",
        profilePic: user.profilePic,
      });
    } else {
      console.log("Nu s-a gasit niciun cont cu email/parola introdusa !");
      res
        .status(400)
        .send("Nu s-a gasit niciun cont cu email/parola introdusa !");
    }
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).send("Error during login");
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000 !");
});
