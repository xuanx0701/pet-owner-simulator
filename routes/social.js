const express = require("express");
const Friend = require("../models/Friend");
const User = require("../models/User");
const mongoose = require("mongoose");
const router = express.Router();

// 獲取好友列表
router.get("/friends/:userId", async (req, res) => {
  try {
    const friends = await Friend.find({ userId: req.params.userId }).populate(
      "friendId",
      "username avatar"
    );
    res.json(
      friends.map((f) => ({
        userId: f.friendId._id,
        username: f.friendId.username,
        avatar: f.friendId.avatar || "/images/default-avatar.png",
        status: f.status,
      }))
    );
  } catch (err) {
    console.error("獲取好友列表錯誤:", err.message, err.stack);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 添加好友
router.post("/friends", async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    console.log("添加好友請求:", { userId, friendId });

    if (!userId || !friendId) {
      return res.status(400).json({ message: "缺少 userId 或 friendId" });
    }
    if (
      !mongoose.isValidObjectId(userId) ||
      !mongoose.isValidObjectId(friendId)
    ) {
      return res.status(400).json({ message: "無效的 userId 或 friendId" });
    }
    if (userId === friendId) {
      return res.status(400).json({ message: "不能添加自己為好友" });
    }

    const existingFriend = await Friend.findOne({ userId, friendId });
    if (existingFriend) {
      return res.status(400).json({ message: "好友已存在" });
    }

    const friendUser = await User.findById(friendId).select("username avatar");
    if (!friendUser) {
      return res.status(404).json({ message: "好友用戶不存在" });
    }

    const friend = new Friend({ userId, friendId });
    await friend.save();

    res.json({
      userId: friendId,
      username: friendUser.username,
      avatar: friendUser.avatar || "/images/default-avatar.png",
      status: friend.status,
    });
  } catch (err) {
    console.error("添加好友錯誤:", err.message, err.stack);
    res.status(500).json({ message: "伺服器錯誤", error: err.message });
  }
});

// 移除好友
router.delete("/friends", async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    await Friend.findOneAndDelete({ userId, friendId });
    res.status(204).send();
  } catch (err) {
    console.error("移除好友錯誤:", err.message, err.stack);
    res.status(500).json({ message: "無法移除好友" });
  }
});

module.exports = router;
