import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowSettings, setAudioInitialized } from "../store/userSlice";
import { fetchPetData } from "../store/petSlice";
import "./style/style.css";
import SettingsModal from "../components/SettingsModal";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { audioInitialized, data: user } = useSelector((state) => state.user);
  const audioRef = useRef(null);

  // 尋找全局音頻元素
  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    console.log("Audio element:", audioRef.current);
  }, []);

  // 在用戶登入後獲取寵物數據
  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchPetData(user.userId));
      navigate("/home");
    }
  }, [user, dispatch, navigate]);

  // 初始化音頻播放的函數
  const initializeAudio = () => {
    if (audioRef.current && !audioInitialized) {
      console.log("Attempting to play audio");
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("音頻播放成功");
            dispatch(setAudioInitialized(true));
          })
          .catch((error) => {
            console.log("無法自動播放音頻:", error);
          });
      }
    }
  };

  // 處理設定按鈕點擊
  const handleSettingsClick = () => {
    console.log("Settings button clicked");
    initializeAudio();
    dispatch(setShowSettings(true));
    console.log("Dispatched setShowSettings(true)");
  };

  // 處理公告按鈕點擊
  const handleAnnounceClick = () => {
    initializeAudio();
    navigate("/bulletin");
  };

  // 處理登入按鈕點擊
  const handleLoginClick = () => {
    initializeAudio();
    navigate("/login");
  };

  // 在頁面點擊時也嘗試初始化音頻
  const handlePageClick = () => {
    initializeAudio();
  };

  return (
    <div onClick={handlePageClick}>
      {/* 左上角按鈕區 */}
      <div className="top-left-icons">
        <button className="icon-button" onClick={handleSettingsClick}>
          <img src="/images/setting.png" alt="設定" className="icon-img" />
        </button>
        <button className="icon-button" onClick={handleAnnounceClick}>
          <img src="/images/announce.png" alt="公告" className="icon-img" />
        </button>
      </div>

      <div className="animals">
        <div className="pattern">
          <div className="login">
            <img src="/images/craw.png" alt="craw" className="craw" />
            <div className="google-login-button">
              <img
                src="/images/login.png"
                alt="登入"
                className="google-icon"
                onClick={handleLoginClick}
              />
            </div>
          </div>
        </div>
        <div className="pattern">
          <img src="/images/dog-shadow.png" alt="puppy" className="puppy" />
        </div>
        <div className="pattern">
          <img
            src="/images/parrot-shadow.png"
            alt="parrot"
            className="parrot"
          />
        </div>
        <div className="pattern">
          <img src="/images/neko-shadow.png" alt="neko" className="neko" />
        </div>
      </div>

      {/* 設定 Modal，LoginPage 不需要登出功能 */}
      <SettingsModal showLogout={false} />
    </div>
  );
};

export default LoginPage;
