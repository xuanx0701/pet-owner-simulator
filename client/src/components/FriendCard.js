// import React from "react";
// import "./FriendCard.css";

// const FriendCard = ({ friend, onClick }) => {
//   return (
//     <div
//       className="friend-card"
//       onClick={onClick}
//       style={{ cursor: "pointer" }}
//     >
//       <div className="avatar">
//         <img
//           src={friend.avatar || "/images/default-avatar.png"}
//           alt={friend.username}
//         />
//       </div>
//       <div className="info">
//         <span className="username">{friend.username}</span>
//       </div>
//       <div className="home-icon">
//         <img src="/images/home1.png" alt="Home" />
//       </div>
//     </div>
//   );
// };

// export default FriendCard;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFriend } from "../store/socialSlice";
import "./FriendCard.css";

const FriendCard = ({ friend, onClick }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.data);
  const friends = useSelector((state) => state.social.friends);
  const isFriend = friends.some((f) => f.userId === friend.userId);
  const isOwnProfile = currentUser?._id === friend.userId;

  const handleAddFriend = async (e) => {
    e.stopPropagation(); // 防止觸發卡片的 onClick
    try {
      await dispatch(
        addFriend({ userId: currentUser._id, friendId: friend.userId })
      ).unwrap();
      alert(`${friend.username} 已成功添加為好友！`);
    } catch (err) {
      alert(`添加好友失敗：${err}`);
    }
  };

  return (
    <div
      className="friend-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="avatar">
        <img
          src={friend.avatar || "/images/default-avatar.png"}
          alt={friend.username}
        />
      </div>
      <div className="info">
        <span className="username">{friend.username}</span>
      </div>
      <div className="actions">
        {!isFriend && !isOwnProfile ? (
          <button className="add-friend-button" onClick={handleAddFriend}>
            <img src="/images/addFriend.png" alt="添加好友" />
          </button>
        ) : (
          <button className="add-friend-button">
            <img src="/images/home1.png" alt="添加好友" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
