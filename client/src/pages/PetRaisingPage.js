// import { useEffect, useRef, useState, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   updatePetData,
//   fetchPetData,
//   setCurrentPetType,
// } from "../store/petSlice";
// import { setHasShownTutorial } from "../store/userSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFaceSmile,
//   faFaceFrown,
//   faFaceGrinStars,
// } from "@fortawesome/free-solid-svg-icons";
// import "./raisingStyle/raisingPage.css";
// import eventData from "../data/eventData";
// import SocketService from "../services/SocketService";

// const PetRaisingPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const {
//     data: myPet,
//     loading,
//     error,
//     currentPetType,
//   } = useSelector((state) => state.pet);
//   const user = useSelector((state) => state.user.data);
//   const hasShownTutorial = useSelector((state) => state.user.hasShownTutorial);
//   const { updatedPetData, petType: passedPetType } = location.state || {};

//   const justReturnedFromStory = useRef(!!updatedPetData);
//   const preventTrigger = useRef(false);
//   const lastTriggeredLevel = useRef(0);
//   const hasFetched = useRef(false);
//   const hasTriggered = useRef(false);
//   const [localPetData, setLocalPetData] = useState(updatedPetData || null);
//   const petNameRef = useRef(
//     updatedPetData?.name ||
//       myPet?.pets?.[currentPetType]?.name ||
//       `${currentPetType || "neko"}`
//   );
//   const [hasInteracted, setHasInteracted] = useState(false);
//   const debounceTimeout = useRef(null);
//   const [showTutorial, setShowTutorial] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [showStoryConfirm, setShowStoryConfirm] = useState(false);
//   const [serverError, setServerError] = useState(null);
//   const pendingUpdates = useRef([]); // 儲存待同步的更新

//   const petStats = useMemo(
//     () =>
//       localPetData?.stats ||
//       updatedPetData?.stats ||
//       myPet?.pets?.[currentPetType]?.stats || {
//         level: 1,
//         exp: 0,
//         hunger: 50,
//         cleanliness: 50,
//         emotion: 50,
//       },
//     [myPet, currentPetType, updatedPetData, localPetData]
//   );

//   useEffect(() => {
//     console.log("PetRaisingPage - Current user:", user);
//     console.log("PetRaisingPage - Current myPet:", myPet);
//     console.log("PetRaisingPage - Current petType:", currentPetType);
//     console.log("PetRaisingPage - Updated petData:", updatedPetData);
//     console.log("PetRaisingPage - Local petData:", localPetData);
//     console.log("PetRaisingPage - Loading:", loading);
//     console.log("PetRaisingPage - Error:", error);
//   }, [
//     myPet,
//     user,
//     loading,
//     error,
//     currentPetType,
//     updatedPetData,
//     localPetData,
//   ]);

//   useEffect(() => {
//     if (!user?._id) {
//       console.log("No user._id, navigating to /login");
//       navigate("/login");
//       return;
//     }

//     if (!hasFetched.current) {
//       console.log("Fetching pet data for userId:", user._id);
//       dispatch(fetchPetData(user._id))
//         .then(() => {
//           console.log("Pet data fetched successfully");
//           // 檢查是否有待同步的更新
//           if (pendingUpdates.current.length > 0) {
//             console.log(
//               "Attempting to sync pending updates:",
//               pendingUpdates.current
//             );
//             pendingUpdates.current.forEach((update) => {
//               dispatch(updatePetData(update)).catch((err) => {
//                 console.error("Failed to sync pending update:", err);
//               });
//             });
//             pendingUpdates.current = [];
//           }
//         })
//         .catch((err) => {
//           console.error("Failed to fetch pet data:", err);
//           setServerError("無法從伺服器載入寵物資料，使用本地資料");
//         });
//       hasFetched.current = true;
//     }

//     if (passedPetType) {
//       dispatch(setCurrentPetType(passedPetType));
//     }

//     if (
//       !hasShownTutorial &&
//       (myPet?.pets?.[currentPetType] || updatedPetData || localPetData)
//     ) {
//       setShowTutorial(true);
//       dispatch(setHasShownTutorial(true));
//     }
//   }, [
//     dispatch,
//     user,
//     navigate,
//     myPet,
//     hasShownTutorial,
//     passedPetType,
//     updatedPetData,
//     localPetData,
//   ]);

//   useEffect(() => {
//     if (updatedPetData && user?._id && justReturnedFromStory.current) {
//       const newStats = {
//         ...updatedPetData.stats,
//         hunger: Math.max(
//           0,
//           updatedPetData.stats.hunger - Math.floor(Math.random() * 30 + 20)
//         ),
//         cleanliness: Math.max(
//           0,
//           updatedPetData.stats.cleanliness - Math.floor(Math.random() * 30 + 20)
//         ),
//         emotion: Math.max(
//           0,
//           updatedPetData.stats.emotion - Math.floor(Math.random() * 30 + 20)
//         ),
//       };
//       let newImg2 =
//         updatedPetData.img2 ||
//         myPet?.pets?.[currentPetType]?.img2 ||
//         `/images/${currentPetType}.png`;
//       if (updatedPetData.eventIndex > 3) {
//         newImg2 = `/images/${
//           currentPetType === "neko"
//             ? "neko_relaxed"
//             : currentPetType === "puppy"
//             ? "dog_relaxed"
//             : "parrot_relaxed"
//         }.png`;
//       } else if (updatedPetData.eventIndex > 1) {
//         newImg2 = `/images/${
//           currentPetType === "neko"
//             ? "neko_running"
//             : currentPetType === "puppy"
//             ? "dog_running"
//             : "parrot_running"
//         }.png`;
//       }
//       const petData = {
//         ...updatedPetData,
//         stats: newStats,
//         img2: newImg2,
//         name: updatedPetData.name || `${currentPetType}`,
//         type: currentPetType,
//         triggeredEvents: updatedPetData.triggeredEvents || [0],
//       };
//       console.log("Updating pet data from story:", petData);
//       setLocalPetData(petData);
//       const updatePayload = {
//         userId: user._id,
//         petType: currentPetType,
//         petData,
//         lastActivePet: currentPetType,
//       };
//       dispatch(updatePetData(updatePayload))
//         .then(() => {
//           console.log("Pet data updated successfully");
//           setServerError(null);
//         })
//         .catch((err) => {
//           console.error("Failed to update pet data from story:", err);
//           setServerError("無法更新寵物資料到伺服器，使用本地資料");
//           pendingUpdates.current.push(updatePayload);
//         });
//       justReturnedFromStory.current = false;
//       preventTrigger.current = true;
//       setTimeout(() => {
//         preventTrigger.current = false;
//       }, 2000);
//     }
//   }, [updatedPetData, dispatch, user, currentPetType]);

//   useEffect(() => {
//     if (loading) {
//       console.log("Loading pet data, skipping navigation");
//       return;
//     }

//     if (error && !updatedPetData && !localPetData) {
//       console.error("Failed to load pet data:", error);
//       setServerError("無法載入寵物資料，請稍後重試");
//       return;
//     }

//     if (!user?._id) {
//       console.log("No user._id after loading, navigating to /login");
//       navigate("/login");
//       return;
//     }

//     if (!myPet?.pets?.[currentPetType] && !updatedPetData && !localPetData) {
//       console.log("No pet data for current type, navigating to /select-pet");
//       navigate("/select-pet");
//       return;
//     }

//     petNameRef.current =
//       localPetData?.name ||
//       updatedPetData?.name ||
//       myPet?.pets?.[currentPetType]?.name ||
//       `${currentPetType}`;
//   }, [
//     myPet,
//     navigate,
//     user,
//     loading,
//     error,
//     currentPetType,
//     updatedPetData,
//     localPetData,
//   ]);

//   useEffect(() => {
//     if (
//       petStats.hunger >= 100 &&
//       petStats.cleanliness >= 100 &&
//       petStats.emotion >= 100 &&
//       !preventTrigger.current &&
//       user?._id &&
//       !hasTriggered.current
//     ) {
//       const triggeredEvents =
//         localPetData?.triggeredEvents ||
//         updatedPetData?.triggeredEvents ||
//         myPet?.pets?.[currentPetType]?.triggeredEvents ||
//         [];
//       const currentEventIndex = triggeredEvents.length;
//       const petEvents = eventData[currentPetType] || eventData.default;

//       if (currentEventIndex < petEvents.length) {
//         hasTriggered.current = true;
//         setShowStoryConfirm(true);
//       } else {
//         handleLevelUp();
//       }
//     }
//   }, [myPet, user, currentPetType, petStats, updatedPetData, localPetData]);

//   const handleLevelUp = () => {
//     if (!myPet && !updatedPetData && !localPetData) return;

//     const currentPetData =
//       localPetData || updatedPetData || myPet?.pets?.[currentPetType];
//     const newLevel = currentPetData.stats.level + 1;
//     const newStats = {
//       ...currentPetData.stats,
//       level: newLevel,
//       exp: 0,
//       hunger: 50,
//       cleanliness: 50,
//       emotion: 50,
//     };

//     const triggeredEvents = currentPetData.triggeredEvents || [];
//     const currentEventIndex = triggeredEvents.length;

//     let newImg2 = currentPetData.img2 || `/images/${currentPetType}.png`;
//     if (currentEventIndex > 3) {
//       newImg2 = `/images/${
//         currentPetType === "neko"
//           ? "neko_relaxed"
//           : currentPetType === "puppy"
//           ? "dog_relaxed"
//           : "parrot_relaxed"
//       }.png`;
//     } else if (currentEventIndex > 1) {
//       newImg2 = `/images/${
//         currentPetType === "neko"
//           ? "neko_running"
//           : currentPetType === "puppy"
//           ? "dog_running"
//           : "parrot_running"
//       }.png`;
//     }

//     const petData = {
//       ...currentPetData,
//       stats: newStats,
//       eventIndex: currentEventIndex + 1,
//       triggeredEvents,
//       img2: newImg2,
//       name: currentPetData.name || `${currentPetType}`,
//       type: currentPetType,
//     };

//     console.log("Upgrading level without story:", petData);
//     setLocalPetData(petData);
//     const updatePayload = {
//       userId: user._id,
//       petType: currentPetType,
//       petData,
//       lastActivePet: currentPetType,
//     };
//     dispatch(updatePetData(updatePayload)).catch((err) => {
//       console.error("Failed to update pet data during level up:", err);
//       setServerError("無法更新寵物資料到伺服器，使用本地資料");
//       pendingUpdates.current.push(updatePayload);
//     });

//     try {
//       SocketService.notifyPetUpdate(user._id, petData);
//     } catch (err) {
//       console.error("SocketService notifyPetUpdate failed:", err);
//     }

//     preventTrigger.current = true;
//     setTimeout(() => {
//       preventTrigger.current = false;
//       hasTriggered.current = false;
//     }, 2000);
//   };

//   const handleStoryConfirm = () => {
//     if (!myPet && !updatedPetData && !localPetData) return;

//     const currentPetData =
//       localPetData || updatedPetData || myPet?.pets?.[currentPetType];
//     const newLevel = currentPetData.stats.level + 1;
//     const newStats = {
//       ...currentPetData.stats,
//       level: newLevel,
//       exp: 0,
//       hunger: 50,
//       cleanliness: 50,
//       emotion: 50,
//     };

//     const triggeredEvents = currentPetData.triggeredEvents || [];
//     const currentEventIndex = triggeredEvents.length;

//     let newImg2 = currentPetData.img2 || `/images/${currentPetType}.png`;
//     if (currentEventIndex > 3) {
//       newImg2 = `/images/${
//         currentPetType === "neko"
//           ? "neko_relaxed"
//           : currentPetType === "puppy"
//           ? "dog_relaxed"
//           : "parrot_relaxed"
//       }.png`;
//     } else if (currentEventIndex > 1) {
//       newImg2 = `/images/${
//         currentPetType === "neko"
//           ? "neko_running"
//           : currentPetType === "puppy"
//           ? "dog_running"
//           : "parrot_running"
//       }.png`;
//     }

//     const petData = {
//       ...currentPetData,
//       stats: newStats,
//       eventIndex: currentEventIndex + 1,
//       triggeredEvents,
//       img2: newImg2,
//       name: currentPetData.name || `${currentPetType}`,
//       type: currentPetType,
//     };

//     const petEvents = eventData[currentPetType] || eventData.default;

//     if (currentEventIndex < petEvents.length) {
//       const eventToTrigger = petEvents[currentEventIndex];
//       if (eventToTrigger && Array.isArray(eventToTrigger.dialogues)) {
//         console.log("Valid event found:", eventToTrigger.title);
//         preventTrigger.current = true;
//         lastTriggeredLevel.current = newLevel;
//         petData.triggeredEvents = [...triggeredEvents, currentEventIndex];
//         petData.eventIndex = currentEventIndex + 1;
//         console.log("Triggering story event:", petData);
//         setLocalPetData(petData);
//         const updatePayload = {
//           userId: user._id,
//           petType: currentPetType,
//           petData,
//           lastActivePet: currentPetType,
//         };
//         dispatch(updatePetData(updatePayload)).catch((err) => {
//           console.error("Failed to update pet data for story:", err);
//           setServerError("無法更新寵物資料到伺服器，使用本地資料");
//           pendingUpdates.current.push(updatePayload);
//         });

//         try {
//           SocketService.notifyPetUpdate(user._id, petData);
//         } catch (err) {
//           console.error("SocketService notifyPetUpdate failed:", err);
//         }
//         navigate("/story", {
//           state: {
//             storyData: eventToTrigger,
//             petType: currentPetType,
//             returnPath: "/raise-pet",
//             petData,
//             myPet:
//               myPet?.pets?.[currentPetType] || updatedPetData || localPetData,
//             chapterIndex: currentEventIndex + 1,
//           },
//         });
//       } else {
//         console.error(
//           "Invalid event data at index:",
//           currentEventIndex,
//           eventToTrigger
//         );
//         console.log("Upgrading pet level without event:", petData);
//         setLocalPetData(petData);
//         const updatePayload = {
//           userId: user._id,
//           petType: currentPetType,
//           petData,
//           lastActivePet: currentPetType,
//         };
//         dispatch(updatePetData(updatePayload)).catch((err) => {
//           console.error("Failed to update pet data without event:", err);
//           setServerError("無法更新寵物資料到伺服器，使用本地資料");
//           pendingUpdates.current.push(updatePayload);
//         });

//         try {
//           SocketService.notifyPetUpdate(user._id, petData);
//         } catch (err) {
//           console.error("SocketService notifyPetUpdate failed:", err);
//         }
//       }
//     } else {
//       console.log("No more events to trigger, upgrading level:", petData);
//       petData.eventIndex = currentEventIndex;
//       setLocalPetData(petData);
//       const updatePayload = {
//         userId: user._id,
//         petType: currentPetType,
//         petData,
//         lastActivePet: currentPetType,
//       };
//       dispatch(updatePetData(updatePayload)).catch((err) => {
//         console.error("Failed to update pet data for level up:", err);
//         setServerError("無法更新寵物資料到伺服器，使用本地資料");
//         pendingUpdates.current.push(updatePayload);
//       });

//       try {
//         SocketService.notifyPetUpdate(user._id, petData);
//       } catch (err) {
//         console.error("SocketService notifyPetUpdate failed:", err);
//       }
//     }

//     preventTrigger.current = true;
//     setTimeout(() => {
//       preventTrigger.current = false;
//       hasTriggered.current = false;
//       setShowStoryConfirm(false);
//     }, 2000);
//   };

//   const handleStoryCancel = () => {
//     setShowStoryConfirm(false);
//     hasTriggered.current = false;
//   };

//   const handleItemClick = (type) => {
//     if (!myPet && !updatedPetData && !localPetData) {
//       console.error("No pet data available, skipping item drop");
//       setServerError("無寵物資料，請重新選擇寵物");
//       return;
//     }
//     clearTimeout(debounceTimeout.current);
//     debounceTimeout.current = setTimeout(async () => {
//       const currentPetData =
//         localPetData || updatedPetData || myPet?.pets?.[currentPetType];
//       const updatedStats = {
//         ...currentPetData.stats,
//         hunger:
//           type === "feed"
//             ? Math.min(100, currentPetData.stats.hunger + 20) // 降低增量以避免過快觸發
//             : currentPetData.stats.hunger,
//         cleanliness:
//           type === "wash"
//             ? Math.min(100, currentPetData.stats.cleanliness + 20)
//             : currentPetData.stats.cleanliness,
//         emotion:
//           type === "play"
//             ? Math.min(100, currentPetData.stats.emotion + 20)
//             : currentPetData.stats.emotion,
//       };
//       const petData = {
//         ...currentPetData,
//         stats: updatedStats,
//         name: currentPetData.name || `${currentPetType}`,
//         type: currentPetType,
//         img2: currentPetData.img2 || `/images/${currentPetType}.png`,
//         eventIndex: currentPetData.eventIndex || 1,
//         triggeredEvents: currentPetData.triggeredEvents || [0],
//       };
//       console.log("Updating pet stats:", petData);
//       try {
//         await dispatch(
//           updatePetData({
//             userId: user._id,
//             petType: currentPetType,
//             petData,
//             lastActivePet: currentPetType,
//           })
//         ).unwrap();
//         setLocalPetData(petData);
//         try {
//           SocketService.notifyPetUpdate(user._id, petData);
//         } catch (err) {
//           console.error("SocketService notifyPetUpdate failed:", err);
//         }
//         setHasInteracted(true);
//         setServerError(null);
//         if (
//           updatedStats.hunger >= 100 &&
//           updatedStats.cleanliness >= 100 &&
//           updatedStats.emotion >= 100 &&
//           !preventTrigger.current &&
//           !hasTriggered.current
//         ) {
//           hasTriggered.current = true;
//           setShowStoryConfirm(true);
//         }
//       } catch (err) {
//         console.error("Failed to update pet data:", err);
//         setLocalPetData(petData);
//         setServerError("無法更新寵物狀態，已使用本地資料");
//         pendingUpdates.current.push({
//           userId: user._id,
//           petType: currentPetType,
//           petData,
//           lastActivePet: currentPetType,
//         });
//       }
//     }, 300);
//   };

//   const handleRename = () => {
//     const newName = prompt("請輸入新的寵物名稱：", petNameRef.current);
//     if (newName && user?._id) {
//       petNameRef.current = newName;
//       const currentPetData =
//         localPetData || updatedPetData || myPet?.pets?.[currentPetType];
//       const petData = {
//         ...currentPetData,
//         name: newName,
//         type: currentPetType,
//         img2: currentPetData.img2 || `/images/${currentPetType}.png`,
//         stats: petStats,
//         eventIndex: currentPetData.eventIndex || 1,
//         triggeredEvents: currentPetData.triggeredEvents || [0],
//       };
//       console.log("Renaming pet:", petData);
//       setLocalPetData(petData);
//       const updatePayload = {
//         userId: user._id,
//         petType: currentPetType,
//         petData,
//         lastActivePet: currentPetType,
//       };
//       dispatch(updatePetData(updatePayload)).catch((err) => {
//         console.error("Failed to update pet data during rename:", err);
//         setServerError("無法更新寵物資料到伺服器，使用本地資料");
//         pendingUpdates.current.push(updatePayload);
//       });

//       try {
//         SocketService.notifyPetUpdate(user._id, petData);
//       } catch (err) {
//         console.error("SocketService notifyPetUpdate failed:", err);
//       }
//     }
//   };

//   const getEmotionIcon = () => {
//     const { emotion } = petStats;
//     if (emotion <= 30) return faFaceFrown;
//     if (emotion <= 70) return faFaceSmile;
//     return faFaceGrinStars;
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => (prev > 0 ? prev - 1 : 4));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => (prev < 4 ? prev + 1 : 0));
//   };

//   if (loading) {
//     return <div className="loading">載入寵物數據中...</div>;
//   }

//   return (
//     <div>
//       {serverError && <p className="error-message">{serverError}</p>}
//       <div className="raising-container">
//         <div className="top-left-icons-event">
//           <button className="icon-button" onClick={() => navigate("/home")}>
//             <img
//               src="/images/back-arrow.png"
//               alt="回上一頁"
//               className="icon-img"
//             />
//           </button>
//           <button className="icon-button" onClick={() => setShowTutorial(true)}>
//             <img
//               src="/images/button_info.png"
//               alt="tutorial"
//               className="icon-img"
//             />
//           </button>
//         </div>

//         <div className="pet-display">
//           {myPet?.pets?.[currentPetType] || updatedPetData || localPetData ? (
//             <>
//               {console.log(
//                 "Rendering image with src:",
//                 localPetData?.img2 ||
//                   updatedPetData?.img2 ||
//                   myPet?.pets?.[currentPetType]?.img2 ||
//                   `/images/${currentPetType}.png`
//               )}
//               <img
//                 src={
//                   localPetData?.img2 ||
//                   updatedPetData?.img2 ||
//                   myPet?.pets?.[currentPetType]?.img2 ||
//                   `/images/${currentPetType}.png`
//                 }
//                 alt={petNameRef.current}
//                 className="pet-image"
//                 style={{
//                   maxHeight: "63vh",
//                   width: `${15 + (petStats.level || 1) * 3}vw`,
//                   maxWidth: "30vw",
//                   display: "block",
//                 }}
//               />
//             </>
//           ) : (
//             <p>正在載入寵物圖片...</p>
//           )}
//         </div>
//         <div className="board-section">
//           <div className="pet-name">
//             <h2>{petNameRef.current}</h2>
//             <img src="/images/pen.png" alt="筆" onClick={handleRename} />
//           </div>

//           <div className="numeric">
//             <div className="words">
//               <p className="level">等級：{petStats.level || 1}</p>
//               <p className="hunger">飽足度：{petStats.hunger || 0} %</p>
//               <p className="cleanliness">
//                 乾淨度：{petStats.cleanliness || 0} %
//               </p>
//               <div className="emotions">
//                 <div className="emotion-flex">
//                   <p>表情：</p>
//                   <FontAwesomeIcon
//                     icon={getEmotionIcon()}
//                     className="emotion-icon"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="interaction">
//             <div className="feed" onClick={() => handleItemClick("feed")}>
//               <img src="/images/feed.png" alt="飼料" />
//             </div>
//             <div className="wash" onClick={() => handleItemClick("wash")}>
//               <img src="/images/wash.png" alt="洗澡" />
//             </div>
//             <div className="play" onClick={() => handleItemClick("play")}>
//               <img src="/images/play.png" alt="球" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {showTutorial && (
//         <div className="tutorial-overlay">
//           <div className="tutorial-board">
//             <img
//               src="/images/tutorial_board.png"
//               alt="tutorial board"
//               className="tutorial-background"
//             />
//             <img
//               src={`/images/tutorial_${currentPage + 1}.png`}
//               alt={`tutorial page ${currentPage + 1}`}
//               className="tutorial-image"
//             />
//             {currentPage === 0 && (
//               <p className="tutorial-text">
//                 點擊筆，幫寵物取個獨一無二的名字吧！
//               </p>
//             )}
//             {currentPage === 1 && (
//               <p className="tutorial-text">
//                 使用罐頭道具，增加寵物的飽足度吧！
//               </p>
//             )}
//             {currentPage === 2 && (
//               <p className="tutorial-text">
//                 使用海綿道具，增加寵物的乾淨度吧！
//               </p>
//             )}
//             {currentPage === 3 && (
//               <p className="tutorial-text">使用玩具道具，讓寵物更開心！</p>
//             )}
//             {currentPage === 4 && (
//               <p className="tutorial-text">會發生什麼事呢……</p>
//             )}
//             <button className="tutorial-prev" onClick={handlePrevPage}>
//               <img
//                 src="/images/button_next_left.png"
//                 alt="previous"
//                 className="tutorial-nav"
//               />
//             </button>
//             <button className="tutorial-next" onClick={handleNextPage}>
//               <img
//                 src="/images/button_next_right.png"
//                 alt="next"
//                 className="tutorial-nav"
//               />
//             </button>
//             <button
//               className="tutorial-close"
//               onClick={() => setShowTutorial(false)}
//             >
//               <img src="/images/settingClosed.png" alt="關閉按鍵" />
//             </button>
//           </div>
//         </div>
//       )}

//       {showStoryConfirm && (
//         <div className="confirm-modal-overlay">
//           <div className="confirm-modal">
//             <p>確定要進入劇情嗎？</p>
//             <div className="confirm-buttons">
//               <button onClick={handleStoryConfirm}>
//                 <img src="/images/confirm_yes.png" alt="確定按鈕" />
//               </button>
//               <button onClick={handleStoryCancel}>
//                 <img src="/images/confirm_no.png" alt="取消按鈕" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PetRaisingPage;
import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePetData,
  fetchPetData,
  setCurrentPetType,
} from "../store/petSlice";
import { setHasShownTutorial } from "../store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceFrown,
  faFaceGrinStars,
} from "@fortawesome/free-solid-svg-icons";
import "./raisingStyle/raisingPage.css";
import eventData from "../data/eventData";
import SocketService from "../services/SocketService";

const PetRaisingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    data: myPet,
    loading,
    error,
    currentPetType,
  } = useSelector((state) => state.pet);
  const user = useSelector((state) => state.user.data);
  const hasShownTutorial = useSelector((state) => state.user.hasShownTutorial);
  const { updatedPetData, petType: passedPetType } = location.state || {};

  const justReturnedFromStory = useRef(!!updatedPetData);
  const preventTrigger = useRef(false);
  const lastTriggeredLevel = useRef(0);
  const hasFetched = useRef(false);
  const hasTriggered = useRef(false);
  const [localPetData, setLocalPetData] = useState(updatedPetData || null);
  const petNameRef = useRef(
    updatedPetData?.name ||
      myPet?.pets?.[currentPetType]?.name ||
      `${currentPetType || "neko"}`
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const debounceTimeout = useRef(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showStoryConfirm, setShowStoryConfirm] = useState(false);
  const [serverError, setServerError] = useState(null);
  const pendingUpdates = useRef([]); // 儲存待同步的更新

  const petStats = useMemo(
    () =>
      localPetData?.stats ||
      updatedPetData?.stats ||
      myPet?.pets?.[currentPetType]?.stats || {
        level: 1,
        exp: 0,
        hunger: 50,
        cleanliness: 50,
        emotion: 50,
      },
    [myPet, currentPetType, updatedPetData, localPetData]
  );

  useEffect(() => {
    console.log("PetRaisingPage - Current user:", user);
    console.log("PetRaisingPage - Current myPet:", myPet);
    console.log("PetRaisingPage - Current petType:", currentPetType);
    console.log("PetRaisingPage - Passed petType:", passedPetType);
    console.log("PetRaisingPage - Updated petData:", updatedPetData);
    console.log("PetRaisingPage - Local petData:", localPetData);
    console.log("PetRaisingPage - Loading:", loading);
    console.log("PetRaisingPage - Error:", error);
  }, [
    myPet,
    user,
    loading,
    error,
    currentPetType,
    updatedPetData,
    localPetData,
    passedPetType,
  ]);

  useEffect(() => {
    if (!user?._id) {
      console.log("No user._id, navigating to /login");
      navigate("/login");
      return;
    }

    // 設置 currentPetType，優先使用 passedPetType
    if (passedPetType && currentPetType !== passedPetType) {
      console.log("Setting currentPetType to:", passedPetType);
      dispatch(setCurrentPetType(passedPetType));
    } else if (!currentPetType && myPet?.lastActivePet) {
      console.log(
        "Setting currentPetType to lastActivePet:",
        myPet.lastActivePet
      );
      dispatch(setCurrentPetType(myPet.lastActivePet));
    }

    // 初始化 localPetData
    if (!localPetData && (myPet?.pets?.[currentPetType] || updatedPetData)) {
      setLocalPetData(myPet?.pets?.[currentPetType] || updatedPetData);
    }

    // 僅在初次載入時獲取寵物數據
    if (!hasFetched.current) {
      console.log("Fetching pet data for userId:", user._id);
      dispatch(fetchPetData(user._id))
        .then(() => {
          console.log("Pet data fetched successfully");
          // 檢查是否有待同步的更新
          if (pendingUpdates.current.length > 0) {
            console.log(
              "Attempting to sync pending updates:",
              pendingUpdates.current
            );
            pendingUpdates.current.forEach((update) => {
              dispatch(updatePetData(update)).catch((err) => {
                console.error("Failed to sync pending update:", err);
              });
            });
            pendingUpdates.current = [];
          }
        })
        .catch((err) => {
          console.error("Failed to fetch pet data:", err);
          setServerError("無法從伺服器載入寵物資料，使用本地資料");
        });
      hasFetched.current = true;
    }

    // 檢查是否有寵物數據，無數據則導航到 /select-pet
    if (
      !loading &&
      !myPet?.pets?.[currentPetType] &&
      !updatedPetData &&
      !localPetData
    ) {
      console.log("No pet data for current type, navigating to /select-pet", {
        currentPetType,
        myPet,
        updatedPetData,
        localPetData,
      });
      navigate("/select-pet");
      return;
    }

    if (
      !hasShownTutorial &&
      (myPet?.pets?.[currentPetType] || updatedPetData || localPetData)
    ) {
      setShowTutorial(true);
      dispatch(setHasShownTutorial(true));
    }
  }, [
    dispatch,
    user,
    navigate,
    myPet,
    hasShownTutorial,
    passedPetType,
    currentPetType,
    loading,
  ]);

  useEffect(() => {
    if (updatedPetData && user?._id && justReturnedFromStory.current) {
      const newStats = {
        ...updatedPetData.stats,
        hunger: Math.max(
          0,
          updatedPetData.stats.hunger - Math.floor(Math.random() * 30 + 20)
        ),
        cleanliness: Math.max(
          0,
          updatedPetData.stats.cleanliness - Math.floor(Math.random() * 30 + 20)
        ),
        emotion: Math.max(
          0,
          updatedPetData.stats.emotion - Math.floor(Math.random() * 30 + 20)
        ),
      };
      let newImg2 =
        updatedPetData.img2 ||
        myPet?.pets?.[currentPetType]?.img2 ||
        `/images/${currentPetType}.png`;
      if (updatedPetData.eventIndex > 3) {
        newImg2 = `/images/${
          currentPetType === "neko"
            ? "neko_relaxed"
            : currentPetType === "puppy"
            ? "dog_relaxed"
            : "parrot_relaxed"
        }.png`;
      } else if (updatedPetData.eventIndex > 1) {
        newImg2 = `/images/${
          currentPetType === "neko"
            ? "neko_running"
            : currentPetType === "puppy"
            ? "dog_running"
            : "parrot_running"
        }.png`;
      }
      const petData = {
        ...updatedPetData,
        stats: newStats,
        img2: newImg2,
        name: updatedPetData.name || `${currentPetType}`,
        type: currentPetType,
        triggeredEvents: updatedPetData.triggeredEvents || [0],
      };
      console.log("Updating pet data from story:", petData);
      setLocalPetData(petData);
      const updatePayload = {
        userId: user._id,
        petType: currentPetType,
        petData,
        lastActivePet: currentPetType,
      };
      dispatch(updatePetData(updatePayload))
        .then(() => {
          console.log("Pet data updated successfully");
          setServerError(null);
        })
        .catch((err) => {
          console.error("Failed to update pet data from story:", err);
          setServerError("無法更新寵物資料到伺服器，使用本地資料");
          pendingUpdates.current.push(updatePayload);
        });
      justReturnedFromStory.current = false;
      preventTrigger.current = true;
      setTimeout(() => {
        preventTrigger.current = false;
      }, 2000);
    }
  }, [updatedPetData, dispatch, user, currentPetType]);

  useEffect(() => {
    if (
      petStats.hunger >= 100 &&
      petStats.cleanliness >= 100 &&
      petStats.emotion >= 100 &&
      !preventTrigger.current &&
      user?._id &&
      !hasTriggered.current
    ) {
      const triggeredEvents =
        localPetData?.triggeredEvents ||
        updatedPetData?.triggeredEvents ||
        myPet?.pets?.[currentPetType]?.triggeredEvents ||
        [];
      const currentEventIndex = triggeredEvents.length;
      const petEvents = eventData[currentPetType] || eventData.default;

      if (currentEventIndex < petEvents.length) {
        hasTriggered.current = true;
        setShowStoryConfirm(true);
      } else {
        handleLevelUp();
      }
    }
  }, [myPet, user, currentPetType, petStats, updatedPetData, localPetData]);

  const handleLevelUp = () => {
    if (!myPet && !updatedPetData && !localPetData) return;

    const currentPetData =
      localPetData || updatedPetData || myPet?.pets?.[currentPetType];
    const newLevel = currentPetData.stats.level + 1;
    const newStats = {
      ...currentPetData.stats,
      level: newLevel,
      exp: 0,
      hunger: 50,
      cleanliness: 50,
      emotion: 50,
    };

    const triggeredEvents = currentPetData.triggeredEvents || [];
    const currentEventIndex = triggeredEvents.length;

    let newImg2 = currentPetData.img2 || `/images/${currentPetType}.png`;
    if (currentEventIndex > 3) {
      newImg2 = `/images/${
        currentPetType === "neko"
          ? "neko_relaxed"
          : currentPetType === "puppy"
          ? "dog_relaxed"
          : "parrot_relaxed"
      }.png`;
    } else if (currentEventIndex > 1) {
      newImg2 = `/images/${
        currentPetType === "neko"
          ? "neko_running"
          : currentPetType === "puppy"
          ? "dog_running"
          : "parrot_running"
      }.png`;
    }

    const petData = {
      ...currentPetData,
      stats: newStats,
      eventIndex: currentEventIndex + 1,
      triggeredEvents,
      img2: newImg2,
      name: currentPetData.name || `${currentPetType}`,
      type: currentPetType,
    };

    console.log("Upgrading level without story:", petData);
    setLocalPetData(petData);
    const updatePayload = {
      userId: user._id,
      petType: currentPetType,
      petData,
      lastActivePet: currentPetType,
    };
    dispatch(updatePetData(updatePayload)).catch((err) => {
      console.error("Failed to update pet data during level up:", err);
      setServerError("無法更新寵物資料到伺服器，使用本地資料");
      pendingUpdates.current.push(updatePayload);
    });

    try {
      SocketService.notifyPetUpdate(user._id, petData);
    } catch (err) {
      console.error("SocketService notifyPetUpdate failed:", err);
    }

    preventTrigger.current = true;
    setTimeout(() => {
      preventTrigger.current = false;
      hasTriggered.current = false;
    }, 2000);
  };

  const handleStoryConfirm = () => {
    if (!myPet && !updatedPetData && !localPetData) return;

    const currentPetData =
      localPetData || updatedPetData || myPet?.pets?.[currentPetType];
    const newLevel = currentPetData.stats.level + 1;
    const newStats = {
      ...currentPetData.stats,
      level: newLevel,
      exp: 0,
      hunger: 50,
      cleanliness: 50,
      emotion: 50,
    };

    const triggeredEvents = currentPetData.triggeredEvents || [];
    const currentEventIndex = triggeredEvents.length;

    let newImg2 = currentPetData.img2 || `/images/${currentPetType}.png`;
    if (currentEventIndex > 3) {
      newImg2 = `/images/${
        currentPetType === "neko"
          ? "neko_relaxed"
          : currentPetType === "puppy"
          ? "dog_relaxed"
          : "parrot_relaxed"
      }.png`;
    } else if (currentEventIndex > 1) {
      newImg2 = `/images/${
        currentPetType === "neko"
          ? "neko_running"
          : currentPetType === "puppy"
          ? "dog_running"
          : "parrot_running"
      }.png`;
    }

    const petData = {
      ...currentPetData,
      stats: newStats,
      eventIndex: currentEventIndex + 1,
      triggeredEvents,
      img2: newImg2,
      name: currentPetData.name || `${currentPetType}`,
      type: currentPetType,
    };

    const petEvents = eventData[currentPetType] || eventData.default;

    if (currentEventIndex < petEvents.length) {
      const eventToTrigger = petEvents[currentEventIndex];
      if (eventToTrigger && Array.isArray(eventToTrigger.dialogues)) {
        console.log("Valid event found:", eventToTrigger.title);
        preventTrigger.current = true;
        lastTriggeredLevel.current = newLevel;
        petData.triggeredEvents = [...triggeredEvents, currentEventIndex];
        petData.eventIndex = currentEventIndex + 1;
        console.log("Triggering story event:", petData);
        setLocalPetData(petData);
        const updatePayload = {
          userId: user._id,
          petType: currentPetType,
          petData,
          lastActivePet: currentPetType,
        };
        dispatch(updatePetData(updatePayload)).catch((err) => {
          console.error("Failed to update pet data for story:", err);
          setServerError("無法更新寵物資料到伺服器，使用本地資料");
          pendingUpdates.current.push(updatePayload);
        });

        try {
          SocketService.notifyPetUpdate(user._id, petData);
        } catch (err) {
          console.error("SocketService notifyPetUpdate failed:", err);
        }
        navigate("/story", {
          state: {
            storyData: eventToTrigger,
            petType: currentPetType,
            returnPath: "/raise-pet",
            petData,
            myPet:
              myPet?.pets?.[currentPetType] || updatedPetData || localPetData,
            chapterIndex: currentEventIndex + 1,
          },
        });
      } else {
        console.error(
          "Invalid event data at index:",
          currentEventIndex,
          eventToTrigger
        );
        console.log("Upgrading pet level without event:", petData);
        setLocalPetData(petData);
        const updatePayload = {
          userId: user._id,
          petType: currentPetType,
          petData,
          lastActivePet: currentPetType,
        };
        dispatch(updatePetData(updatePayload)).catch((err) => {
          console.error("Failed to update pet data without event:", err);
          setServerError("無法更新寵物資料到伺服器，使用本地資料");
          pendingUpdates.current.push(updatePayload);
        });

        try {
          SocketService.notifyPetUpdate(user._id, petData);
        } catch (err) {
          console.error("SocketService notifyPetUpdate failed:", err);
        }
      }
    } else {
      console.log("No more events to trigger, upgrading level:", petData);
      petData.eventIndex = currentEventIndex;
      setLocalPetData(petData);
      const updatePayload = {
        userId: user._id,
        petType: currentPetType,
        petData,
        lastActivePet: currentPetType,
      };
      dispatch(updatePetData(updatePayload)).catch((err) => {
        console.error("Failed to update pet data for level up:", err);
        setServerError("無法更新寵物資料到伺服器，使用本地資料");
        pendingUpdates.current.push(updatePayload);
      });

      try {
        SocketService.notifyPetUpdate(user._id, petData);
      } catch (err) {
        console.error("SocketService notifyPetUpdate failed:", err);
      }
    }

    preventTrigger.current = true;
    setTimeout(() => {
      preventTrigger.current = false;
      hasTriggered.current = false;
      setShowStoryConfirm(false);
    }, 2000);
  };

  const handleStoryCancel = () => {
    setShowStoryConfirm(false);
    hasTriggered.current = false;
  };

  const handleItemClick = (type) => {
    // 檢查是否有有效的寵物數據
    const currentPetData =
      localPetData || updatedPetData || myPet?.pets?.[currentPetType];
    if (!currentPetData) {
      console.error("No valid pet data available for interaction", {
        currentPetType,
        myPet: myPet?.pets,
        updatedPetData,
        localPetData,
      });
      setServerError("無有效寵物資料，請稍後重試或重新選擇寵物");
      return;
    }

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      const updatedStats = {
        ...currentPetData.stats,
        hunger:
          type === "feed"
            ? Math.min(100, currentPetData.stats.hunger + 20)
            : currentPetData.stats.hunger,
        cleanliness:
          type === "wash"
            ? Math.min(100, currentPetData.stats.cleanliness + 20)
            : currentPetData.stats.cleanliness,
        emotion:
          type === "play"
            ? Math.min(100, currentPetData.stats.emotion + 20)
            : currentPetData.stats.emotion,
      };
      const petData = {
        ...currentPetData,
        stats: updatedStats,
        name: currentPetData.name || `${currentPetType}`,
        type: currentPetType,
        img2: currentPetData.img2 || `/images/${currentPetType}.png`,
        eventIndex: currentPetData.eventIndex || 1,
        triggeredEvents: currentPetData.triggeredEvents || [0],
      };
      console.log("Updating pet stats:", petData);
      try {
        await dispatch(
          updatePetData({
            userId: user._id,
            petType: currentPetType,
            petData,
            lastActivePet: currentPetType,
          })
        ).unwrap();
        setLocalPetData(petData);
        try {
          SocketService.notifyPetUpdate(user._id, petData);
        } catch (err) {
          console.error("SocketService notifyPetUpdate failed:", err);
        }
        setHasInteracted(true);
        setServerError(null);
        if (
          updatedStats.hunger >= 100 &&
          updatedStats.cleanliness >= 100 &&
          updatedStats.emotion >= 100 &&
          !preventTrigger.current &&
          !hasTriggered.current
        ) {
          hasTriggered.current = true;
          setShowStoryConfirm(true);
        }
      } catch (err) {
        console.error("Failed to update pet data:", err);
        setLocalPetData(petData);
        setServerError("無法更新寵物狀態，已使用本地資料");
        pendingUpdates.current.push({
          userId: user._id,
          petType: currentPetType,
          petData,
          lastActivePet: currentPetType,
        });
      }
    }, 300);
  };

  const handleRename = () => {
    const newName = prompt("請輸入新的寵物名稱：", petNameRef.current);
    if (newName && user?._id) {
      petNameRef.current = newName;
      const currentPetData =
        localPetData || updatedPetData || myPet?.pets?.[currentPetType];
      const petData = {
        ...currentPetData,
        name: newName,
        type: currentPetType,
        img2: currentPetData.img2 || `/images/${currentPetType}.png`,
        stats: petStats,
        eventIndex: currentPetData.eventIndex || 1,
        triggeredEvents: currentPetData.triggeredEvents || [0],
      };
      console.log("Renaming pet:", petData);
      setLocalPetData(petData);
      const updatePayload = {
        userId: user._id,
        petType: currentPetType,
        petData,
        lastActivePet: currentPetType,
      };
      dispatch(updatePetData(updatePayload)).catch((err) => {
        console.error("Failed to update pet data during rename:", err);
        setServerError("無法更新寵物資料到伺服器，使用本地資料");
        pendingUpdates.current.push(updatePayload);
      });

      try {
        SocketService.notifyPetUpdate(user._id, petData);
      } catch (err) {
        console.error("SocketService notifyPetUpdate failed:", err);
      }
    }
  };

  const getEmotionIcon = () => {
    const { emotion } = petStats;
    if (emotion <= 30) return faFaceFrown;
    if (emotion <= 70) return faFaceSmile;
    return faFaceGrinStars;
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 4));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < 4 ? prev + 1 : 0));
  };

  if (loading) {
    return <div className="loading">載入寵物數據中...</div>;
  }

  return (
    <div>
      {serverError && <p className="error-message">{serverError}</p>}
      <div className="raising-container">
        <div className="top-left-icons-event">
          <button className="icon-button" onClick={() => navigate("/home")}>
            <img
              src="/images/back-arrow.png"
              alt="回上一頁"
              className="icon-img"
            />
          </button>
          <button className="icon-button" onClick={() => setShowTutorial(true)}>
            <img
              src="/images/button_info.png"
              alt="tutorial"
              className="icon-img"
            />
          </button>
        </div>

        <div className="pet-display">
          {myPet?.pets?.[currentPetType] || updatedPetData || localPetData ? (
            <>
              {console.log(
                "Rendering image with src:",
                localPetData?.img2 ||
                  updatedPetData?.img2 ||
                  myPet?.pets?.[currentPetType]?.img2 ||
                  `/images/${currentPetType}.png`
              )}
              <img
                src={
                  localPetData?.img2 ||
                  updatedPetData?.img2 ||
                  myPet?.pets?.[currentPetType]?.img2 ||
                  `/images/${currentPetType}.png`
                }
                alt={petNameRef.current}
                className="pet-image"
                style={{
                  maxHeight: "63vh",
                  width: `${15 + (petStats.level || 1) * 3}vw`,
                  maxWidth: "30vw",
                  display: "block",
                }}
              />
            </>
          ) : (
            <p>正在載入寵物圖片...</p>
          )}
        </div>
        <div className="board-section">
          <div className="pet-name">
            <h2>{petNameRef.current}</h2>
            <img src="/images/pen.png" alt="筆" onClick={handleRename} />
          </div>

          <div className="numeric">
            <div className="words">
              <p className="level">等級：{petStats.level || 1}</p>
              <p className="hunger">飽足度：{petStats.hunger || 0} %</p>
              <p className="cleanliness">
                乾淨度：{petStats.cleanliness || 0} %
              </p>
              <div className="emotions">
                <div className="emotion-flex">
                  <p>表情：</p>
                  <FontAwesomeIcon
                    icon={getEmotionIcon()}
                    className="emotion-icon"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="interaction">
            <div className="feed" onClick={() => handleItemClick("feed")}>
              <img src="/images/feed.png" alt="飼料" />
            </div>
            <div className="wash" onClick={() => handleItemClick("wash")}>
              <img src="/images/wash.png" alt="洗澡" />
            </div>
            <div className="play" onClick={() => handleItemClick("play")}>
              <img src="/images/play.png" alt="球" />
            </div>
          </div>
        </div>
      </div>

      {showTutorial && (
        <div className="tutorial-overlay">
          <div className="tutorial-board">
            <img
              src="/images/tutorial_board.png"
              alt="tutorial board"
              className="tutorial-background"
            />
            <img
              src={`/images/tutorial_${currentPage + 1}.png`}
              alt={`tutorial page ${currentPage + 1}`}
              className="tutorial-image"
            />
            {currentPage === 0 && (
              <p className="tutorial-text">
                點擊筆，幫寵物取個獨一無二的名字吧！
              </p>
            )}
            {currentPage === 1 && (
              <p className="tutorial-text">
                使用罐頭道具，增加寵物的飽足度吧！
              </p>
            )}
            {currentPage === 2 && (
              <p className="tutorial-text">
                使用海綿道具，增加寵物的乾淨度吧！
              </p>
            )}
            {currentPage === 3 && (
              <p className="tutorial-text">使用玩具道具，讓寵物更開心！</p>
            )}
            {currentPage === 4 && (
              <p className="tutorial-text">會發生什麼事呢……</p>
            )}
            <button className="tutorial-prev" onClick={handlePrevPage}>
              <img
                src="/images/button_next_left.png"
                alt="previous"
                className="tutorial-nav"
              />
            </button>
            <button className="tutorial-next" onClick={handleNextPage}>
              <img
                src="/images/button_next_right.png"
                alt="next"
                className="tutorial-nav"
              />
            </button>
            <button
              className="tutorial-close"
              onClick={() => setShowTutorial(false)}
            >
              <img src="/images/settingClosed.png" alt="關閉按鍵" />
            </button>
          </div>
        </div>
      )}

      {showStoryConfirm && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <p>確定要進入劇情嗎？</p>
            <div className="confirm-buttons">
              <button onClick={handleStoryConfirm}>
                <img src="/images/confirm_yes.png" alt="確定按鈕" />
              </button>
              <button onClick={handleStoryCancel}>
                <img src="/images/confirm_no.png" alt="取消按鈕" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetRaisingPage;
