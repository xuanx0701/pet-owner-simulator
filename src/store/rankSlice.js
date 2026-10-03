// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // 獲取排行榜（所有用戶）
// export const fetchLeaderboard = createAsyncThunk(
//   "rank/fetchLeaderboard",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/user/users");
//       console.log("fetchLeaderboard - Response:", res.data); // 添加日誌
//       return res.data;
//     } catch (err) {
//       console.error("fetchLeaderboard - Error:", err.response?.data);
//       return rejectWithValue(err.response?.data?.message || "無法獲取排行榜");
//     }
//   }
// );

// const rankSlice = createSlice({
//   name: "rank",
//   initialState: {
//     leaderboard: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearLeaderboard: (state) => {
//       state.leaderboard = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeaderboard.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchLeaderboard.fulfilled, (state, action) => {
//         state.loading = false;
//         state.leaderboard = action.payload;
//       })
//       .addCase(fetchLeaderboard.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearLeaderboard } = rankSlice.actions;
// export default rankSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 獲取排行榜（所有用戶，按寵物等級總和排序）
export const fetchLeaderboard = createAsyncThunk(
  "rank/fetchLeaderboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/users");
      console.log("fetchLeaderboard - Response:", res.data);
      return res.data;
    } catch (err) {
      console.error("fetchLeaderboard - Error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "無法獲取排行榜");
    }
  }
);

const rankSlice = createSlice({
  name: "rank",
  initialState: {
    leaderboard: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLeaderboard: (state) => {
      state.leaderboard = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLeaderboard } = rankSlice.actions;
export default rankSlice.reducer;
