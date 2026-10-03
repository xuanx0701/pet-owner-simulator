// const express = require("express");
// const mongoose = require("mongoose");
// const User = require("../models/User");
// const router = express.Router();

// // 註冊
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password, email } = req.body;
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "帳號已存在" });
//     }
//     const user = new User({ username, password, email });
//     await user.save();
//     res.status(201).json({
//       userId: user._id,
//       username,
//       email,
//       avatar: user.avatar || "/images/default-avatar.png",
//     });
//   } catch (err) {
//     console.error("註冊錯誤:", err);
//     res.status(500).json({ message: "伺服器錯誤" });
//   }
// });

// // 登入
// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: "帳號不存在" });
//     }
//     if (user.password !== password) {
//       return res.status(400).json({ message: "密碼錯誤" });
//     }
//     res.json({
//       userId: user._id,
//       username,
//       email: user.email,
//       avatar: user.avatar || "/images/default-avatar.png",
//     });
//   } catch (err) {
//     console.error("登入錯誤:", err);
//     res.status(500).json({ message: "伺服器錯誤" });
//   }
// });

// // 搜尋用戶
// router.get("/search", async (req, res) => {
//   try {
//     const { username } = req.query;
//     if (!username) {
//       return res.status(400).json({ message: "請提供用戶名稱" });
//     }
//     const sanitizedUsername = username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     const users = await User.find({
//       username: { $regex: sanitizedUsername, $options: "i" },
//     }).select("username _id avatar");
//     res.json({
//       users: users.map((user) => ({
//         userId: user._id,
//         username: user.username,
//         avatar: user.avatar || "/images/default-avatar.png",
//       })),
//     });
//   } catch (err) {
//     console.error("搜尋用戶錯誤:", err.message, err.stack);
//     res.status(500).json({ message: "伺服器錯誤", error: err.message });
//   }
// });

// // 獲取所有用戶（排行榜，按三隻寵物等級總和排序）
// router.get("/users", async (req, res) => {
//   try {
//     console.log("Fetching all users for leaderboard");
//     const users = await User.aggregate([
//       // 左聯結 pets 集合
//       {
//         $lookup: {
//           from: "pets",
//           localField: "_id",
//           foreignField: "userId",
//           as: "pets",
//         },
//       },
//       // 展開 pets 陣列
//       {
//         $unwind: {
//           path: "$pets",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       // 按 userId 分組，計算等級總和
//       {
//         $group: {
//           _id: "$_id",
//           username: { $first: "$username" },
//           avatar: { $first: "$avatar" },
//           totalLevel: {
//             $sum: {
//               $cond: [
//                 { $ifNull: ["$pets.stats.level", false] },
//                 "$pets.stats.level",
//                 0,
//               ],
//             },
//           },
//         },
//       },
//       // 按 totalLevel 降序排序，次要按 username 升序
//       {
//         $sort: {
//           totalLevel: -1,
//           username: 1,
//         },
//       },
//       // 格式化輸出
//       {
//         $project: {
//           userId: "$_id",
//           username: 1,
//           avatar: { $ifNull: ["$avatar", "/images/default-avatar.png"] },
//           totalLevel: 1,
//         },
//       },
//     ]);

//     res.json(users);
//   } catch (err) {
//     console.error("獲取所有用戶錯誤:", err.message, err.stack);
//     res.status(500).json({ message: "伺服器錯誤" });
//   }
// });

// // 獲取用戶資料
// router.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log("Fetching user with userId:", userId);
//     if (!mongoose.isValidObjectId(userId)) {
//       return res.status(400).json({ message: "無效的 userId" });
//     }
//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "用戶不存在" });
//     }
//     res.json({
//       userId: user._id,
//       username: user.username,
//       email: user.email,
//       avatar: user.avatar || "/images/default-avatar.png",
//     });
//   } catch (err) {
//     console.error("獲取用戶資料錯誤:", err.message, err.stack);
//     res.status(500).json({ message: "伺服器錯誤" });
//   }
// });

// // 更新用戶頭像
// router.put("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { avatar } = req.body;
//     if (!mongoose.isValidObjectId(userId)) {
//       return res.status(400).json({ message: "無效的 userId" });
//     }
//     if (!avatar) {
//       return res.status(400).json({ message: "請提供頭像路徑" });
//     }
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "用戶不存在" });
//     }
//     user.avatar = avatar;
//     await user.save();
//     res.json({
//       userId: user._id,
//       username: user.username,
//       email: user.email,
//       avatar: user.avatar,
//     });
//   } catch (err) {
//     console.error("更新頭像錯誤:", err.message, err.stack);
//     res.status(500).json({ message: "伺服器錯誤" });
//   }
// });

// module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const router = express.Router();

// 註冊
router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "帳號已存在" });
    }
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json({
      userId: user._id,
      username,
      email,
      avatar: user.avatar || "/images/default-avatar.png",
    });
  } catch (err) {
    console.error("註冊錯誤:", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 登入
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "帳號不存在" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "密碼錯誤" });
    }
    res.json({
      userId: user._id,
      username,
      email: user.email,
      avatar: user.avatar || "/images/default-avatar.png",
    });
  } catch (err) {
    console.error("登入錯誤:", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 搜尋用戶
router.get("/search", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: "請提供用戶名稱" });
    }
    const sanitizedUsername = username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const users = await User.find({
      username: { $regex: sanitizedUsername, $options: "i" },
    }).select("username _id avatar");
    res.json({
      users: users.map((user) => ({
        userId: user._id,
        username: user.username,
        avatar: user.avatar || "/images/default-avatar.png",
      })),
    });
  } catch (err) {
    console.error("搜尋用戶錯誤:", err.message, err.stack);
    res.status(500).json({ message: "伺服器錯誤", error: err.message });
  }
});

// 獲取所有用戶（排行榜，按三隻寵物等級總和排序）
router.get("/users", async (req, res) => {
  try {
    console.log("Fetching all users for leaderboard");
    const users = await User.aggregate([
      // 左聯結 pets 集合
      {
        $lookup: {
          from: "pets",
          localField: "_id",
          foreignField: "userId",
          as: "petData",
        },
      },
      // 展開 petData 陣列
      {
        $unwind: {
          path: "$petData",
          preserveNullAndEmptyArrays: true,
        },
      },
      // 將 pets Map 轉為陣列並展開
      {
        $addFields: {
          petsArray: {
            $objectToArray: { $ifNull: ["$petData.pets", {}] },
          },
        },
      },
      {
        $unwind: {
          path: "$petsArray",
          preserveNullAndEmptyArrays: true,
        },
      },
      // 按 userId 分組，計算三種寵物的等級總和
      {
        $group: {
          _id: "$_id",
          username: { $first: "$username" },
          avatar: { $first: "$avatar" },
          totalLevel: {
            $sum: {
              $cond: [
                { $ifNull: ["$petsArray.v.stats.level", false] },
                "$petsArray.v.stats.level",
                0,
              ],
            },
          },
        },
      },
      // 按 totalLevel 降序排序，次要按 username 升序
      {
        $sort: {
          totalLevel: -1,
          username: 1,
        },
      },
      // 格式化輸出
      {
        $project: {
          userId: "$_id",
          username: 1,
          avatar: { $ifNull: ["$avatar", "/images/default-avatar.png"] },
          totalLevel: 1,
        },
      },
    ]);

    console.log("Leaderboard fetched:", users);
    res.json(users);
  } catch (err) {
    console.error("獲取所有 W戶錯誤:", err.message, err.stack);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 獲取用戶資料
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching user with userId:", userId);
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "無效的 userId" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "用戶不存在" });
    }
    res.json({
      userId: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar || "/images/default-avatar.png",
    });
  } catch (err) {
    console.error("獲取用戶資料錯誤:", err.message, err.stack);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 更新用戶頭像
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { avatar } = req.body;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "無效的 userId" });
    }
    if (!avatar) {
      return res.status(400).json({ message: "請提供頭像路徑" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "用戶不存在" });
    }
    user.avatar = avatar;
    await user.save();
    res.json({
      userId: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error("更新頭像錯誤:", err.message, err.stack);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

module.exports = router;