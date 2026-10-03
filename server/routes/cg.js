const express = require("express");
const CG = require("../models/CG");
const router = express.Router();

// 儲存解鎖的 CG
router.post("/", async (req, res) => {
  try {
    const { userId, petType, endingType, endingId, cgImage, endingName } =
      req.body;
    const cg = new CG({
      userId,
      petType,
      endingType,
      endingId,
      cgImage,
      endingName,
    });
    await cg.save();
    res.status(201).json(cg);
  } catch (err) {
    console.error("儲存 CG 錯誤:", err.message, err.stack);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 獲取使用者的 CG 紀錄
router.get("/:userId", async (req, res) => {
  try {
    const cgs = await CG.find({ userId: req.params.userId });
    res.json(cgs);
  } catch (err) {
    console.error("獲取 CG 紀錄錯誤:", err.message, err.stack);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

module.exports = router;
