const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "working" });
});

app.listen(6060, () => {
  console.log(`Server is running on port 6060`);
});
