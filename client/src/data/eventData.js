// src/data/eventData.js
import nekoChapter01 from "./nekoEvents/chapter01Event";
import nekoChapter02 from "./nekoEvents/chapter02Event";
import nekoChapter03 from "./nekoEvents/chapter03Event";
import nekoChapter04 from "./nekoEvents/chapter04Event";
import puppyChapter01 from "./puppyEvents/chapter01Event";
import parrotChapter01 from "./parrotEvents/chapter01Event";
// import puppyChapter01 from "./puppyEvents/chapter01Event";
// import parrotChapter01 from "./parrotEvents/chapter01Event";

const eventData = {
  neko: [
    nekoChapter01, // index 0 = 第一個事件
    nekoChapter02, // index 1 = 第二個事件
    nekoChapter03,
    nekoChapter04,
  ],
  puppy: [
    puppyChapter01,
    // puppyChapter01,
    // 可以添加更多事件
  ],
  parrot: [
    parrotChapter01,
    // parrotChapter01,
  ],
  default: [
    // 默認使用 neko 事件
    nekoChapter01, // index 0 = 第一個事件
    nekoChapter02, // index 1 = 第二個事件
    nekoChapter03,
    nekoChapter04,
  ],
};

export default eventData;
