// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchPetData } from "../store/petSlice";
// import { fetchLeaderboard } from "../store/rankSlice";
// import { setUser } from "../store/userSlice";
// import { fetchCGs } from "../store/cgSlice"; // 引入 fetchCGs
// import axios from "axios";
// import "./profileStyle/profileStyle.css";

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { userId } = useParams();
//   const currentUser = useSelector((state) => state.user.data);
//   const pet = useSelector((state) => state.pet.data);
//   const petError = useSelector((state) => state.pet.error);
//   const { leaderboard } = useSelector((state) => state.rank);
//   const { cgs } = useSelector((state) => state.cg); // 從 cg slice 獲取 cgs 資料
//   const { loading, error } = useSelector((state) => state.user);
//   const [profileUser, setProfileUser] = useState(null);
//   const [heartStatus, setHeartStatus] = useState([false, false, false]);
//   const [showAvatarSelector, setShowAvatarSelector] = useState(false);
//   const [cgCount, setCgCount] = useState(0); // 儲存不重複且非 NE 的 CG 數量

//   useEffect(() => {
//     if (!currentUser) {
//       console.log("ProfilePage - No currentUser, navigating to /login");
//       navigate("/login");
//       return;
//     }

//     const fetchUserData = async (id) => {
//       try {
//         console.log(`ProfilePage - Fetching user data for userId: ${id}`);
//         const res = await axios.get(`http://localhost:5000/api/user/${id}`);
//         const data = res.data;
//         console.log("ProfilePage - Fetched user data:", data);
//         setProfileUser(data);
//       } catch (err) {
//         console.error("ProfilePage - Failed to fetch user data:", err);
//         setProfileUser(null);
//       }
//     };

//     const targetId = userId || currentUser?._id;
//     if (targetId) {
//       fetchUserData(targetId);
//       dispatch(fetchPetData(targetId));
//       dispatch(fetchCGs(targetId)); // 調用 fetchCGs 獲取 CG 資料
//       if (!leaderboard || leaderboard.length === 0) {
//         console.log("ProfilePage - Fetching leaderboard");
//         dispatch(fetchLeaderboard());
//       }
//     }
//   }, [dispatch, userId, currentUser, leaderboard]);

//   // 計算不重複且 endingType 不是 "NE" 的 CG 數量
//   useEffect(() => {
//     if (cgs && cgs.length > 0) {
//       const uniqueEndings = new Set();
//       cgs.forEach((cg) => {
//         if (cg.endingType !== "NE") {
//           uniqueEndings.add(cg.endingName); // 以 endingName 判斷唯一性
//         }
//       });
//       setCgCount(uniqueEndings.size);
//     } else {
//       setCgCount(0);
//     }
//   }, [cgs]);

//   const isOwnProfile = !userId || userId === currentUser?._id;
//   const userRank =
//     leaderboard.findIndex(
//       (entry) => entry.userId === (userId || currentUser?._id)
//     ) + 1;
//   const userTotalLevel =
//     leaderboard.find((entry) => entry.userId === (userId || currentUser?._id))
//       ?.totalLevel || 0;

//   const petSlots = [
//     {
//       type: "puppy",
//       adopted: pet?.type === "puppy",
//       img:
//         pet?.type === "puppy"
//           ? pet.img2 || "/images/dog.png"
//           : "/images/dog-shadow.png",
//       name: pet?.type === "puppy" ? pet.name : "？？",
//       stats: pet?.type === "puppy" ? pet.stats : null,
//     },
//     {
//       type: "neko",
//       adopted: pet?.type === "neko",
//       img:
//         pet?.type === "neko"
//           ? pet.img2 || "/images/neko.png"
//           : "/images/neko-shadow.png",
//       name: pet?.type === "neko" ? pet.name : "？？",
//       stats: pet?.type === "neko" ? pet.stats : null,
//     },
//     {
//       type: "parrot",
//       adopted: pet?.type === "parrot",
//       img:
//         pet?.type === "parrot"
//           ? pet.img2 || "/images/parrot.png"
//           : "/images/parrot-shadow.png",
//       name: pet?.type === "parrot" ? pet.name : "？？",
//       stats: pet?.type === "parrot" ? pet.stats : null,
//     },
//   ];

//   const avatarOptions = [
//     "/images/avatar1.png",
//     "/images/avatar2.png",
//     "/images/avatar3.png",
//     "/images/avatar4.png",
//   ];

//   const handleHeartClick = (index) => {
//     const newHeartStatus = [...heartStatus];
//     newHeartStatus[index] = !newHeartStatus[index];
//     setHeartStatus(newHeartStatus);
//     console.log(`ProfilePage - Clicked heart for ${petSlots[index].type} pet`);
//   };

//   const handleAvatarClick = () => {
//     if (isOwnProfile) {
//       console.log("ProfilePage - Toggling avatar selector");
//       setShowAvatarSelector(!showAvatarSelector);
//     }
//   };

//   const handleAvatarSelect = async (avatar) => {
//     if (!isOwnProfile) return;
//     try {
//       console.log(`ProfilePage - Updating avatar to: ${avatar}`);
//       const response = await axios.put(
//         `http://localhost:5000/api/user/${currentUser._id}`,
//         { avatar }
//       );
//       const updatedUser = response.data;
//       setProfileUser(updatedUser);
//       dispatch(
//         setUser({
//           _id: updatedUser.userId,
//           username: updatedUser.username,
//           email: updatedUser.email,
//           avatar: updatedUser.avatar,
//         })
//       );
//       setShowAvatarSelector(false);
//       console.log("ProfilePage - Avatar updated successfully:", updatedUser);
//     } catch (err) {
//       console.error("ProfilePage - Failed to update avatar:", err);
//       alert("更新頭像失敗，請稍後再試");
//     }
//   };

//   return (
//     <div className="profile-container">
//       <div className="top-left-icons-profile">
//         <button className="icon-button" onClick={() => navigate("/home")}>
//           <img src="/images/back-arrow.png" alt="回首頁" className="icon-img" />
//         </button>
//       </div>

//       <div className="profile-section">
//         {loading && <p>載入中...</p>}
//         {error && <p className="error">錯誤: {error}</p>}

//         {profileUser ? (
//           <div className="upper">
//             <div className="picture">
//               <img
//                 src={profileUser.avatar || "/images/default-avatar.png"}
//                 alt="頭像"
//                 onClick={handleAvatarClick}
//                 style={{ cursor: isOwnProfile ? "pointer" : "default" }}
//               />
//             </div>
//             <div className="information">
//               <div className="userName">
//                 <p>名字: {profileUser.username}</p>
//               </div>
//               <div className="accomplishment">
//                 <p>結局進度: {cgs ? `${cgCount} / 30` : "無 CG 資料"}</p>
//               </div>
//               <div className="ranking">
//                 <p>
//                   伺服器排名: {userRank > 0 ? `#${userRank}` : "未上榜"}{" "}
//                   (總等級: {userTotalLevel})
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>正在載入用戶資料...</p>
//         )}

//         <div className="lower">
//           {showAvatarSelector ? (
//             <div className="avatar-section">
//               <div className="avatar-selector">
//                 {avatarOptions.map((avatar, index) => (
//                   <div key={index} className="avatar-option">
//                     <img
//                       src={avatar}
//                       alt={`頭像 ${index + 1}`}
//                       onClick={() => handleAvatarSelect(avatar)}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <p>
//                 選取以換取個人頭貼 <br /> 再次點選頭貼以關閉
//               </p>
//             </div>
//           ) : (
//             petSlots.map((slot, index) => (
//               <div key={index} className="pets">
//                 <div className="pet-image-container">
//                   <img
//                     src={slot.img}
//                     alt={slot.adopted ? slot.name : "未領養"}
//                   />
//                   <button
//                     className="heart-button"
//                     onClick={() => handleHeartClick(index)}
//                   >
//                     <img
//                       src={
//                         heartStatus[index]
//                           ? "/images/heart.png"
//                           : "/images/non-heart.png"
//                       }
//                       alt="愛心"
//                     />
//                   </button>
//                 </div>
//                 <div className="information">
//                   <div className="pet-name">{slot.name}</div>
//                   {slot.adopted && slot.stats ? (
//                     <div className="level">Lv: {slot.stats.level}</div>
//                   ) : (
//                     <div className="level">未領養</div>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         {/* {petError && <p className="error">寵物資料: {petError}</p>} */}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPetData } from "../store/petSlice";
import { fetchLeaderboard } from "../store/rankSlice";
import { setUser } from "../store/userSlice";
import { fetchCGs } from "../store/cgSlice";
import axios from "axios";
import "./profileStyle/profileStyle.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.user.data);
  const pet = useSelector((state) => state.pet.data);
  const petError = useSelector((state) => state.pet.error);
  const { leaderboard } = useSelector((state) => state.rank);
  const { cgs } = useSelector((state) => state.cg);
  const { loading, error } = useSelector((state) => state.user);
  const [profileUser, setProfileUser] = useState(null);
  const [heartStatus, setHeartStatus] = useState([false, false, false]);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [cgCount, setCgCount] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      console.log("ProfilePage - No currentUser, navigating to /login");
      navigate("/login");
      return;
    }

    const fetchUserData = async (id) => {
      try {
        console.log(`ProfilePage - Fetching user data for userId: ${id}`);
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        const data = res.data;
        console.log("ProfilePage - Fetched user data:", data);
        setProfileUser(data);
      } catch (err) {
        console.error("ProfilePage - Failed to fetch user data:", err);
        setProfileUser(null);
      }
    };

    const targetId = userId || currentUser?._id;
    if (targetId) {
      fetchUserData(targetId);
      dispatch(fetchPetData(targetId));
      dispatch(fetchCGs(targetId));
      if (!leaderboard || leaderboard.length === 0) {
        console.log("ProfilePage - Fetching leaderboard");
        dispatch(fetchLeaderboard());
      }
    }
  }, [dispatch, userId, currentUser, leaderboard]);

  useEffect(() => {
    if (cgs && cgs.length > 0) {
      const uniqueEndings = new Set();
      cgs.forEach((cg) => {
        if (cg.endingType !== "NE") {
          uniqueEndings.add(cg.endingName);
        }
      });
      setCgCount(uniqueEndings.size);
    } else {
      setCgCount(0);
    }
  }, [cgs]);

  const isOwnProfile = !userId || userId === currentUser?._id;
  const userRank =
    leaderboard.findIndex(
      (entry) => entry.userId === (userId || currentUser?._id)
    ) + 1;
  const userTotalLevel =
    leaderboard.find((entry) => entry.userId === (userId || currentUser?._id))
      ?.totalLevel || 0;

  const petSlots = [
    {
      type: "puppy",
      adopted: !!pet?.pets?.puppy,
      img: pet?.pets?.puppy?.img2 || "/images/dog-shadow.png",
      name: pet?.pets?.puppy?.name || "？？",
      stats: pet?.pets?.puppy?.stats || null,
    },
    {
      type: "neko",
      adopted: !!pet?.pets?.neko,
      img: pet?.pets?.neko?.img2 || "/images/neko-shadow.png",
      name: pet?.pets?.neko?.name || "？？",
      stats: pet?.pets?.neko?.stats || null,
    },
    {
      type: "parrot",
      adopted: !!pet?.pets?.parrot,
      img: pet?.pets?.parrot?.img2 || "/images/parrot-shadow.png",
      name: pet?.pets?.parrot?.name || "？？",
      stats: pet?.pets?.parrot?.stats || null,
    },
  ];

  const avatarOptions = [
    "/images/avatar1.png",
    "/images/avatar2.png",
    "/images/avatar3.png",
    "/images/avatar4.png",
  ];

  const handleHeartClick = (index) => {
    const newHeartStatus = [...heartStatus];
    newHeartStatus[index] = !newHeartStatus[index];
    setHeartStatus(newHeartStatus);
    console.log(`ProfilePage - Clicked heart for ${petSlots[index].type} pet`);
  };

  const handleAvatarClick = () => {
    if (isOwnProfile) {
      console.log("ProfilePage - Toggling avatar selector");
      setShowAvatarSelector(!showAvatarSelector);
    }
  };

  const handleAvatarSelect = async (avatar) => {
    if (!isOwnProfile) return;
    try {
      console.log(`ProfilePage - Updating avatar to: ${avatar}`);
      const response = await axios.put(
        `http://localhost:5000/api/user/${currentUser._id}`,
        { avatar }
      );
      const updatedUser = response.data;
      setProfileUser(updatedUser);
      dispatch(
        setUser({
          _id: updatedUser.userId,
          username: updatedUser.username,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
        })
      );
      setShowAvatarSelector(false);
      console.log("ProfilePage - Avatar updated successfully:", updatedUser);
    } catch (err) {
      console.error("ProfilePage - Failed to update avatar:", err);
      alert("更新頭像失敗，請稍後再試");
    }
  };

  return (
    <div className="profile-container">
      <div className="top-left-icons-profile">
        <button className="icon-button" onClick={() => navigate("/home")}>
          <img src="/images/back-arrow.png" alt="回首頁" className="icon-img" />
        </button>
      </div>

      <div className="profile-section">
        {loading && <p>載入中...</p>}
        {error && <p className="error">錯誤: {error}</p>}

        {profileUser ? (
          <div className="upper">
            <div className="picture">
              <img
                src={profileUser.avatar || "/images/default-avatar.png"}
                alt="頭像"
                onClick={handleAvatarClick}
                style={{ cursor: isOwnProfile ? "pointer" : "default" }}
              />
            </div>
            <div className="information">
              <div className="userName">
                <p>名字: {profileUser.username}</p>
              </div>
              <div className="accomplishment">
                <p>結局進度: {cgs ? `${cgCount} / 30` : "無 CG 資料"}</p>
              </div>
              <div className="ranking">
                <p>伺服器排名: {userRank > 0 ? `#${userRank}` : "未上榜"}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>正在載入用戶資料...</p>
        )}

        <div className="lower">
          {showAvatarSelector ? (
            <div className="avatar-section">
              <div className="avatar-selector">
                {avatarOptions.map((avatar, index) => (
                  <div key={index} className="avatar-option">
                    <img
                      src={avatar}
                      alt={`頭像 ${index + 1}`}
                      onClick={() => handleAvatarSelect(avatar)}
                    />
                  </div>
                ))}
              </div>
              <p>
                選取以換取個人頭貼 <br /> 再次點選頭貼以關閉
              </p>
            </div>
          ) : (
            petSlots.map((slot, index) => (
              <div key={index} className="pets">
                <div className="pet-image-container">
                  <img
                    src={slot.img}
                    alt={slot.adopted ? slot.name : "未領養"}
                  />
                  <button
                    className="heart-button"
                    onClick={() => handleHeartClick(index)}
                  >
                    <img
                      src={
                        heartStatus[index]
                          ? "/images/heart.png"
                          : "/images/non-heart.png"
                      }
                      alt="愛心"
                    />
                  </button>
                </div>
                <div className="information">
                  <div className="pet-name">{slot.name}</div>
                  {slot.adopted && slot.stats ? (
                    <div className="level">Lv: {slot.stats.level}</div>
                  ) : (
                    <div className="level">未領養</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        {/* {petError && <p className="error">寵物資料: {petError}</p>} */}
      </div>
    </div>
  );
};

export default ProfilePage;
