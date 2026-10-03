import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 從後端獲取用戶資料
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "無法獲取用戶資料");
    }
  }
);

// 本地註冊
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/user/register`, {
        username,
        password,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "註冊失敗");
    }
  }
);

// 本地登入
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/user/login`, {
        username,
        password,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "登入失敗");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    textSpeed: 50,
    volume: 50,
    audioInitialized: false,
    showSettings: false,
    showMenu: false,
    storyState: {
      currentDialogueIndex: 0,
      displayedText: "",
      isTyping: false,
      showChoices: false,
      characters: [],
      fadeIn: false,
      fadeOut: false,
      currentBackground: "",
      showIntro: true,
      isAutoPlay: false,
      showLog: false,
      storyRewards: { expReward: 0, levelReward: 0, emotionReward: 0 },
    },
    petStats: null,
    loading: false,
    error: null,
    hasShownTutorial: false, // 新增全局狀態
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.data = null;
      state.audioInitialized = false;
      state.showSettings = false;
      state.showMenu = false;
      state.petStats = null;
      localStorage.removeItem("user");
      state.storyState = {
        currentDialogueIndex: 0,
        displayedText: "",
        isTyping: false,
        showChoices: false,
        characters: [],
        fadeIn: false,
        fadeOut: false,
        currentBackground: "",
        showIntro: true,
        isAutoPlay: false,
        showLog: false,
        storyRewards: { expReward: 0, levelReward: 0, emotionReward: 0 },
      };
      state.hasShownTutorial = false; // 登出時重置教程狀態
    },
    setTextSpeed: (state, action) => {
      state.textSpeed = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setAudioInitialized: (state, action) => {
      state.audioInitialized = action.payload;
    },
    setShowSettings: (state, action) => {
      state.showSettings = action.payload;
    },
    setShowMenu: (state, action) => {
      state.showMenu = action.payload;
    },
    setStoryState: (state, action) => {
      state.storyState = { ...state.storyState, ...action.payload };
    },
    setPetStats: (state, action) => {
      state.petStats = action.payload;
    },
    resetStoryState: (state) => {
      state.storyState = {
        currentDialogueIndex: 0,
        displayedText: "",
        isTyping: false,
        showChoices: false,
        characters: [],
        fadeIn: false,
        fadeOut: false,
        currentBackground: "",
        showIntro: true,
        isAutoPlay: false,
        showLog: false,
        storyRewards: { expReward: 0, levelReward: 0, emotionReward: 0 },
      };
    },
    initializeUser: (state) => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        state.data = JSON.parse(savedUser);
      }
    },
    setHasShownTutorial: (state, action) => {
      state.hasShownTutorial = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        const userData = {
          _id: action.payload.userId,
          username: action.payload.username,
          email: action.payload.email,
          avatar: action.payload.avatar,
        };
        state.data = userData;
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const userData = {
          _id: action.payload.userId,
          username: action.payload.username,
          email: action.payload.email,
          avatar: action.payload.avatar,
        };
        state.data = userData;
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login payload:", action.payload);
        state.loading = false;
        const userData = {
          _id: action.payload.userId,
          username: action.payload.username,
          email: action.payload.email,
          avatar: action.payload.avatar,
        };
        state.data = userData;
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setUser,
  clearUser,
  setTextSpeed,
  setVolume,
  setAudioInitialized,
  setShowSettings,
  setShowMenu,
  setStoryState,
  setPetStats,
  resetStoryState,
  initializeUser,
  setHasShownTutorial,
} = userSlice.actions;
export default userSlice.reducer;
