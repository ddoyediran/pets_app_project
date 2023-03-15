const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");

const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error message", error.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = app.get("/", (req, res) => {
  res.json({ message: "working" });
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
