// src/pages/HomePage.js
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShowSettings, initializeUser } from "../store/userSlice";
import { fetchPetData, setCurrentPetType } from "../store/petSlice";
import SettingsModal from "../components/SettingsModal";
import StoryReviewComponent from "../components/StoryReviewComponent";
import eventData from "../data/eventData";
import "./style/style.css";
import "./homePageStyle/homepage.css";

const HomePage = () => {
  const user = useSelector((state) => state.user.data);
  const { data: myPet, loading, error } = useSelector((state) => state.pet);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  const [showStoryReview, setShowStoryReview] = useState(false);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?._id && !hasFetched.current) {
      console.log("HomePage - Fetching pet data for userId:", user._id);
      hasFetched.current = true;
      dispatch(fetchPetData(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user?._id && !localStorage.getItem("user")) {
      console.log("HomePage - No user or localStorage, navigating to /login");
      navigate("/login");
    }
  }, [user, navigate]);

  const handlePetImageClick = (petType) => {
    if (loading) {
      console.log("HomePage - Pet data loading, please wait");
      return;
    }
    if (!user?._id) {
      console.log("HomePage - No user._id, navigating to /login");
      navigate("/login");
      return;
    }

    dispatch(setCurrentPetType(petType));
    const petData = myPet?.pets?.[petType];

    if (petData) {
      console.log(`HomePage - ${petType} exists, navigating to /raise-pet`);
      navigate("/raise-pet", { state: { petType } });
    } else {
      console.log(`HomePage - No ${petType} data, triggering story`);
      const petEvents = eventData[petType] || eventData.default;
      const initialPetData = {
        name: `${petType}`,
        type: petType,
        img2: `/images/${petType}.png`,
        stats: { level: 1, exp: 0, hunger: 50, cleanliness: 50, emotion: 50 },
        eventIndex: 1,
        triggeredEvents: [0],
      };
      navigate("/story", {
        state: {
          storyData: petEvents[0],
          petType,
          returnPath: "/raise-pet",
          petData: initialPetData,
          chapterIndex: 1,
        },
      });
    }
  };

  const handleStartClick = () => {
    if (loading) {
      console.log("HomePage - Pet data loading, please wait");
      return;
    }
    if (!user?._id) {
      console.log("HomePage - No user._id, navigating to /login");
      navigate("/login");
      return;
    }

    const petTypes = ["neko", "puppy", "parrot"];
    const existingPets = petTypes.filter((type) => myPet?.pets?.[type]);

    if (existingPets.length === 0) {
      console.log("HomePage - No pet data, navigating to /select-pet");
      navigate("/select-pet");
      return;
    }

    const lastActivePet = myPet?.lastActivePet || existingPets[0];
    dispatch(setCurrentPetType(lastActivePet));
    console.log(`HomePage - Navigating to /raise-pet with ${lastActivePet}`);
    navigate("/raise-pet", { state: { petType: lastActivePet } });
  };

  const handleCgClick = () => {
    navigate("/cg");
  };

  const handleStoryReviewClick = () => {
    setShowStoryReview(true);
  };

  return (
    <div className="relative">
      <div className="top-left-icons-home">
        <button
          className="icon-button"
          onClick={() => dispatch(setShowSettings(true))}
        >
          <img src="/images/setting.png" alt="設定" className="icon-img" />
        </button>
        <button className="icon-button" onClick={() => navigate("/bulletin")}>
          <img src="/images/announce.png" alt="公告" className="icon-img" />
        </button>
      </div>
      <div className="top-right-icons-home">
        <button className="icon-button" onClick={() => navigate("/social")}>
          <img src="/images/friend.png" alt="好友列表" className="icon-img" />
        </button>
        <button className="icon-button" onClick={() => navigate("/rank")}>
          <img src="/images/rank.png" alt="排行榜" className="icon-img" />
        </button>
        <button className="icon-button" onClick={() => navigate("/profile")}>
          <img src="/images/me.png" alt="個人資料" className="icon-img" />
        </button>
      </div>
      <div className="animals">
        <div className="craws">
          <div className="login">
            <img src="/images/craw.png" alt="craw" className="craw1" />
            <div className="google-login-button">
              <img
                src="/images/start.png"
                alt="Start"
                className="text-lg tracking-widest font-bold underline"
                onClick={handleStartClick}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="login">
            <img src="/images/craw.png" alt="craw" className="craw2" />
            <div className="google-login-button">
              <img
                src="/images/CG.png"
                alt="CG"
                className="text-lg tracking-widest font-bold underline"
                onClick={handleCgClick}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="login">
            <img src="/images/craw.png" alt="craw" className="craw3" />
            <div className="google-login-button">
              <img
                src="/images/review.png"
                alt="劇情回顧"
                className="text-lg tracking-widest font-bold underline"
                onClick={handleStoryReviewClick}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>

        <div className="pattern" onClick={() => handlePetImageClick("puppy")}>
          <img
            src="/images/dog.png"
            alt="puppy"
            className="puppy"
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="pattern" onClick={() => handlePetImageClick("parrot")}>
          <img
            src="/images/parrot.png"
            alt="parrot"
            className="parrot"
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="pattern" onClick={() => handlePetImageClick("neko")}>
          <img
            src="/images/neko.png"
            alt="neko"
            className="neko"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <SettingsModal showLogout={true} />
      {showStoryReview && (
        <StoryReviewComponent onClose={() => setShowStoryReview(false)} />
      )}
    </div>
  );
};

export default HomePage;
