// src/services/SocketService.js
import io from "socket.io-client";
import store from "../store";
import { updateFriendStatus } from "../store/socialSlice";

class SocketService {
  socket = null;

  init(userId) {
    this.socket = io("http://localhost:5000", {
      query: { userId },
    });

    this.socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    this.socket.on("friendStatus", ({ userId, status }) => {
      store.dispatch(updateFriendStatus({ userId, status }));
    });

    this.socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  updateStatus(status) {
    if (this.socket) {
      this.socket.emit("updateStatus", status);
    }
  }
}

export default new SocketService();
