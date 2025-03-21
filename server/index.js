const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mern-crud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
