const mongoose = require("mongoose");

const storyProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  petType: { type: String, required: true }, // 寵物類型：neko, puppy, parrot
  chapterIndex: { type: Number, required: true }, // 章節編號，例如 1 代表 chapter01
  unlocked: { type: Boolean, default: false }, // 是否解鎖該章節
  choicesMade: [
    {
      // 記錄玩家選擇的分支路徑
      dialogueIndex: { type: Number, required: true }, // 選擇點的對話索引
      choiceIndex: { type: Number, required: true }, // 選擇的選項索引
      nextDialogueIndex: { type: Number, required: true }, // 選擇後跳轉到的對話索引
    },
  ],
  completedAt: { type: Date }, // 完成時間
});

module.exports = mongoose.model("StoryProgress", storyProgressSchema);
