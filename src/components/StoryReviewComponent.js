import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStoryProgress } from "../store/storySlice";
import eventData from "../data/eventData";
import "./storyReviewStyle/storyReview.css";

const StoryReviewComponent = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const storyProgress = useSelector((state) => state.story.progress);
  const [selectedPet, setSelectedPet] = useState("neko"); // 預設選擇貓咪
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // 新增狀態以顯示未解鎖提示

  const petTypes = ["neko", "dog", "parrot"];
  const chapterTitles = {
    neko: [
      { index: 1, title: "初遇之處，我們秘密的基地" },
      { index: 2, title: "意料之外的「大禮」" },
      { index: 3, title: "東窗事發！貓咪房東對峙中" },
      { index: 4, title: "鳳凰花開，何去何從" },
    ],
    dog: [
      { index: 1, title: "本小姐今天心情好" },
      { index: 2, title: "Chapter 02 " },
      { index: 3, title: "Chapter 03 " },
      { index: 4, title: "Chapter 04 " },
    ],
    parrot: [
      { index: 1, title: "金剛鸚鵡—阿公的唯一遺物" },
      { index: 2, title: "Chapter 02 " },
      { index: 3, title: "Chapter 03 " },
      { index: 4, title: "Chapter 04 " },
    ],
  };

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchStoryProgress(user._id));
    }
  }, [dispatch, user]);

  const getPetChapters = (petType) => {
    const chapters = chapterTitles[petType] || [];
    return chapters.map((chapter) => {
      const progress = storyProgress.find(
        (p) => p.petType === petType && p.chapterIndex === chapter.index
      );
      // 針對 Chapter 01 強制設置 unlocked 為 true，其他章節依賴 progress?.unlocked
      const isUnlocked = chapter.index === 1 ? true : !!progress?.unlocked;
      return {
        ...chapter,
        unlocked: isUnlocked,
        choicesMade: progress?.choicesMade || [],
      };
    });
  };

  const handlePetSelect = (petType) => {
    setSelectedPet(petType);
  };

  const handleChapterSelect = (chapter) => {
    if (!chapter.unlocked) {
      setShowAlert(true); // 顯示未解鎖提示
      return;
    }
    setSelectedChapter(chapter);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (!selectedChapter) return;
    const chapterIndex = selectedChapter.index - 1;
    const petEvents = eventData[selectedPet] || eventData.default;
    const storyData = petEvents[chapterIndex];
    if (storyData) {
      navigate("/story", {
        state: {
          storyData,
          petType: selectedPet,
          returnPath: "/home",
          chapterIndex: selectedChapter.index,
          isReviewMode: true,
        },
      });
    }
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setSelectedChapter(null);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="story-review-overlay">
      <div className="story-review-container">
        <img
          src="/images/chapterReview/chapter_backboard.png"
          alt=""
          className="reviewBg"
        />
        <button className="close-button" onClick={onClose}>
          <img src="/images/settingClosed.png" alt="關閉" />
        </button>

        <div className="story-review-content">
          <div className="pet-tabs">
            {petTypes.map((petType) => {
              const progress = storyProgress.some(
                (p) => p.petType === petType && p.unlocked
              );
              return (
                <div
                  key={petType}
                  className={`pet-tab ${
                    selectedPet === petType ? "active" : ""
                  }`}
                  onClick={() => handlePetSelect(petType)}
                >
                  <img
                    src={`/images/${petType}.png`}
                    alt={petType}
                    className={
                      progress ? "pet-image colored" : "pet-image silhouette"
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="chapter-list">
            <ul className="chapter-scroll">
              {getPetChapters(selectedPet).map((chapter) => (
                <li
                  key={chapter.index}
                  className="chapter-item"
                  onClick={() => handleChapterSelect(chapter)}
                >
                  <p className="chapter-text">Chapter 0{chapter.index}</p>
                  <p className="chapter-name">
                    {chapter.unlocked ? chapter.title : "???"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <p>確定要重播此章節的劇情嗎？</p>
            <div className="confirm-buttons">
              <button onClick={handleConfirm}>
                <img src="/images/confirm_yes.png" alt="確定按鈕" />
              </button>
              <button onClick={handleCancel}>
                <img src="/images/confirm_no.png" alt="取消按鈕" />
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <p>此章節尚未解鎖，無法回顧！</p>
            <div className="confirm-buttons">
              <button onClick={handleAlertClose}>
                <img src="/images/confirm_yes.png" alt="確定按鈕" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryReviewComponent;
