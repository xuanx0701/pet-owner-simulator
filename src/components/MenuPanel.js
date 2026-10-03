// // src/components/MenuPanel.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setShowMenu } from "../store/userSlice";
// import "./menuPanel.css";

// const MenuPanel = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { showMenu } = useSelector((state) => state.user);

//   const goTo = (path) => {
//     navigate(path);
//     dispatch(setShowMenu(false)); // 點擊後關閉選單
//   };

//   const handleClose = () => {
//     dispatch(setShowMenu(false));
//   };

//   return (
//     <>
//       <div
//         className={`side-overlay-menu ${showMenu ? "active" : ""}`}
//         onClick={handleClose}
//       />
//       <div className={`side-panel-menu ${showMenu ? "active" : ""}`}>
//         <h2>📋 Menu</h2>

//         <div className="menu-buttons">
//           <button className="menu-btn" onClick={() => goTo("/bulletin")}>
//             📢 公告
//           </button>
//           <button className="menu-btn" onClick={() => goTo("/profile")}>
//             👤 個人資料
//           </button>
//           <button className="menu-btn" onClick={() => goTo("/social")}>
//             🏆 好友列表
//           </button>
//         </div>

//         <button onClick={handleClose} className="close-btn">
//           關閉
//         </button>
//       </div>
//     </>
//   );
// };

// export default MenuPanel;
// src/components/MenuPanel.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShowMenu, setTextSpeed, setVolume } from "../store/userSlice";
import "./menuPanel.css";

const MenuPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showMenu, textSpeed, volume } = useSelector((state) => state.user);

  const goTo = (path) => {
    navigate(path);
    dispatch(setShowMenu(false)); // 點擊後關閉選單
  };

  const handleClose = () => {
    dispatch(setShowMenu(false));
  };

  const handleTextSpeedChange = (e) => {
    dispatch(setTextSpeed(parseInt(e.target.value)));
  };

  const handleVolumeChange = (e) => {
    dispatch(setVolume(parseInt(e.target.value)));
  };
  const returnHome = () => {
    dispatch(setShowMenu(false));
    navigate("/home");
  };
  return (
    <>
      <div
        className={`side-overlay-menu ${showMenu ? "active" : ""}`}
        onClick={handleClose}
      />
      <div className={`side-panel-menu ${showMenu ? "active" : ""}`}>
        <h2>📋 Menu</h2>

        <div className="setting-items">
          <h2>文字速度</h2>
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
          <h2>音量</h2>
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
        <div className="btns">
          {/* <button onClick={returnHome} className="menu-close-btn">
            回首頁
          </button> */}
          <button onClick={handleClose} className="menu-close-btn">
            關閉
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuPanel;
