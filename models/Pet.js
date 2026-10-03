// server/models/Pet.js
const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pets: {
    type: Map,
    of: {
      name: { type: String, default: "未命名" },
      type: { type: String, required: true },
      img2: { type: String, default: "/images/default-pet.png" },
      stats: {
        level: { type: Number, default: 1 },
        exp: { type: Number, default: 0 },
        hunger: { type: Number, default: 50 },
        cleanliness: { type: Number, default: 50 },
        emotion: { type: Number, default: 50 },
      },
      eventIndex: { type: Number, default: 1 },
      triggeredEvents: { type: [Number], default: [0] },
      createdAt: { type: Date, default: Date.now },
    },
    default: {},
  },
  lastActivePet: { type: String, default: "neko" },
});

module.exports = mongoose.model("Pet", petSchema);
