const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const userRoutes = require("./routes/user");
const petRoutes = require("./routes/pet");
const socialRoutes = require("./routes/social");
const cgRoutes = require("./routes/cg"); // 新增 CG 路由
const storyRoutes = require("./routes/story"); // 新增 story 路由

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 中間件
app.use(cors());
app.use(express.json());

// 連接到 MongoDB
mongoose
  .connect("mongodb://localhost:27017/pet_simulator", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB 已連線"))
  .catch((err) => console.error("MongoDB 連線失敗:", err));

// 路由
app.use("/api/user", userRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/cg", cgRoutes); // 新增 CG 路由
app.use("/api/story", storyRoutes); // 新增 story 路由

// WebSocket 處理
const onlineUsers = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    onlineUsers.set(userId, socket.id);
    io.emit("friendStatus", { userId, status: "online" });
  }

  socket.on("updateStatus", (status) => {
    if (userId) {
      io.emit("friendStatus", { userId, status });
    }
  });

  socket.on("disconnect", () => {
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("friendStatus", { userId, status: "offline" });
    }
  });
});

// 啟動伺服器
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`伺服器運行於端口 ${PORT}`));
