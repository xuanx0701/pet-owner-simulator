// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import petReducer from "./petSlice";
import userReducer from "./userSlice";
import socialReducer from "./socialSlice"; // 🆕
import rankReducer from "./rankSlice"; // 🆕
import cgReducer from "./cgSlice"; // 新增 cgSlice
import storyReducer from "./storySlice"; // 新增 storySlice
const store = configureStore({
  reducer: {
    pet: petReducer,
    user: userReducer,
    social: socialReducer, // 🆕 加入 social reducer
    rank: rankReducer,
    cg: cgReducer, // 加入 cg reducer
    story: storyReducer, // 加入 story reducer
  },
});

export default store;
