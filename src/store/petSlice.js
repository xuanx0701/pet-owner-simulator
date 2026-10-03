// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchPetData = createAsyncThunk(
//   "pet/fetchPetData",
//   async (userId, { rejectWithValue }) => {
//     try {
//       console.log(`[fetchPetData] Fetching pet data for userId: ${userId}`);
//       const res = await axios.get(`http://localhost:5000/api/pet/${userId}`);
//       console.log(`[fetchPetData] Pet data fetched successfully:`, res.data);
//       return res.data;
//     } catch (err) {
//       console.error("[fetchPetData] Error:", err);
//       if (err.response?.status === 404) {
//         console.log(
//           `[fetchPetData] No pet data found for userId: ${userId}, returning default`
//         );
//         return { pets: {}, lastActivePet: "neko" };
//       }
//       return rejectWithValue(err.response?.data?.message || "無法獲取寵物數據");
//     }
//   }
// );

// export const updatePetData = createAsyncThunk(
//   "pet/updatePetData",
//   async ({ userId, petType, petData, lastActivePet }, { rejectWithValue }) => {
//     try {
//       console.log(
//         `[updatePetData] Updating pet data for userId: ${userId}, petType: ${petType}`,
//         petData
//       );
//       const res = await axios.post(`http://localhost:5000/api/pet/${userId}`, {
//         petType,
//         petData,
//         lastActivePet,
//       });
//       console.log(`[updatePetData] Pet data updated successfully:`, res.data);
//       return res.data;
//     } catch (err) {
//       console.error("[updatePetData] Error:", err);
//       return rejectWithValue(err.response?.data?.message || "無法更新寵物數據");
//     }
//   }
// );

// export const deletePetData = createAsyncThunk(
//   "pet/deletePetData",
//   async ({ userId, petType }, { rejectWithValue }) => {
//     try {
//       console.log(
//         `[deletePetData] Deleting pet ${petType} for userId: ${userId}`
//       );
//       await axios.delete(`http://localhost:5000/api/pet/${userId}/${petType}`);
//       console.log(`[deletePetData] Pet ${petType} deleted successfully`);
//       return { petType };
//     } catch (err) {
//       console.error("[deletePetData] Error:", err);
//       return rejectWithValue(err.response?.data?.message || "無法刪除寵物數據");
//     }
//   }
// );

// const petSlice = createSlice({
//   name: "pet",
//   initialState: {
//     data: { pets: {}, lastActivePet: "neko" },
//     currentPetType: "neko",
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setPetData: (state, action) => {
//       state.data = action.payload;
//     },
//     setCurrentPetType: (state, action) => {
//       state.currentPetType = action.payload;
//     },
//     clearPet: (state) => {
//       state.data = { pets: {}, lastActivePet: "neko" };
//       state.currentPetType = "neko";
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPetData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPetData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload || { pets: {}, lastActivePet: "neko" };
//         state.currentPetType = action.payload.lastActivePet || "neko";
//         state.error = null;
//       })
//       .addCase(fetchPetData.rejected, (state, action) => {
//         state.loading = false;
//         state.data = { pets: {}, lastActivePet: "neko" };
//         state.currentPetType = "neko";
//         state.error = action.payload;
//       })
//       .addCase(updatePetData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updatePetData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload || state.data;
//         state.currentPetType =
//           action.payload.lastActivePet || state.currentPetType;
//         state.error = null;
//       })
//       .addCase(updatePetData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deletePetData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deletePetData.fulfilled, (state, action) => {
//         state.loading = false;
//         if (state.data && state.data.pets) {
//           delete state.data.pets[action.payload.petType];
//           state.currentPetType = state.data.lastActivePet || "neko";
//         }
//         state.error = null;
//       })
//       .addCase(deletePetData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setPetData, setCurrentPetType, clearPet } = petSlice.actions;
// export default petSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPetData = createAsyncThunk(
  "pet/fetchPetData",
  async (userId, { rejectWithValue }) => {
    try {
      console.log(`[fetchPetData] Fetching pet data for userId: ${userId}`);
      const res = await axios.get(`http://localhost:5000/api/pet/${userId}`);
      console.log(`[fetchPetData] Pet data fetched successfully:`, res.data);
      return res.data;
    } catch (err) {
      console.error("[fetchPetData] Error:", err);
      if (err.response?.status === 404) {
        console.log(
          `[fetchPetData] No pet data found for userId: ${userId}, returning default`
        );
        return { pets: {}, lastActivePet: "neko" };
      }
      return rejectWithValue(err.response?.data?.message || "無法獲取寵物數據");
    }
  }
);

export const updatePetData = createAsyncThunk(
  "pet/updatePetData",
  async ({ userId, petType, petData, lastActivePet }, { rejectWithValue }) => {
    try {
      console.log(
        `[updatePetData] Updating pet data for userId: ${userId}, petType: ${petType}`,
        petData
      );
      const res = await axios.post(`http://localhost:5000/api/pet/${userId}`, {
        petType,
        petData,
        lastActivePet,
      });
      console.log(`[updatePetData] Pet data updated successfully:`, res.data);
      return res.data;
    } catch (err) {
      console.error("[updatePetData] Error:", err);
      return rejectWithValue(err.response?.data?.message || "無法更新寵物數據");
    }
  }
);

export const deletePetData = createAsyncThunk(
  "pet/deletePetData",
  async ({ userId, petType }, { rejectWithValue }) => {
    try {
      console.log(
        `[deletePetData] Deleting pet ${petType} for userId: ${userId}`
      );
      await axios.delete(`http://localhost:5000/api/pet/${userId}/${petType}`);
      console.log(`[deletePetData] Pet ${petType} deleted successfully`);
      return { petType };
    } catch (err) {
      console.error("[deletePetData] Error:", err);
      return rejectWithValue(err.response?.data?.message || "無法刪除寵物數據");
    }
  }
);

const petSlice = createSlice({
  name: "pet",
  initialState: {
    data: { pets: {}, lastActivePet: "neko" },
    currentPetType: "neko",
    loading: false,
    error: null,
  },
  reducers: {
    setPetData: (state, action) => {
      console.log("[setPetData] Setting pet data:", action.payload);
      state.data = action.payload;
    },
    setCurrentPetType: (state, action) => {
      console.log(
        "[setCurrentPetType] Setting currentPetType:",
        action.payload
      );
      state.currentPetType = action.payload;
    },
    clearPet: (state) => {
      console.log("[clearPet] Clearing pet data");
      state.data = { pets: {}, lastActivePet: "neko" };
      state.currentPetType = "neko";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetData.pending, (state) => {
        console.log("[fetchPetData.pending] Loading pet data");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetData.fulfilled, (state, action) => {
        console.log(
          "[fetchPetData.fulfilled] Pet data loaded:",
          action.payload
        );
        state.loading = false;
        state.data = action.payload || { pets: {}, lastActivePet: "neko" };
        state.currentPetType = action.payload.lastActivePet || "neko";
        state.error = null;
      })
      .addCase(fetchPetData.rejected, (state, action) => {
        console.log("[fetchPetData.rejected] Error:", action.payload);
        state.loading = false;
        state.data = { pets: {}, lastActivePet: "neko" };
        state.currentPetType = "neko";
        state.error = action.payload;
      })
      .addCase(updatePetData.pending, (state) => {
        console.log("[updatePetData.pending] Updating pet data");
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePetData.fulfilled, (state, action) => {
        console.log(
          "[updatePetData.fulfilled] Pet data updated:",
          action.payload
        );
        state.loading = false;
        state.data = action.payload || state.data;
        state.currentPetType =
          action.payload.lastActivePet || state.currentPetType;
        state.error = null;
      })
      .addCase(updatePetData.rejected, (state, action) => {
        console.log("[updatePetData.rejected] Error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePetData.pending, (state) => {
        console.log("[deletePetData.pending] Deleting pet data");
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePetData.fulfilled, (state, action) => {
        console.log("[deletePetData.fulfilled] Pet deleted:", action.payload);
        state.loading = false;
        if (state.data && state.data.pets) {
          delete state.data.pets[action.payload.petType];
          state.currentPetType = state.data.lastActivePet || "neko";
        }
        state.error = null;
      })
      .addCase(deletePetData.rejected, (state, action) => {
        console.log("[deletePetData.rejected] Error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPetData, setCurrentPetType, clearPet } = petSlice.actions;
export default petSlice.reducer;
