// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchLeaderboard } from "../store/rankSlice";
// import { fetchFriends } from "../store/socialSlice";
// import FriendCard from "../components/FriendCard";
// import "./SocialStyle/SocialHubPage.css";

// const RankPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user.data);
//   const { leaderboard, loading, error } = useSelector((state) => state.rank);
//   const { friends } = useSelector((state) => state.social);
//   const { userId } = useParams();
//   const currentUser = useSelector((state) => state.user.data);
//   const userRank =
//     leaderboard.findIndex(
//       (entry) => entry.userId === (userId || currentUser?._id)
//     ) + 1;
//   useEffect(() => {
//     console.log("RankPage - Current user:", user);
//     if (user?._id) {
//       dispatch(fetchLeaderboard());
//       dispatch(fetchFriends(user._id));
//     }
//   }, [dispatch, user]);

//   if (!user) {
//     navigate("/login");
//     return null;
//   }

//   return (
//     <div className="friend-page">
//       <div className="top-left-icons-social">
//         <button className="icon-button" onClick={() => navigate("/home")}>
//           <img src="/images/back-arrow.png" alt="回首頁" className="icon-img" />
//         </button>
//       </div>
//       <div className="rankBoard">
//         <div className="friend-list-container">
//           {loading && <p>載入中...</p>}
//           {error && <p className="error">錯誤: {error}</p>}
//           <div className="friend-list">
//             {leaderboard.map((entry, index) => (
//               <div key={entry.userId} className="rank-entry">
//                 {index === 0 ? (
//                   <img
//                     src="/images/gold-medal.png"
//                     alt="第1名"
//                     className="rank-number-img"
//                   />
//                 ) : index === 1 ? (
//                   <img
//                     src="/images/silver-medal.png"
//                     alt="第2名"
//                     className="rank-number-img"
//                   />
//                 ) : index === 2 ? (
//                   <img
//                     src="/images/bronze-medal.png"
//                     alt="第3名"
//                     className="rank-number-img"
//                   />
//                 ) : (
//                   <p className="rank-number">#{index + 1}</p>
//                 )}
//                 <FriendCard
//                   friend={entry}
//                   onClick={() => navigate(`/profile/${entry.userId}`)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="currnet-rank">
//           <img src="/images/rankBox.png" alt="my-rankBox" />
//           <p>{userRank > 0 ? `#${userRank}` : "未上榜"}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RankPage;
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLeaderboard } from "../store/rankSlice";
import { fetchFriends } from "../store/socialSlice";
import FriendCard from "../components/FriendCard";
import "./SocialStyle/SocialHubPage.css";

const RankPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const { leaderboard, loading, error } = useSelector((state) => state.rank);
  const { friends } = useSelector((state) => state.social);
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.user.data);
  const userRank =
    leaderboard.findIndex(
      (entry) => entry.userId === (userId || currentUser?._id)
    ) + 1;

  useEffect(() => {
    console.log("RankPage - Current user:", user);
    if (user?._id) {
      dispatch(fetchLeaderboard());
      dispatch(fetchFriends(user._id));
    }
  }, [dispatch, user]);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="friend-page">
      <div className="top-left-icons-social">
        <button className="icon-button" onClick={() => navigate("/home")}>
          <img src="/images/back-arrow.png" alt="回首頁" className="icon-img" />
        </button>
      </div>
      <div className="rankBoard">
        <div className="friend-list-container">
          {loading && <p>載入中...</p>}
          {error && <p className="error">錯誤: {error}</p>}
          <div className="friend-list">
            {leaderboard.map((entry, index) => (
              <div key={entry.userId} className="rank-entry">
                {index === 0 ? (
                  <img
                    src="/images/gold-medal.png"
                    alt="第1名"
                    className="rank-number-img"
                  />
                ) : index === 1 ? (
                  <img
                    src="/images/silver-medal.png"
                    alt="第2名"
                    className="rank-number-img"
                  />
                ) : index === 2 ? (
                  <img
                    src="/images/bronze-medal.png"
                    alt="第3名"
                    className="rank-number-img"
                  />
                ) : (
                  <p className="rank-number">#{index + 1}</p>
                )}
                <FriendCard
                  friend={{ ...entry, totalLevel: entry.totalLevel }}
                  onClick={() => navigate(`/profile/${entry.userId}`)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="currnet-rank">
          <img src="/images/rankBox.png" alt="my-rankBox" />
          <p>{userRank > 0 ? `#${userRank}` : "未上榜"}</p>
        </div>
      </div>
    </div>
  );
};

export default RankPage;
