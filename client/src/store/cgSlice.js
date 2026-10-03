import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 獲取使用者的 CG 紀錄
export const fetchCGs = createAsyncThunk(
  "cg/fetchCGs",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cg/${userId}`);
      return res.data;
    } catch (err) {
      console.error("獲取 CG 紀錄失敗:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "無法獲取 CG 紀錄");
    }
  }
);

// 儲存解鎖的 CG
export const unlockCG = createAsyncThunk(
  "cg/unlockCG",
  async (cgData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/cg`, cgData);
      return res.data;
    } catch (err) {
      console.error("儲存 CG 失敗:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "無法儲存 CG");
    }
  }
);

const cgSlice = createSlice({
  name: "cg",
  initialState: {
    cgs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCGs: (state) => {
      state.cgs = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCGs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCGs.fulfilled, (state, action) => {
        state.loading = false;
        state.cgs = action.payload;
      })
      .addCase(fetchCGs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unlockCG.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlockCG.fulfilled, (state, action) => {
        state.loading = false;
        state.cgs.push(action.payload);
      })
      .addCase(unlockCG.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCGs } = cgSlice.actions;
export default cgSlice.reducer;
