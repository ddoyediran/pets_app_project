const ownerRouter = require("express").Router();
const Owner = require("../models/owner");

// List all owners
ownerRouter.get("/owners", (req, res) => {
  Owner.find({}).then((owners) => {
    res.status(200).json({ owners: owners });
  });
});

// Display a form for creating a new owner
ownerRouter.get("/owners/new", (req, res) => {});

// Display a single owner
ownerRouter.get("/owners/:id", (req, res) => {
  Owner.findById(req.params.id)
    .then((owner) => {
      if (!owner) {
        return res.status(204).json({ owner: "Owner not found!" });
      }

      res.json({ owner: owner });
    })
    .catch((err) => {
      console.error(err.message);
    });
});

module.exports = ownerRouter;
