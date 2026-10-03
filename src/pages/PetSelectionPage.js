import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePetData, setCurrentPetType } from "../store/petSlice";
import eventData from "../data/eventData";
import "./petSelection.css";

const PetSelectionPage = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      console.log("No user._id, navigating to /login");
      navigate("/login");
    }
  }, [user, navigate]);

  const handlePetSelect = async (petType) => {
    const initialPetData = {
      name: `${petType}`,
      type: petType,
      img2: `/images/${petType}.png`,
      stats: { level: 1, exp: 0, hunger: 50, cleanliness: 50, emotion: 50 },
      eventIndex: 1,
      triggeredEvents: [0],
    };

    console.log(`[PetSelectionPage] Selecting pet: ${petType}`, initialPetData);
    try {
      await dispatch(
        updatePetData({
          userId: user._id,
          petType,
          petData: initialPetData,
          lastActivePet: petType,
        })
      ).unwrap();
      console.log(
        `[PetSelectionPage] Pet ${petType} data updated successfully`
      );
      dispatch(setCurrentPetType(petType));

      const petEvents = eventData[petType] || eventData.default;
      navigate("/story", {
        state: {
          storyData: petEvents[0],
          petType,
          returnPath: "/raise-pet",
          petData: initialPetData,
          chapterIndex: 1,
        },
      });
    } catch (err) {
      console.error("[PetSelectionPage] Failed to update pet data:", err);
      alert("無法儲存寵物資料，請稍後重試");
    }
  };

  return (
    <div className="pet-selection-container">
      <h1>選擇你的寵物</h1>
      <div className="pet-options">
        <div className="pet-option" onClick={() => handlePetSelect("neko")}>
          <img src="/images/neko.png" alt="貓咪" />
          <p>貓咪</p>
        </div>
        <div className="pet-option" onClick={() => handlePetSelect("puppy")}>
          <img src="/images/dog.png" alt="小狗" />
          <p>小狗</p>
        </div>
        <div className="pet-option" onClick={() => handlePetSelect("parrot")}>
          <img src="/images/parrot.png" alt="鸚鵡" />
          <p>鸚鵡</p>
        </div>
      </div>
    </div>
  );
};

export default PetSelectionPage;
