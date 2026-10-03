// client\src\pages\SocialHubPage.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFriends, addFriend } from "../store/socialSlice";
import FriendCard from "../components/FriendCard";
import "./SocialStyle/SocialHubPage.css";

const SocialHubPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const { friends, loading, error } = useSelector((state) => state.social);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("friends"); // 預設顯示好友列表

  useEffect(() => {
    console.log("Current user:", user);
    if (!user) {
      navigate("/login");
      return;
    }
    const userId = user._id || user.userId;
    if (userId) {
      dispatch(fetchFriends(userId));
    }
  }, [dispatch, user, navigate]);

  const handleSearch = async () => {
    if (!user) {
      alert("請先登入");
      navigate("/login");
      return;
    }
    if (!searchTerm.trim()) {
      alert("請輸入用戶名稱");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/search?username=${encodeURIComponent(
          searchTerm
        )}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `搜尋失敗: ${errorData.message || response.statusText}`
        );
      }
      const data = await response.json();
      // 將 _id 映射為 userId，確保與 FriendCard 兼容
      const formattedResults = (data.users || []).map((user) => ({
        userId: user.userId,
        username: user.username,
        avatar: user.avatar,
      }));
      setSearchResults(formattedResults);
    } catch (err) {
      console.error("搜尋用戶失敗:", err);
      setSearchResults([]);
      alert(`搜尋用戶失敗：${err.message}`);
    }
  };

  const handleAddFriend = async (friendId) => {
    const userId = user._id || user.userId;
    if (!userId) {
      alert("請先登入");
      navigate("/login");
      return;
    }
    try {
      console.log("Adding friend:", { userId, friendId });
      const result = await dispatch(addFriend({ userId, friendId })).unwrap();
      alert("好友添加成功！");
    } catch (err) {
      console.error("添加好友失敗:", err);
      alert(`添加好友失敗：${err.message || "請稍後再試"}`);
    }
  };

  const handleViewProfile = (friendId) => {
    navigate(`/profile/${friendId}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="friend-page">
      <div className="top-left-icons-social">
        <button className="icon-button" onClick={() => navigate("/home")}>
          <img src="/images/back-arrow.png" alt="回首頁" className="icon-img" />
        </button>
      </div>
      <div className="friendBoard">
        <div className="friend-list-container">
          <div className="tab-section">
            <button
              className={`tab-button ${activeTab === "search" ? "active" : ""}`}
              onClick={() => setActiveTab("search")}
            >
              搜尋好友
            </button>
            <button
              className={`tab-button ${
                activeTab === "friends" ? "active" : ""
              }`}
              onClick={() => setActiveTab("friends")}
            >
              好友列表
            </button>
          </div>
          {activeTab === "search" && (
            <div className="search-section">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜尋用戶..."
              />
              <button onClick={handleSearch}>搜尋</button>
            </div>
          )}
          {activeTab === "search" && searchResults.length > 0 && (
            <div className="search-results">
              {/* <h3>搜尋結果</h3> */}
              <div className="friend-list">
                {searchResults.map((result) => (
                  <FriendCard
                    key={result.userId}
                    friend={result}
                    onClick={() => handleViewProfile(result.userId)}
                  />
                ))}
              </div>
            </div>
          )}
          {activeTab === "friends" && (
            <>
              {loading && <p>載入中...</p>}
              {error && <p className="error">錯誤: {error}</p>}
              <div className="friend-list">
                {friends.map((friend) => (
                  <FriendCard
                    key={friend.userId}
                    friend={friend}
                    onClick={() => handleViewProfile(friend.userId)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialHubPage;
