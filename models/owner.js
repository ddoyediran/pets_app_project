const mongoose = require("mongoose");

// create collection schema
const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // every owner should have an array called pets
  // which consists of a bunch of ids
  // (we will use mongoose to populate the entire pet object, let's just store the _id for now)
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
});

// export the schema
module.exports = mongoose.model("Owner", ownerSchema);
