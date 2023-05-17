const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const cors = require("cors");

const Task = require("./models/Task");

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const todoRoute = require("./routes/todo")

app.use("/todo", todoRoute)

mongoose
  .connect(process.env.DB_CONNECT.toString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error connecting the database");
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`The server is up and running on ${port}!`);
});
