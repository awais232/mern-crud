const UserModel = require("../models/Users");

const userController = {
  getAllUsers: (req, res) => {
    UserModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err))
  },

  createUser: (req, res) => {
    UserModel.create(req.body)
      .then(users => res.json(users))
      .catch(err => res.json(err))
  },

  getUserById: (req, res) => {
    const { id } = req.params;
    UserModel.findById({ _id: id })
      .then(users => res.json(users))
      .catch(err => res.json(err))
  },

  updateUser: (req, res) => {
    const { id } = req.params;
    UserModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
      .then(users => res.json(users))
      .catch(err => res.json(err))
  },

  deleteUser: (req, res) => {
    const { id } = req.params;
    UserModel.findByIdAndDelete({ _id: id })
      .then(() => {
        return UserModel.find();
      })
      .then(users => res.json(users))
      .catch(err => res.json(err))
  }
};

module.exports = userController;