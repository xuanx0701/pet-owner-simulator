import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearUser,
  setTextSpeed,
  setVolume,
  setShowSettings,
} from "../store/userSlice";
import { clearPet } from "../store/petSlice";
import { clearSocial } from "../store/socialSlice";
import SocketService from "../services/SocketService";
import "./style/style.css";

const SettingsModal = ({ showLogout = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { textSpeed, volume, showSettings } = useSelector(
    (state) => state.user
  );
  console.log("SettingsModal: showSettings =", showSettings);

  const handleTextSpeedChange = (e) => {
    dispatch(setTextSpeed(parseInt(e.target.value)));
  };

  const handleVolumeChange = (e) => {
    dispatch(setVolume(parseInt(e.target.value)));
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearPet());
    dispatch(clearSocial());
    SocketService.disconnect();
    navigate("/");
  };

  const handleClose = () => {
    dispatch(setShowSettings(false));
    console.log("Dispatched setShowSettings(false)");
  };

  return (
    <>
      {showSettings && (
        <>
          <div
            className={`modal-overlay ${showSettings ? "active" : ""}`}
            onClick={handleClose}
          />
          <div className={`modal-panel ${showSettings ? "active" : ""}`}>
            <img
              src="/images/settingBg.png"
              alt="設定背景"
              className="settingBg"
            />
            <div className="setting-items">
              {/* 文字速度 */}
              <div className="setting-item">
                <p>x1.00</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={textSpeed}
                  onChange={handleTextSpeedChange}
                />
                <p>x2.00</p>
              </div>

              {/* 音量調整 */}
              <div className="setting-item">
                <p>0%</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                />
                <p>100%</p>
              </div>
            </div>

            {/* 登出按鈕 */}
            {showLogout && (
              <button onClick={handleLogout} className="logout-btn">
                <img src="/images/settingLogOut.png" alt="登出" />
              </button>
            )}

            <button onClick={handleClose} className="close-btn">
              <img src="/images/settingClosed.png" alt="關掉設定" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SettingsModal;
