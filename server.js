const express = require("express");
const config = require("./utils/config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = app.get("/", (req, res) => {
  res.json({ message: "working" });
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
