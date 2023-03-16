const ownerRouter = require("express").Router();
const Owner = require("../models/owner");

// List all owners
ownerRouter.get("/", (req, res) => {
  Owner.find({}).then((owners) => {
    res.status(200).json({ owners: owners });
  });
});

// Display a form for creating a new owner
ownerRouter.get("/new", (req, res) => {});

// Display a single owner
ownerRouter.get("/:id", (req, res) => {
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

// Create an owner when a form is submitted
ownerRouter.post("/", (req, res) => {
  const body = req.body;

  const owner = new Owner({
    name: body.name,
    pets: body.petsId,
  });

  owner
    .save()
    .then((savedOwner) => {
      res.status(201).json({ message: savedOwner });
    })
    .catch((err) => {
      console.error(err);
    });
});

// Edit an owner when a form is submitted
ownerRouter.patch("/:id", (req, res) => {
  const body = req.body;

  Owner.findByIdAndUpdate(
    req.params.id,
    { name: body.name, pets: body.pets },
    { new: true }
  )
    .then((updatedOwner) => {
      res.status(200).json({ updatedOwner });
    })
    .catch((err) => {
      console.error(err.message);
    });
});

// Delete an owner when a form is submitted
ownerRouter.delete("/:id", (req, res) => {
  Owner.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).json({ result });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = ownerRouter;
