// src/store/socialSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 獲取好友列表
export const fetchFriends = createAsyncThunk(
  "social/fetchFriends",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/social/friends/${userId}`
      );
      console.log("fetchFriends - Response:", res.data);
      return res.data;
    } catch (err) {
      console.error("fetchFriends - Error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "無法獲取好友列表");
    }
  }
);

// 添加好友
export const addFriend = createAsyncThunk(
  "social/addFriend",
  async ({ userId, friendId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/social/friends`, {
        userId,
        friendId,
      });
      console.log("addFriend - Response:", res.data);
      return res.data;
    } catch (err) {
      console.error("addFriend - Error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "無法添加好友");
    }
  }
);

// 移除好友
export const removeFriend = createAsyncThunk(
  "social/removeFriend",
  async ({ userId, friendId }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/social/friends`, {
        data: { userId, friendId },
      });
      return friendId;
    } catch (err) {
      console.error("removeFriend - Error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "無法移除好友");
    }
  }
);

const socialSlice = createSlice({
  name: "social",
  initialState: {
    friends: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateFriendStatus: (state, action) => {
      const { userId, status } = action.payload;
      const friend = state.friends.find((f) => f.userId === userId);
      if (friend) {
        friend.status = status;
      }
    },
    clearSocial: (state) => {
      state.friends = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addFriend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.friends.push(action.payload);
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = state.friends.filter(
          (f) => f.userId !== action.payload
        );
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateFriendStatus, clearSocial } = socialSlice.actions;
export default socialSlice.reducer;
