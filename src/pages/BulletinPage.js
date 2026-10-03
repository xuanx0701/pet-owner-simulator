// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setShowSettings, setShowMenu } from "../store/userSlice"; // 導入 Redux actions
// import "./bulletinStyle/bulletin.css";

// const BulletinPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { data: user } = useSelector((state) => state.user); // 從 Redux 獲取狀態

//   const handleBack = () => {
//     navigate(-1); // 返回上一頁
//   };

//   const returnHome = () => {
//     if (user) {
//       navigate("/home");
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <div className="bulletin-container">
//       <div className="top-left-icons-bulletin">
//         <button className="icon-button" onClick={() => returnHome()}>
//           <img src="/images/back-arrow.png" alt="回首頁" className="icon-img" />
//         </button>
//       </div>
//       <div className="bulletin">
//         <div className="team">
//           <h3 className="team-title">喔氣棄棄棄棄！團隊公告</h3>
//           <div className="text">
//             近期團隊更新了飼主模擬器最新版本!!請大家一起享受更有趣及豐富的遊戲體驗!!
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
//             sunt nesciunt, numquam quasi sint delectus eaque, ab ea, quae
//             voluptatum dolore tempora similique natus vero reprehenderit
//             pariatur ipsam suscipit nostrum veniam laudantium maxime. Natus
//             ullam repellendus eius tempora odit recusandae dignissimos
//             consequatur sint deserunt dolorum velit doloribus, temporibus
//             similique modi placeat quo id! Sint repellendus minus ipsam fuga!
//             Error esse aperiam iusto facilis, quas dolores tempora consectetur!
//             Eligendi velit aut ipsum magnam omnis laboriosam id, veniam
//             molestias consequuntur. Vitae mollitia incidunt eveniet iusto unde
//             odio expedita, repellat laborum ut itaque quae asperiores, sunt
//             rerum fugit? Corrupti quis et velit quas.
//           </div>
//         </div>
//         <div className="idea">
//           <h3 className="team-title">設計團隊理念</h3>
//           <div className="text">
//             我們的目標是藉由讓玩家體驗遊戲「飼主模擬器」的方式，讓大眾理解，若在飼養寵物的過程中遇見困難，作為飼主可以選擇如何應對，以及隨意棄養會造成的可能後果，從而引起他們對提高社會對寵物棄養問題的認識和關注。除了遊戲劇情可以宣傳不棄養的理念外，模擬養成的設定更能讓玩家了解如何成為更好的飼主。
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulletinPage;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowSettings, setShowMenu } from "../store/userSlice"; // 導入 Redux actions
import "./bulletinStyle/bulletin.css";

const BulletinPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user); // 從 Redux 獲取狀態

  const handleBack = () => {
    navigate(-1); // 返回上一頁
  };

  const returnHome = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bulletin-container">
      <div className="top-left-icons-bulletin">
        <button className="icon-button" onClick={() => returnHome()}>
          <img src="/images/back-arrow.png" alt="回首頁" className="icon-img" />
        </button>
      </div>
      <div className="bulletin">
        <div className="scroll-container">
          <div className="team">
            <h3 className="team-title">喔氣棄棄棄棄！團隊公告</h3>
            <div className="text">
              近期團隊更新了飼主模擬器最新版本!!請大家一起享受更有趣及豐富的遊戲體驗!!
            </div>
          </div>
          <div className="idea">
            <h3 className="team-title">設計團隊理念</h3>
            <div className="text">
              我們的目標是藉由讓玩家體驗遊戲「飼主模擬器」的方式，讓大眾理解，若在飼養寵物的過程中遇見困難，作為飼主可以選擇如何應對，以及隨意棄養會造成的可能後果，從而引起他們對提高社會對寵物棄養問題的認識和關注。除了遊戲劇情可以宣傳不棄養的理念外，模擬養成的設定更能讓玩家了解如何成為更好的飼主。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinPage;
