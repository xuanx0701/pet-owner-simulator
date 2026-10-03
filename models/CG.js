const mongoose = require("mongoose");

const cgSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  petType: { type: String, required: true }, // 寵物類型：neko, puppy, parrot
  endingType: { type: String, required: true }, // 結局類型：BE, TE, HE
  endingId: { type: Number, required: true }, // 結局編號，例如 BE1, TE1, HE1
  cgImage: { type: String, required: true }, // CG 圖片路徑
  endingName: { type: String, required: true }, // 結局名稱
  unlockedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CG", cgSchema);
