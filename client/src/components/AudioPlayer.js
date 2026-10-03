import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const AudioPlayer = ({ audioSrc }) => {
  const { volume } = useSelector((state) => state.user);
  const audioRef = useRef(null);

  // 當音量改變時更新
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // 初始化音頻元素
  useEffect(() => {
    if (audioRef.current) {
      // 設置循環播放
      audioRef.current.loop = true;
      // 設置初始音量
      audioRef.current.volume = volume / 100;

      // 嘗試自動播放（注意：許多瀏覽器會阻止自動播放）
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("播放被暫停，需要用戶交互才能播放：", error);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={audioSrc}
      preload="auto"
      style={{ display: "none" }} // 隱藏音頻元素
    />
  );
};

export default AudioPlayer;
