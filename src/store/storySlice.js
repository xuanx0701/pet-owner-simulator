import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 獲取玩家的劇情進度
export const fetchStoryProgress = createAsyncThunk(
  "story/fetchStoryProgress",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/story/${userId}`);
      return res.data;
    } catch (err) {
      console.error("獲取劇情進度失敗:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "無法獲取劇情進度");
    }
  }
);

// 儲存或更新劇情進度
export const updateStoryProgress = createAsyncThunk(
  "story/updateStoryProgress",
  async (progressData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/story`,
        progressData
      );
      return res.data;
    } catch (err) {
      console.error("儲存劇情進度失敗:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "無法儲存劇情進度");
    }
  }
);

const storySlice = createSlice({
  name: "story",
  initialState: {
    progress: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearStoryProgress: (state) => {
      state.progress = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoryProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoryProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchStoryProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStoryProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStoryProgress.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProgress = action.payload;
        const index = state.progress.findIndex(
          (p) =>
            p.userId === updatedProgress.userId &&
            p.petType === updatedProgress.petType &&
            p.chapterIndex === updatedProgress.chapterIndex
        );
        if (index !== -1) {
          state.progress[index] = updatedProgress;
        } else {
          state.progress.push(updatedProgress);
        }
      })
      .addCase(updateStoryProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStoryProgress } = storySlice.actions;
export default storySlice.reducer;
