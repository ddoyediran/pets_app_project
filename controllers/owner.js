const ownerRouter = require("express").Router({ mergeParams: true });
const Owner = require("../models/owner");
const Pet = require("../models/pet");

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

  Owner.findByIdAndUpdate(req.params.id, { name: body.name }, { new: true })
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

// Create a pet for an owner when a form is submitted
ownerRouter.post("/:ownerId/pets", (req, res, next) => {
  // create a new Pet based on request body
  const newPet = new Pet(req.body);

  // extract ownerId from route
  const { ownerId } = req.params;
  // set the pet's owner via route param
  newPet.owner = ownerId;
  // save the newPet
  return newPet
    .save()
    .then((pet) => {
      // update the owner's pets array
      return Owner.findByIdAndUpdate(
        ownerId,
        /*
         Add new pet's ObjectId (_id) to set of Owner.pets.
         We use $addToSet instead of $push so we can ignore duplicates!
        */

        { $addToSet: { pets: pet._id } }
      );
    })
    .then(() => {
      return res.redirect(`/owners/${ownerId}/pets`);
      //return res.redirect(`/${ownerId}/pets`);
    })
    .catch((err) => next(err));
});

// Display all pets for an owner
ownerRouter.get("/:owner_id/pets", (req, res, next) => {
  return Owner.findById(req.params.owner_id)
    .populate("pets")
    .exec()
    .then((owner) => {
      return res.status(200).json({ owner });
      //return res.render("pets/index", { owner });
    })
    .catch((err) => {
      next(err);
    });
});

//Display a single pet for an owner
ownerRouter.get("/:owner_id/pets/:petId", (req, res, next) => {
  return Owner.findById(req.params.owner_id)
    .populate("pets")
    .exec()
    .then((owner) => {
      // if the owner is not found
      if (!owner) {
        return res.status(204).json({ message: "Owner not found!" });
      }

      Pet.findById(req.params.petId)
        .select(["-owner"])
        .then((pet) => {
          return res.status(200).json(pet);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = ownerRouter;
