const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mern-crud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.get("/", (req, res) => {
  UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.get("/getUser/:id", (req, res) => {
  const { id } = req.params;
  UserModel.findById({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.put("/updateUser/:id", (req, res) => {
  const { id } = req.params;
  UserModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;
  UserModel.findByIdAndDelete({ _id: id })
    .then(() => {
      return UserModel.find();
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});