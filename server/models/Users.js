const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    age: Number,
    phone: String,
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;