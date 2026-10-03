const express = require("express");
const StoryProgress = require("../models/StoryProgress");
const router = express.Router();

// 儲存或更新劇情進度
router.post("/", async (req, res) => {
  try {
    const { userId, petType, chapterIndex, choicesMade, unlocked } = req.body;
    let storyProgress = await StoryProgress.findOne({
      userId,
      petType,
      chapterIndex,
    });

    if (!storyProgress) {
      storyProgress = new StoryProgress({
        userId,
        petType,
        chapterIndex,
        unlocked: unlocked || true,
        choicesMade: choicesMade || [],
        completedAt: unlocked ? new Date() : null,
      });
    } else {
      storyProgress.unlocked =
        unlocked !== undefined ? unlocked : storyProgress.unlocked;
      if (choicesMade) {
        storyProgress.choicesMade = [
          ...storyProgress.choicesMade,
          ...choicesMade,
        ];
      }
      if (unlocked) {
        storyProgress.completedAt = new Date();
      }
    }

    await storyProgress.save();
    res.status(201).json(storyProgress);
  } catch (err) {
    console.error("儲存劇情進度錯誤:", err.message, err.stack);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 獲取玩家的劇情進度
router.get("/:userId", async (req, res) => {
  try {
    const storyProgress = await StoryProgress.find({
      userId: req.params.userId,
    });
    res.json(storyProgress);
  } catch (err) {
    console.error("獲取劇情進度錯誤:", err.message, err.stack);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

module.exports = router;
