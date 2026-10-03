// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   setShowSettings,
//   setShowMenu,
//   setStoryState,
//   resetStoryState,
// } from "../store/userSlice";
// import { updatePetData, deletePetData } from "../store/petSlice";
// import { unlockCG } from "../store/cgSlice";
// import { updateStoryProgress } from "../store/storySlice";
// import MenuPanel from "../components/MenuPanel";
// import DialogueLog from "../components/DialogueLog";
// import "./storyStyle/storyPage.css";

// const INTRO_DURATION = 2500;

// const allPossibleCGs = [
//   {
//     petType: "neko",
//     endingType: "BE",
//     endingId: 1,
//     endingName: "只餵不養，是渣男行為",
//     cgImage: "/images/catEventCG/cat_be1-1.png",
//   },
//   {
//     petType: "neko",
//     endingType: "BE",
//     endingId: 2,
//     endingName: "吃土貓貓：碰！",
//     cgImage: "/images/catEventCG/cat_be2.png",
//   },
//   {
//     petType: "neko",
//     endingType: "BE",
//     endingId: 3,
//     endingName: "羅密歐與茱麗葉",
//     cgImage: "/images/catEventCG/cat_be3.png",
//   },
//   {
//     petType: "neko",
//     endingType: "TE",
//     endingId: 1,
//     endingName: "珍重再見喵",
//     cgImage: "/images/catEventCG/cat_te1.png",
//   },
//   {
//     petType: "neko",
//     endingType: "BE",
//     endingId: 4,
//     endingName: "撒優娜啦喵",
//     cgImage: "/images/catEventCG/cat_be4.png",
//   },
//   {
//     petType: "neko",
//     endingType: "BE",
//     endingId: 5,
//     endingName: "貓咪大戰爭6周年",
//     cgImage: "/images/catEventCG/cat_be5.png",
//   },
//   {
//     petType: "neko",
//     endingType: "BE",
//     endingId: 6,
//     endingName: "傻眼貓咪",
//     cgImage: "/images/catEventCG/cat_be6.png",
//   },
//   {
//     petType: "neko",
//     endingType: "BE",
//     endingId: 7,
//     endingName: "當我悶痛在一起",
//     cgImage: "/images/catEventCG/cat_be7.png",
//   },
//   {
//     petType: "neko",
//     endingType: "HE",
//     endingId: 1,
//     endingName: "當我們同在一起",
//     cgImage: "/images/catEventCG/cat_he1.png",
//   },
//   {
//     petType: "neko",
//     endingType: "HE",
//     endingId: 2,
//     endingName: "千里之外",
//     cgImage: "/images/catEventCG/cat_he2.png",
//   },
//   {
//     petType: "neko",
//     endingType: "BE",
//     endingId: 8,
//     endingName: "惹毛房東",
//     cgImage: "/images/catEventCG/cat_be8.png",
//   },
//   {
//     petType: "dog",
//     endingType: "BE",
//     endingId: 1,
//     endingName: "未解鎖結局",
//     cgImage: "/images/room.png",
//   },
//   {
//     petType: "dog",
//     endingType: "HE",
//     endingId: 1,
//     endingName: "未解鎖結局",
//     cgImage: "/images/room.png",
//   },
//   {
//     petType: "parrot",
//     endingType: "BE",
//     endingId: 1,
//     endingName: "未解鎖結局",
//     cgImage: "/images/room.png",
//   },
//   {
//     petType: "parrot",
//     endingType: "HE",
//     endingId: 1,
//     endingName: "未解鎖結局",
//     cgImage: "/images/room.png",
//   },
// ];

// const StoryPage = () => {
//   const dispatch = useDispatch();
//   const { textSpeed, storyState } = useSelector((state) => state.user);
//   const { data: myPet, currentPetType } = useSelector((state) => state.pet);
//   const user = useSelector((state) => state.user.data);
//   const {
//     currentDialogueIndex,
//     displayedText,
//     isTyping,
//     showChoices,
//     characters,
//     fadeIn,
//     fadeOut,
//     currentBackground,
//     showIntro,
//     isAutoPlay,
//     showLog,
//     storyRewards,
//   } = storyState;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const {
//     storyData,
//     petType,
//     returnPath,
//     petData,
//     chapterIndex,
//     isReviewMode,
//   } = location.state || {};

//   const audioRef = useRef(null);
//   const [localDisplayedText, setLocalDisplayedText] = useState("");
//   const [dialogueHistory, setDialogueHistory] = useState([]);
//   const autoPlayTimeoutRef = useRef(null);
//   const hasPlayedIntro = useRef(false);
//   const [serverError, setServerError] = useState(null);
//   const pendingUpdates = useRef([]); // 儲存待同步的更新

//   useEffect(() => {
//     console.log("[StoryPage] Current user:", user);
//     console.log("[StoryPage] storyData:", storyData);
//     console.log("[StoryPage] currentDialogueIndex:", currentDialogueIndex);
//     console.log("[StoryPage] showIntro:", showIntro);
//     console.log("[StoryPage] hasPlayedIntro.current:", hasPlayedIntro.current);

//     if (!user?._id) {
//       console.error("[StoryPage] No user._id, navigating to /login");
//       navigate("/login");
//       return;
//     }

//     if (!storyData || !storyData.dialogues) {
//       console.error(
//         "[StoryPage] No storyData or dialogues, navigating to /select-pet"
//       );
//       navigate("/select-pet");
//       return;
//     }

//     hasPlayedIntro.current = false;

//     dispatch(
//       setStoryState({
//         showIntro: true,
//         currentDialogueIndex: -1,
//         currentBackground:
//           storyData.introBg || storyData.dialogues[0]?.background || "",
//       })
//     );

//     if (storyData.rewards) {
//       dispatch(setStoryState({ storyRewards: storyData.rewards }));
//     }

//     if (storyData.bgm && audioRef.current) {
//       audioRef.current.src = storyData.bgm;
//       audioRef.current
//         .play()
//         .catch((e) => console.log("[StoryPage] 播放音樂失敗:", e));
//     }

//     const introTimer = setTimeout(() => {
//       if (!hasPlayedIntro.current) {
//         console.log("[StoryPage] Intro finished, starting dialogue");
//         dispatch(setStoryState({ showIntro: false, currentDialogueIndex: 0 }));
//         const firstDialogue = storyData.dialogues[0];
//         if (firstDialogue && firstDialogue.text) {
//           setDialogueHistory([
//             {
//               speaker: firstDialogue.speaker || "我",
//               text: firstDialogue.text,
//             },
//           ]);
//         }
//         hasPlayedIntro.current = true;
//       }
//     }, INTRO_DURATION);

//     return () => {
//       console.log("[StoryPage] Cleaning up on unmount");
//       clearTimeout(introTimer);
//       clearTimeout(autoPlayTimeoutRef.current);
//       dispatch(resetStoryState());
//       setDialogueHistory([]);
//       hasPlayedIntro.current = false;
//     };
//   }, [storyData, navigate, dispatch, user]);

//   useEffect(() => {
//     if (showIntro || !storyData || !storyData.dialogues) {
//       console.log(
//         "[StoryPage] Skipping dialogue effect due to intro or invalid storyData"
//       );
//       return;
//     }

//     if (
//       currentDialogueIndex < 0 ||
//       currentDialogueIndex >= storyData.dialogues.length
//     ) {
//       console.warn("[StoryPage] Invalid dialogue index:", currentDialogueIndex);
//       return;
//     }

//     const currentDialogue = storyData.dialogues[currentDialogueIndex];
//     if (!currentDialogue) {
//       console.error("[StoryPage] Current dialogue is undefined");
//       return;
//     }

//     let isCancelled = false;

//     dispatch(
//       setStoryState({ currentBackground: currentDialogue.background || "" })
//     );

//     if (currentDialogue.characters) {
//       dispatch(setStoryState({ characters: currentDialogue.characters }));
//     }

//     if (currentDialogue.transition === "fade") {
//       dispatch(setStoryState({ fadeIn: true }));
//       setTimeout(() => {
//         if (!isCancelled) dispatch(setStoryState({ fadeIn: false }));
//       }, 1000);
//     }

//     const fullText =
//       currentDialogue.text ||
//       currentDialogue.endingTitle ||
//       currentDialogue.endingSubTitle ||
//       "";
//     let i = 0;
//     setLocalDisplayedText("");
//     dispatch(setStoryState({ isTyping: true }));

//     const typingSpeed = isAutoPlay ? (70 - textSpeed) / 2 : 70 - textSpeed;

//     const typingInterval = setInterval(() => {
//       if (isCancelled) return;

//       if (i < fullText.length) {
//         setLocalDisplayedText((prev) => prev + fullText.charAt(i));
//         i++;
//       } else {
//         clearInterval(typingInterval);
//         dispatch(setStoryState({ isTyping: false, displayedText: fullText }));

//         if (currentDialogue.choices) {
//           dispatch(setStoryState({ showChoices: true, isAutoPlay: false }));
//           clearTimeout(autoPlayTimeoutRef.current);
//         } else if (isAutoPlay) {
//           if (currentDialogue.ending) {
//             dispatch(setStoryState({ isAutoPlay: false }));
//             clearTimeout(autoPlayTimeoutRef.current);
//             if (currentDialogue.endingType === "NE") {
//               autoPlayTimeoutRef.current = setTimeout(() => {
//                 handleEndingNavigation(currentDialogue);
//               }, 2000);
//             }
//           } else {
//             autoPlayTimeoutRef.current = setTimeout(() => {
//               handleAutoNextDialogue();
//             }, 500);
//           }
//         }
//       }
//     }, typingSpeed);

//     return () => {
//       isCancelled = true;
//       clearInterval(typingInterval);
//       clearTimeout(autoPlayTimeoutRef.current);
//     };
//   }, [
//     currentDialogueIndex,
//     storyData,
//     textSpeed,
//     isAutoPlay,
//     dispatch,
//     showIntro,
//   ]);

//   const handleAutoNextDialogue = () => {
//     if (
//       !storyData ||
//       !storyData.dialogues ||
//       currentDialogueIndex >= storyData.dialogues.length
//     ) {
//       console.log("[StoryPage] handleAutoNextDialogue: No more dialogues");
//       dispatch(setStoryState({ isAutoPlay: false }));
//       setDialogueHistory([]);
//       handleBack();
//       return;
//     }

//     const currentDialogue = storyData.dialogues[currentDialogueIndex];
//     if (!currentDialogue) {
//       console.error(
//         "[StoryPage] Current dialogue is undefined in handleAutoNextDialogue"
//       );
//       return;
//     }

//     const hasExitingCharacter = currentDialogue.characters?.some(
//       (char) => char.exit
//     );

//     if (hasExitingCharacter) {
//       dispatch(
//         setStoryState({
//           characters: characters.map((char) => {
//             const exitingChar = currentDialogue.characters.find(
//               (c) => c.id === char.id && c.exit
//             );
//             return exitingChar ? { ...char, exiting: true } : char;
//           }),
//         })
//       );

//       autoPlayTimeoutRef.current = setTimeout(() => {
//         dispatch(
//           setStoryState({
//             characters: characters.filter((char) => !char.exiting),
//           })
//         );
//         moveToNextDialogue();
//       }, 500);
//     } else {
//       moveToNextDialogue();
//     }
//   };

//   const handleDialogueClick = () => {
//     if (isAutoPlay) return;

//     if (showIntro) {
//       console.log("[StoryPage] Skipping intro via click");
//       dispatch(setStoryState({ showIntro: false, currentDialogueIndex: 0 }));
//       hasPlayedIntro.current = true;
//       const firstDialogue = storyData?.dialogues?.[0];
//       if (firstDialogue && firstDialogue.text) {
//         setDialogueHistory([
//           {
//             speaker: firstDialogue.speaker || "我",
//             text: firstDialogue.text,
//           },
//         ]);
//       }
//       return;
//     }

//     if (
//       !storyData ||
//       !storyData.dialogues ||
//       currentDialogueIndex < 0 ||
//       currentDialogueIndex >= storyData.dialogues.length
//     ) {
//       console.warn(
//         "[StoryPage] Invalid dialogue index or storyData in handleDialogueClick"
//       );
//       return;
//     }

//     const currentDialogue = storyData.dialogues[currentDialogueIndex];
//     if (!currentDialogue) {
//       console.error(
//         "[StoryPage] Current dialogue is undefined in handleDialogueClick"
//       );
//       return;
//     }

//     if (isTyping) {
//       const fullText =
//         currentDialogue.text ||
//         currentDialogue.endingTitle ||
//         currentDialogue.endingSubTitle ||
//         "";
//       setLocalDisplayedText(fullText);
//       dispatch(
//         setStoryState({
//           isTyping: false,
//           displayedText: fullText,
//         })
//       );

//       if (currentDialogue.choices) {
//         dispatch(setStoryState({ showChoices: true }));
//       }
//       return;
//     }

//     if (showChoices) return;

//     if (currentDialogue.ending) {
//       console.log("[StoryPage] Ending reached, stopping auto-play");
//       dispatch(setStoryState({ isAutoPlay: false }));
//       dispatch(resetStoryState());
//       setDialogueHistory([]);
//       clearTimeout(autoPlayTimeoutRef.current);
//       handleEndingNavigation(currentDialogue);
//       return;
//     }

//     const hasExitingCharacter = currentDialogue.characters?.some(
//       (char) => char.exit
//     );

//     if (hasExitingCharacter) {
//       dispatch(
//         setStoryState({
//           characters: characters.map((char) => {
//             const exitingChar = currentDialogue.characters.find(
//               (c) => c.id === char.id && c.exit
//             );
//             return exitingChar ? { ...char, exiting: true } : char;
//           }),
//         })
//       );

//       setTimeout(() => {
//         dispatch(
//           setStoryState({
//             characters: characters.filter((char) => !char.exiting),
//           })
//         );
//         moveToNextDialogue();
//       }, 500);
//     } else {
//       moveToNextDialogue();
//     }
//   };

//   const moveToNextDialogue = () => {
//     const nextIndex = currentDialogueIndex + 1;

//     if (
//       !storyData ||
//       !storyData.dialogues ||
//       nextIndex >= storyData.dialogues.length
//     ) {
//       console.log("[StoryPage] No more dialogues, stopping auto-play");
//       dispatch(setStoryState({ isAutoPlay: false }));
//       dispatch(resetStoryState());
//       setDialogueHistory([]);
//       clearTimeout(autoPlayTimeoutRef.current);
//       handleBack();
//       return;
//     }

//     const nextDialogue = storyData.dialogues[nextIndex];
//     if (nextDialogue && nextDialogue.text) {
//       setDialogueHistory((prev) => [
//         ...prev,
//         {
//           speaker: nextDialogue.speaker || "我",
//           text: nextDialogue.text,
//         },
//       ]);
//     }

//     dispatch(setStoryState({ currentDialogueIndex: nextIndex }));
//   };

//   const handleChoiceSelect = (nextIndex, choiceText, choiceIndex) => {
//     dispatch(setStoryState({ showChoices: false, isAutoPlay: false }));
//     setDialogueHistory((prev) => [
//       ...prev,
//       {
//         speaker: "選擇",
//         text: ` ${choiceText}`,
//       },
//     ]);
//     clearTimeout(autoPlayTimeoutRef.current);

//     if (user?._id && petType && chapterIndex !== undefined) {
//       const choiceData = [
//         {
//           dialogueIndex: currentDialogueIndex,
//           choiceIndex,
//           nextDialogueIndex: nextIndex,
//         },
//       ];
//       dispatch(
//         updateStoryProgress({
//           userId: user._id,
//           petType,
//           chapterIndex,
//           choicesMade: choiceData,
//         })
//       );
//     }

//     dispatch(setStoryState({ currentDialogueIndex: nextIndex }));
//   };

//   const handleAutoPlayToggle = () => {
//     dispatch(setStoryState({ isAutoPlay: !isAutoPlay }));
//     if (isAutoPlay) {
//       clearTimeout(autoPlayTimeoutRef.current);
//     }
//   };

//   const handleBack = () => {
//     console.log("[StoryPage] Handling back, stopping auto-play");
//     dispatch(setStoryState({ isAutoPlay: false }));
//     clearTimeout(autoPlayTimeoutRef.current);
//     setDialogueHistory([]);

//     let destination = returnPath || "/raise-pet";

//     let updatedPetData = petData || myPet?.pets?.[petType];
//     if (!updatedPetData) {
//       updatedPetData = {
//         name: `${petType}`,
//         type: petType,
//         img2: `/images/${petType}.png`,
//         stats: { level: 1, exp: 0, hunger: 50, cleanliness: 50, emotion: 50 },
//         eventIndex: 1,
//         triggeredEvents: [0],
//       };
//     }

//     const updatedStats = {
//       ...updatedPetData.stats,
//       exp: (updatedPetData.stats.exp || 0) + (storyRewards?.expReward || 0),
//       level:
//         (updatedPetData.stats.level || 1) + (storyRewards?.levelReward || 0),
//       emotion: Math.min(
//         100,
//         (updatedPetData.stats.emotion || 0) + (storyRewards?.emotionReward || 0)
//       ),
//       hunger: updatedPetData.stats.hunger || 50,
//       cleanliness: updatedPetData.stats.cleanliness || 50,
//     };

//     const newEventIndex = updatedPetData.eventIndex;

//     let newImg2 = updatedPetData.img2 || `/images/${petType}.png`;
//     if (newEventIndex > 3) {
//       newImg2 = `/images/${
//         petType === "neko"
//           ? "neko_relaxed"
//           : petType === "puppy"
//           ? "dog-relaxed"
//           : "parrot-relaxed"
//       }.png`;
//     } else if (newEventIndex > 1) {
//       newImg2 = `/images/${
//         petType === "neko"
//           ? "cat_running"
//           : petType === "puppy"
//           ? "dog_running"
//           : "parrot_running"
//       }.png`;
//     }

//     const finalPetData = {
//       ...updatedPetData,
//       stats: updatedStats,
//       eventIndex: newEventIndex,
//       triggeredEvents: updatedPetData.triggeredEvents || [0],
//       img2: newImg2,
//     };

//     if (isReviewMode) {
//       console.log("[StoryPage] In review mode, skipping pet data changes");
//       navigate(destination);
//       return;
//     }

//     const currentDialogue = storyData?.dialogues?.[currentDialogueIndex];
//     let endingType = currentDialogue?.endingType || "HE";

//     if (currentDialogue?.ending && user?._id) {
//       const endingIdMatch = currentDialogue.endingTitle?.match(/《(.*?)》/);
//       const rawEndingName = endingIdMatch
//         ? endingIdMatch[1]
//         : currentDialogue.endingTitle || "未知結局";

//       const possibleCG = allPossibleCGs.find(
//         (cg) =>
//           cg.petType === (petType || "neko") &&
//           cg.endingType === endingType &&
//           cg.endingName === rawEndingName
//       );

//       const endingId = possibleCG ? possibleCG.endingId : 1;
//       const cgImage = possibleCG
//         ? possibleCG.cgImage
//         : currentDialogue.background || "/images/placeholder-cg.png";
//       const endingName = possibleCG ? possibleCG.endingName : rawEndingName;

//       console.log("[StoryPage] 準備儲存的 CG 資料:", {
//         userId: user._id,
//         petType: petType || "neko",
//         endingType,
//         endingId,
//         cgImage,
//         endingName,
//       });

//       dispatch(
//         unlockCG({
//           userId: user._id,
//           petType: petType || "neko",
//           endingType,
//           endingId,
//           cgImage,
//           endingName,
//         })
//       );

//       if (chapterIndex !== undefined) {
//         dispatch(
//           updateStoryProgress({
//             userId: user._id,
//             petType: petType || "neko",
//             chapterIndex,
//             unlocked: true,
//           })
//         );
//       }
//     }

//     if (endingType === "TE" || endingType === "BE") {
//       destination = "/home";
//       if (user?._id) {
//         dispatch(deletePetData({ userId: user._id, petType }))
//           .then(() => {
//             console.log("[StoryPage] Pet data deleted successfully");
//             navigate(destination);
//           })
//           .catch((err) => {
//             console.error("[StoryPage] Failed to delete pet data:", err);
//             setServerError("無法刪除寵物資料，請稍後重試");
//             navigate(destination);
//           });
//       } else {
//         navigate(destination);
//       }
//     } else {
//       if (user?._id) {
//         const updatePayload = {
//           userId: user._id,
//           petType,
//           petData: finalPetData,
//           lastActivePet: petType,
//         };
//         dispatch(updatePetData(updatePayload))
//           .then(() => {
//             console.log("[StoryPage] Pet data updated successfully");
//             setServerError(null);
//             navigate(destination, {
//               state: { updatedPetData: finalPetData, petType },
//             });
//             // 檢查並同步待處理更新
//             if (pendingUpdates.current.length > 0) {
//               console.log(
//                 "[StoryPage] Attempting to sync pending updates:",
//                 pendingUpdates.current
//               );
//               pendingUpdates.current.forEach((update) => {
//                 dispatch(updatePetData(update)).catch((err) => {
//                   console.error(
//                     "[StoryPage] Failed to sync pending update:",
//                     err
//                   );
//                 });
//               });
//               pendingUpdates.current = [];
//             }
//           })
//           .catch((err) => {
//             console.error("[StoryPage] Failed to update pet data:", err);
//             setServerError("無法儲存寵物進度，已使用本地資料");
//             pendingUpdates.current.push(updatePayload);
//             navigate(destination, {
//               state: { updatedPetData: finalPetData, petType },
//             });
//           });
//       } else {
//         navigate(destination, {
//           state: { updatedPetData: finalPetData, petType },
//         });
//       }
//     }

//     console.log("[StoryPage] Navigating to:", destination);
//   };

//   const handleEndingNavigation = (currentDialogue) => {
//     const endingType = currentDialogue.endingType || "HE";
//     let destination = returnPath || "/raise-pet";

//     if (currentDialogue.ending && user?._id) {
//       const endingIdMatch = currentDialogue.endingTitle?.match(/《(.*?)》/);
//       const rawEndingName = endingIdMatch
//         ? endingIdMatch[1]
//         : currentDialogue.endingTitle || "未知結局";

//       const possibleCG = allPossibleCGs.find(
//         (cg) =>
//           cg.petType === (petType || "neko") &&
//           cg.endingType === endingType &&
//           cg.endingName === rawEndingName
//       );

//       const endingId = possibleCG ? possibleCG.endingId : 1;
//       const cgImage = possibleCG
//         ? possibleCG.cgImage
//         : currentDialogue.background || "/images/placeholder-cg.png";
//       const endingName = possibleCG ? possibleCG.endingName : rawEndingName;

//       dispatch(
//         unlockCG({
//           userId: user._id,
//           petType: petType || "neko",
//           endingType,
//           endingId,
//           cgImage,
//           endingName,
//         })
//       );

//       if (chapterIndex !== undefined) {
//         dispatch(
//           updateStoryProgress({
//             userId: user._id,
//             petType: petType || "neko",
//             chapterIndex,
//             unlocked: true,
//           })
//         );
//       }
//     }

//     let updatedPetData = petData || myPet?.pets?.[petType];
//     if (!updatedPetData) {
//       updatedPetData = {
//         name: `${petType}`,
//         type: petType,
//         img2: `/images/${petType}.png`,
//         stats: { level: 1, exp: 0, hunger: 50, cleanliness: 50, emotion: 50 },
//         eventIndex: 1,
//         triggeredEvents: [0],
//       };
//     }

//     const updatedStats = {
//       ...updatedPetData.stats,
//       exp: (updatedPetData.stats.exp || 0) + (storyRewards?.expReward || 0),
//       level:
//         (updatedPetData.stats.level || 1) + (storyRewards?.levelReward || 0),
//       emotion: Math.min(
//         100,
//         (updatedPetData.stats.emotion || 0) + (storyRewards?.emotionReward || 0)
//       ),
//       hunger: updatedPetData.stats.hunger || 50,
//       cleanliness: updatedPetData.stats.cleanliness || 50,
//     };

//     const newEventIndex = updatedPetData.eventIndex;

//     let newImg2 = updatedPetData.img2 || `/images/${petType}.png`;
//     if (newEventIndex > 3) {
//       newImg2 = `/images/${
//         petType === "neko"
//           ? "neko_relaxed"
//           : petType === "puppy"
//           ? "dog-relaxed"
//           : "parrot-relaxed"
//       }.png`;
//     } else if (newEventIndex > 1) {
//       newImg2 = `/images/${
//         petType === "neko"
//           ? "cat_running"
//           : petType === "puppy"
//           ? "dog_running"
//           : "parrot_running"
//       }.png`;
//     }

//     const finalPetData = {
//       ...updatedPetData,
//       stats: updatedStats,
//       eventIndex: newEventIndex,
//       triggeredEvents: updatedPetData.triggeredEvents || [0],
//       img2: newImg2,
//     };

//     if (isReviewMode) {
//       navigate(destination);
//       return;
//     }

//     if (endingType === "TE" || endingType === "BE") {
//       destination = "/home";
//       if (user?._id) {
//         dispatch(deletePetData({ userId: user._id, petType }))
//           .then(() => {
//             console.log("[StoryPage] Pet data deleted successfully");
//             navigate(destination);
//           })
//           .catch((err) => {
//             console.error("[StoryPage] Failed to delete pet data:", err);
//             setServerError("無法刪除寵物資料，請稍後重試");
//             navigate(destination);
//           });
//       } else {
//         navigate(destination);
//       }
//     } else {
//       if (user?._id) {
//         const updatePayload = {
//           userId: user._id,
//           petType,
//           petData: finalPetData,
//           lastActivePet: petType,
//         };
//         dispatch(updatePetData(updatePayload))
//           .then(() => {
//             console.log("[StoryPage] Pet data updated successfully");
//             setServerError(null);
//             navigate(destination, {
//               state: { updatedPetData: finalPetData, petType },
//             });
//             // 同步待處理更新
//             if (pendingUpdates.current.length > 0) {
//               console.log(
//                 "[StoryPage] Attempting to sync pending updates:",
//                 pendingUpdates.current
//               );
//               pendingUpdates.current.forEach((update) => {
//                 dispatch(updatePetData(update)).catch((err) => {
//                   console.error(
//                     "[StoryPage] Failed to sync pending update:",
//                     err
//                   );
//                 });
//               });
//               pendingUpdates.current = [];
//             }
//           })
//           .catch((err) => {
//             console.error("[StoryPage] Failed to update pet data:", err);
//             setServerError("無法儲存寵物進度，已使用本地資料");
//             pendingUpdates.current.push(updatePayload);
//             navigate(destination, {
//               state: { updatedPetData: finalPetData, petType },
//             });
//           });
//       } else {
//         navigate(destination, {
//           state: { updatedPetData: finalPetData, petType },
//         });
//       }
//     }
//   };

//   const handleSkip = () => {
//     if (!storyData || !storyData.dialogues || currentDialogueIndex < 0) return;

//     let nextIndex = currentDialogueIndex;
//     const skippedDialogues = [];

//     while (nextIndex < storyData.dialogues.length) {
//       const dialogue = storyData.dialogues[nextIndex];
//       if (!dialogue) break;

//       const dialogueText = dialogue.text || "";
//       if (dialogueText) {
//         skippedDialogues.push({
//           speaker: dialogue.speaker || "我",
//           text: dialogueText,
//         });
//       }

//       if (dialogue.choices || dialogue.ending) {
//         break;
//       }
//       nextIndex++;
//     }

//     if (skippedDialogues.length > 0) {
//       setDialogueHistory((prev) => [...prev, ...skippedDialogues]);
//     }

//     if (nextIndex >= storyData.dialogues.length) {
//       console.log("[StoryPage] Skip to end, stopping auto-play");
//       dispatch(setStoryState({ isAutoPlay: false }));
//       dispatch(resetStoryState());
//       setDialogueHistory([]);
//       clearTimeout(autoPlayTimeoutRef.current);
//       handleBack();
//     } else {
//       dispatch(setStoryState({ currentDialogueIndex: nextIndex }));
//     }
//   };

//   if (!storyData || !storyData.dialogues) {
//     console.warn("[StoryPage] Missing storyData or dialogues, showing loading");
//     return <div className="loading">載入中...</div>;
//   }

//   const currentDialogue =
//     currentDialogueIndex >= 0 &&
//     currentDialogueIndex < storyData.dialogues.length
//       ? storyData.dialogues[currentDialogueIndex]
//       : null;

//   if (!showIntro && !currentDialogue) {
//     console.error(
//       "[StoryPage] Invalid currentDialogueIndex:",
//       currentDialogueIndex
//     );
//     return <div className="loading">載入中...</div>;
//   }

//   let endingCG = currentBackground;
//   let endingName = "";
//   if (currentDialogue?.ending && currentDialogue.endingType !== "NE") {
//     const endingIdMatch = currentDialogue.endingTitle?.match(/《(.*?)》/);
//     const rawEndingName = endingIdMatch
//       ? endingIdMatch[1]
//       : currentDialogue.endingTitle || "未知結局";

//     const possibleCG = allPossibleCGs.find(
//       (cg) =>
//         cg.petType === (petType || "neko") &&
//         cg.endingType === currentDialogue.endingType &&
//         cg.endingName === rawEndingName
//     );

//     endingCG = possibleCG
//       ? possibleCG.cgImage
//       : currentDialogue.background || "/images/placeholder-cg.png";
//     endingName = possibleCG ? possibleCG.endingName : rawEndingName;
//   }

//   return (
//     <div
//       className="story-container"
//       onClick={showIntro ? handleDialogueClick : undefined}
//     >
//       {serverError && <p className="error-message">{serverError}</p>}
//       <div className="top-left-icons-story">
//         <button
//           className="icon-button"
//           onClick={() => dispatch(setShowMenu(true))}
//         >
//           <img
//             src="/images/storyBtn/button_menu.png"
//             alt="menu"
//             className="icon-img"
//             style={{ width: "35vh" }}
//           />
//         </button>
//         <button className="icon-button" onClick={handleAutoPlayToggle}>
//           <div className="skip">
//             {!isAutoPlay ? (
//               <img
//                 src="/images/storyBtn/button_auto.png"
//                 alt="自動撥放鍵"
//                 className="icon-img"
//               />
//             ) : (
//               <img
//                 src="/images/storyBtn/button_pause.png"
//                 alt="自動暫停鍵"
//                 className="icon-img"
//               />
//             )}
//           </div>
//         </button>
//         <button className="icon-button" onClick={handleSkip}>
//           <div className="skip">
//             <img src="/images/storyBtn/button_skip.png" alt="skip鍵" />
//           </div>
//         </button>
//       </div>
//       <div className="top-right-icons-story">
//         <button
//           className="icon-button"
//           onClick={() => dispatch(setStoryState({ showLog: true }))}
//         >
//           <div className="skip">
//             <img src="/images/storyBtn/button_return.png" alt="文本Log" />
//           </div>
//         </button>
//       </div>
//       <audio ref={audioRef} loop />
//       <div
//         className={`story-background ${fadeIn ? "fade-in" : ""} ${
//           fadeOut ? "fade-out" : ""
//         }`}
//         style={{ backgroundImage: `url(${endingCG || currentBackground})` }}
//       />
//       {showIntro && (
//         <div className="intro-container">
//           <div className="intro-animation">
//             <div className="chapter-title-intro">
//               <h1>{storyData.title}</h1>
//             </div>
//             {storyData.subtitle && (
//               <div className="chapter-subtitle">
//                 <h2>{storyData.subtitle}</h2>
//               </div>
//             )}
//             <div className="skip-hint">點擊畫面跳過</div>
//             <div className="intro-overlay"></div>
//           </div>
//         </div>
//       )}
//       {!showIntro && currentDialogue && (
//         <>
//           {characters.map((char, index) => (
//             <img
//               key={index}
//               src={char.image}
//               alt={char.id}
//               className={`character ${char.position || "center"} ${
//                 char.exiting ? "exit" : ""
//               }`}
//               style={{
//                 left:
//                   char.position === "left"
//                     ? "10%"
//                     : char.position === "right"
//                     ? "60%"
//                     : "35%",
//                 transform:
//                   char.position === "center" ? "translateX(-50%)" : "none",
//               }}
//             />
//           ))}
//           <div
//             className="dialogue-box"
//             onClick={isTyping || showChoices ? undefined : handleDialogueClick}
//           >
//             {currentDialogue.ending ? (
//               <>
//                 <div className="ending-title">
//                   {currentDialogue.endingTitle}
//                 </div>
//                 {currentDialogue.endingSubTitle && (
//                   <div className="ending-subTitle">
//                     {currentDialogue.endingSubTitle}
//                   </div>
//                 )}
//                 <div
//                   className="ending-container"
//                   onClick={() => handleEndingNavigation(currentDialogue)}
//                 >
//                   <div className="ending-name">
//                     <p>達成結局《{endingName}》</p>
//                     <p className="ending-subTitle">
//                       {currentDialogue.endingSubTitle}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="click-to-continue">*點擊畫面繼續</p>
//               </>
//             ) : (
//               <>
//                 <div className="dialogue-speaker">
//                   {currentDialogue.speaker || "我"}
//                 </div>
//                 <div className="dialogue-text">{localDisplayedText}</div>
//               </>
//             )}
//             {showChoices && currentDialogue.choices && (
//               <div className="choices-container">
//                 {currentDialogue.choices.map((choice, index) => (
//                   <button
//                     key={index}
//                     onClick={() =>
//                       handleChoiceSelect(
//                         choice.nextDialogueIndex,
//                         choice.text,
//                         index
//                       )
//                     }
//                     className="choice-button"
//                   >
//                     {choice.text}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//       {showLog && (
//         <DialogueLog
//           history={dialogueHistory}
//           onClose={() => dispatch(setStoryState({ showLog: false }))}
//         />
//       )}
//       <MenuPanel />
//     </div>
//   );
// };

// export default StoryPage;
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowSettings,
  setShowMenu,
  setStoryState,
  resetStoryState,
} from "../store/userSlice";
import { updatePetData, deletePetData } from "../store/petSlice";
import { unlockCG } from "../store/cgSlice";
import { updateStoryProgress } from "../store/storySlice";
import MenuPanel from "../components/MenuPanel";
import DialogueLog from "../components/DialogueLog";
import "./storyStyle/storyPage.css";

const INTRO_DURATION = 2500;

const allPossibleCGs = [
  {
    petType: "neko",
    endingType: "BE",
    endingId: 1,
    endingName: "只餵不養，是渣男行為",
    cgImage: "/images/catEventCG/cat_be1-1.png",
  },
  {
    petType: "neko",
    endingType: "BE",
    endingId: 2,
    endingName: "吃土貓貓：碰！",
    cgImage: "/images/catEventCG/cat_be2.png",
  },
  {
    petType: "neko",
    endingType: "BE",
    endingId: 3,
    endingName: "羅密歐與茱麗葉",
    cgImage: "/images/catEventCG/cat_be3.png",
  },
  {
    petType: "neko",
    endingType: "TE",
    endingId: 1,
    endingName: "珍重再見喵",
    cgImage: "/images/catEventCG/cat_te1.png",
  },
  {
    petType: "neko",
    endingType: "BE",
    endingId: 4,
    endingName: "撒優娜啦喵",
    cgImage: "/images/catEventCG/cat_be4.png",
  },
  {
    petType: "neko",
    endingType: "BE",
    endingId: 5,
    endingName: "貓咪大戰爭6周年",
    cgImage: "/images/catEventCG/cat_be5.png",
  },
  {
    petType: "neko",
    endingType: "BE",
    endingId: 6,
    endingName: "傻眼貓咪",
    cgImage: "/images/catEventCG/cat_be6.png",
  },
  {
    petType: "neko",
    endingType: "BE",
    endingId: 7,
    endingName: "當我悶痛在一起",
    cgImage: "/images/catEventCG/cat_be7.png",
  },
  {
    petType: "neko",
    endingType: "HE",
    endingId: 1,
    endingName: "當我們同在一起",
    cgImage: "/images/catEventCG/cat_he1.png",
  },
  {
    petType: "neko",
    endingType: "HE",
    endingId: 2,
    endingName: "千里之外",
    cgImage: "/images/catEventCG/cat_he2.png",
  },
  {
    petType: "neko",
    endingType: "BE",
    endingId: 8,
    endingName: "惹毛房東",
    cgImage: "/images/catEventCG/cat_be8.png",
  },
  {
    petType: "dog",
    endingType: "BE",
    endingId: 1,
    endingName: "我的手包不需要口水",
    cgImage: "/images/room.png",
  },
  {
    petType: "dog",
    endingType: "HE",
    endingId: 1,
    endingName: "未解鎖結局",
    cgImage: "/images/room.png",
  },
  {
    petType: "parrot",
    endingType: "BE",
    endingId: 1,
    endingName: "未解鎖結局",
    cgImage: "/images/room.png",
  },
  {
    petType: "parrot",
    endingType: "HE",
    endingId: 1,
    endingName: "未解鎖結局",
    cgImage: "/images/room.png",
  },
];

const StoryPage = () => {
  const dispatch = useDispatch();
  const { textSpeed, storyState } = useSelector((state) => state.user);
  const { data: myPet, currentPetType } = useSelector((state) => state.pet);
  const user = useSelector((state) => state.user.data);
  const {
    currentDialogueIndex,
    displayedText,
    isTyping,
    showChoices,
    characters,
    fadeIn,
    fadeOut,
    currentBackground,
    showIntro,
    isAutoPlay,
    showLog,
    storyRewards,
  } = storyState;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    storyData,
    petType,
    returnPath,
    petData,
    chapterIndex,
    isReviewMode,
  } = location.state || {};

  const audioRef = useRef(null);
  const [localDisplayedText, setLocalDisplayedText] = useState("");
  const [dialogueHistory, setDialogueHistory] = useState([]);
  const autoPlayTimeoutRef = useRef(null);
  const hasPlayedIntro = useRef(false);
  const [serverError, setServerError] = useState(null);
  const pendingUpdates = useRef([]); // 儲存待同步的更新

  useEffect(() => {
    console.log("[StoryPage] Current user:", user);
    console.log("[StoryPage] storyData:", storyData);
    console.log("[StoryPage] currentDialogueIndex:", currentDialogueIndex);
    console.log("[StoryPage] showIntro:", showIntro);
    console.log("[StoryPage] hasPlayedIntro.current:", hasPlayedIntro.current);

    if (!user?._id) {
      console.error("[StoryPage] No user._id, navigating to /login");
      navigate("/login");
      return;
    }

    if (!storyData || !storyData.dialogues) {
      console.error(
        "[StoryPage] No storyData or dialogues, navigating to /select-pet"
      );
      navigate("/select-pet");
      return;
    }

    hasPlayedIntro.current = false;

    dispatch(
      setStoryState({
        showIntro: true,
        currentDialogueIndex: -1,
        currentBackground:
          storyData.introBg || storyData.dialogues[0]?.background || "",
      })
    );

    if (storyData.rewards) {
      dispatch(setStoryState({ storyRewards: storyData.rewards }));
    }

    if (storyData.bgm && audioRef.current) {
      audioRef.current.src = storyData.bgm;
      audioRef.current
        .play()
        .catch((e) => console.log("[StoryPage] 播放音樂失敗:", e));
    }

    const introTimer = setTimeout(() => {
      if (!hasPlayedIntro.current) {
        console.log("[StoryPage] Intro finished, starting dialogue");
        dispatch(setStoryState({ showIntro: false, currentDialogueIndex: 0 }));
        const firstDialogue = storyData.dialogues[0];
        if (firstDialogue && firstDialogue.text) {
          setDialogueHistory([
            {
              speaker: firstDialogue.speaker || "我",
              text: firstDialogue.text,
            },
          ]);
        }
        hasPlayedIntro.current = true;
      }
    }, INTRO_DURATION);

    return () => {
      console.log("[StoryPage] Cleaning up on unmount");
      clearTimeout(introTimer);
      clearTimeout(autoPlayTimeoutRef.current);
      dispatch(resetStoryState());
      setDialogueHistory([]);
      hasPlayedIntro.current = false;
    };
  }, [storyData, navigate, dispatch, user]);

  useEffect(() => {
    if (showIntro || !storyData || !storyData.dialogues) {
      console.log(
        "[StoryPage] Skipping dialogue effect due to intro or invalid storyData"
      );
      return;
    }

    if (
      currentDialogueIndex < 0 ||
      currentDialogueIndex >= storyData.dialogues.length
    ) {
      console.warn("[StoryPage] Invalid dialogue index:", currentDialogueIndex);
      return;
    }

    const currentDialogue = storyData.dialogues[currentDialogueIndex];
    if (!currentDialogue) {
      console.error("[StoryPage] Current dialogue is undefined");
      return;
    }

    let isCancelled = false;

    dispatch(
      setStoryState({ currentBackground: currentDialogue.background || "" })
    );

    if (currentDialogue.characters) {
      dispatch(setStoryState({ characters: currentDialogue.characters }));
    }

    if (currentDialogue.transition === "fade") {
      dispatch(setStoryState({ fadeIn: true }));
      setTimeout(() => {
        if (!isCancelled) dispatch(setStoryState({ fadeIn: false }));
      }, 1000);
    }

    const fullText =
      currentDialogue.text ||
      currentDialogue.endingTitle ||
      currentDialogue.endingSubTitle ||
      "";
    let i = 0;
    setLocalDisplayedText("");
    dispatch(setStoryState({ isTyping: true }));

    const typingSpeed = isAutoPlay ? (70 - textSpeed) / 2 : 70 - textSpeed;

    const typingInterval = setInterval(() => {
      if (isCancelled) return;

      if (i < fullText.length) {
        setLocalDisplayedText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        dispatch(setStoryState({ isTyping: false, displayedText: fullText }));

        if (currentDialogue.choices) {
          dispatch(setStoryState({ showChoices: true, isAutoPlay: false }));
          clearTimeout(autoPlayTimeoutRef.current);
        } else if (isAutoPlay) {
          if (currentDialogue.ending) {
            dispatch(setStoryState({ isAutoPlay: false }));
            clearTimeout(autoPlayTimeoutRef.current);
            if (currentDialogue.endingType === "NE") {
              autoPlayTimeoutRef.current = setTimeout(() => {
                handleEndingNavigation(currentDialogue);
              }, 2000);
            }
          } else {
            autoPlayTimeoutRef.current = setTimeout(() => {
              handleAutoNextDialogue();
            }, 500);
          }
        }
      }
    }, typingSpeed);

    return () => {
      isCancelled = true;
      clearInterval(typingInterval);
      clearTimeout(autoPlayTimeoutRef.current);
    };
  }, [
    currentDialogueIndex,
    storyData,
    textSpeed,
    isAutoPlay,
    dispatch,
    showIntro,
  ]);

  const handleAutoNextDialogue = () => {
    if (
      !storyData ||
      !storyData.dialogues ||
      currentDialogueIndex >= storyData.dialogues.length
    ) {
      console.log("[StoryPage] handleAutoNextDialogue: No more dialogues");
      dispatch(setStoryState({ isAutoPlay: false }));
      setDialogueHistory([]);
      handleBack();
      return;
    }

    const currentDialogue = storyData.dialogues[currentDialogueIndex];
    if (!currentDialogue) {
      console.error(
        "[StoryPage] Current dialogue is undefined in handleAutoNextDialogue"
      );
      return;
    }

    const hasExitingCharacter = currentDialogue.characters?.some(
      (char) => char.exit
    );

    if (hasExitingCharacter) {
      dispatch(
        setStoryState({
          characters: characters.map((char) => {
            const exitingChar = currentDialogue.characters.find(
              (c) => c.id === char.id && c.exit
            );
            return exitingChar ? { ...char, exiting: true } : char;
          }),
        })
      );

      autoPlayTimeoutRef.current = setTimeout(() => {
        dispatch(
          setStoryState({
            characters: characters.filter((char) => !char.exiting),
          })
        );
        moveToNextDialogue();
      }, 500);
    } else {
      moveToNextDialogue();
    }
  };

  const handleDialogueClick = () => {
    if (isAutoPlay) return;

    if (showIntro) {
      console.log("[StoryPage] Skipping intro via click");
      dispatch(setStoryState({ showIntro: false, currentDialogueIndex: 0 }));
      hasPlayedIntro.current = true;
      const firstDialogue = storyData?.dialogues?.[0];
      if (firstDialogue && firstDialogue.text) {
        setDialogueHistory([
          {
            speaker: firstDialogue.speaker || "我",
            text: firstDialogue.text,
          },
        ]);
      }
      return;
    }

    if (
      !storyData ||
      !storyData.dialogues ||
      currentDialogueIndex < 0 ||
      currentDialogueIndex >= storyData.dialogues.length
    ) {
      console.warn(
        "[StoryPage] Invalid dialogue index or storyData in handleDialogueClick"
      );
      return;
    }

    const currentDialogue = storyData.dialogues[currentDialogueIndex];
    if (!currentDialogue) {
      console.error(
        "[StoryPage] Current dialogue is undefined in handleDialogueClick"
      );
      return;
    }

    if (isTyping) {
      const fullText =
        currentDialogue.text ||
        currentDialogue.endingTitle ||
        currentDialogue.endingSubTitle ||
        "";
      setLocalDisplayedText(fullText);
      dispatch(
        setStoryState({
          isTyping: false,
          displayedText: fullText,
        })
      );

      if (currentDialogue.choices) {
        dispatch(setStoryState({ showChoices: true }));
      }
      return;
    }

    if (showChoices) return;

    if (currentDialogue.ending) {
      console.log("[StoryPage] Ending reached, stopping auto-play");
      dispatch(setStoryState({ isAutoPlay: false }));
      dispatch(resetStoryState());
      setDialogueHistory([]);
      clearTimeout(autoPlayTimeoutRef.current);
      handleEndingNavigation(currentDialogue);
      return;
    }

    const hasExitingCharacter = currentDialogue.characters?.some(
      (char) => char.exit
    );

    if (hasExitingCharacter) {
      dispatch(
        setStoryState({
          characters: characters.map((char) => {
            const exitingChar = currentDialogue.characters.find(
              (c) => c.id === char.id && c.exit
            );
            return exitingChar ? { ...char, exiting: true } : char;
          }),
        })
      );

      setTimeout(() => {
        dispatch(
          setStoryState({
            characters: characters.filter((char) => !char.exiting),
          })
        );
        moveToNextDialogue();
      }, 500);
    } else {
      moveToNextDialogue();
    }
  };

  const moveToNextDialogue = () => {
    const nextIndex = currentDialogueIndex + 1;

    if (
      !storyData ||
      !storyData.dialogues ||
      nextIndex >= storyData.dialogues.length
    ) {
      console.log("[StoryPage] No more dialogues, stopping auto-play");
      dispatch(setStoryState({ isAutoPlay: false }));
      dispatch(resetStoryState());
      setDialogueHistory([]);
      clearTimeout(autoPlayTimeoutRef.current);
      handleBack();
      return;
    }

    const nextDialogue = storyData.dialogues[nextIndex];
    if (nextDialogue && nextDialogue.text) {
      setDialogueHistory((prev) => [
        ...prev,
        {
          speaker: nextDialogue.speaker || "我",
          text: nextDialogue.text,
        },
      ]);
    }

    dispatch(setStoryState({ currentDialogueIndex: nextIndex }));
  };

  const handleChoiceSelect = (nextIndex, choiceText, choiceIndex) => {
    dispatch(setStoryState({ showChoices: false, isAutoPlay: false }));
    setDialogueHistory((prev) => [
      ...prev,
      {
        speaker: "選擇",
        text: ` ${choiceText}`,
      },
    ]);
    clearTimeout(autoPlayTimeoutRef.current);

    if (user?._id && petType && chapterIndex !== undefined) {
      const choiceData = [
        {
          dialogueIndex: currentDialogueIndex,
          choiceIndex,
          nextDialogueIndex: nextIndex,
        },
      ];
      dispatch(
        updateStoryProgress({
          userId: user._id,
          petType,
          chapterIndex,
          choicesMade: choiceData,
        })
      );
    }

    dispatch(setStoryState({ currentDialogueIndex: nextIndex }));
  };

  const handleAutoPlayToggle = () => {
    dispatch(setStoryState({ isAutoPlay: !isAutoPlay }));
    if (isAutoPlay) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
  };

  const handleBack = () => {
    console.log("[StoryPage] Handling back, stopping auto-play");
    dispatch(setStoryState({ isAutoPlay: false }));
    clearTimeout(autoPlayTimeoutRef.current);
    setDialogueHistory([]);

    let destination = returnPath || "/raise-pet";

    let updatedPetData = petData || myPet?.pets?.[petType];
    if (!updatedPetData) {
      updatedPetData = {
        name: `${petType}`,
        type: petType,
        img2: `/images/${petType}.png`,
        stats: { level: 1, exp: 0, hunger: 50, cleanliness: 50, emotion: 50 },
        eventIndex: 1,
        triggeredEvents: [0],
      };
    }

    const updatedStats = {
      ...updatedPetData.stats,
      exp: (updatedPetData.stats.exp || 0) + (storyRewards?.expReward || 0),
      level:
        (updatedPetData.stats.level || 1) + (storyRewards?.levelReward || 0),
      emotion: Math.min(
        100,
        (updatedPetData.stats.emotion || 0) + (storyRewards?.emotionReward || 0)
      ),
      hunger: updatedPetData.stats.hunger || 50,
      cleanliness: updatedPetData.stats.cleanliness || 50,
    };

    const newEventIndex = updatedPetData.eventIndex;

    let newImg2 = updatedPetData.img2 || `/images/${petType}.png`;
    if (newEventIndex > 3) {
      newImg2 = `/images/${
        petType === "neko"
          ? "neko_relaxed"
          : petType === "puppy"
          ? "dog-relaxed"
          : "parrot-relaxed"
      }.png`;
    } else if (newEventIndex > 1) {
      newImg2 = `/images/${
        petType === "neko"
          ? "cat_running"
          : petType === "puppy"
          ? "dog_running"
          : "parrot_running"
      }.png`;
    }

    const finalPetData = {
      ...updatedPetData,
      stats: updatedStats,
      eventIndex: newEventIndex,
      triggeredEvents: updatedPetData.triggeredEvents || [0],
      img2: newImg2,
    };

    if (isReviewMode) {
      console.log("[StoryPage] In review mode, skipping pet data changes");
      navigate(destination);
      return;
    }

    const currentDialogue = storyData?.dialogues?.[currentDialogueIndex];
    let endingType = currentDialogue?.endingType || "HE";

    if (currentDialogue?.ending && user?._id) {
      const endingIdMatch = currentDialogue.endingTitle?.match(/《(.*?)》/);
      const rawEndingName = endingIdMatch
        ? endingIdMatch[1]
        : currentDialogue.endingTitle || "未知結局";

      const possibleCG = allPossibleCGs.find(
        (cg) =>
          cg.petType === (petType || "neko") &&
          cg.endingType === endingType &&
          cg.endingName === rawEndingName
      );

      const endingId = possibleCG ? possibleCG.endingId : 1;
      const cgImage = possibleCG
        ? possibleCG.cgImage
        : currentDialogue.background || "/images/placeholder-cg.png";
      const endingName = possibleCG ? possibleCG.endingName : rawEndingName;

      console.log("[StoryPage] 準備儲存的 CG 資料:", {
        userId: user._id,
        petType: petType || "neko",
        endingType,
        endingId,
        cgImage,
        endingName,
      });

      dispatch(
        unlockCG({
          userId: user._id,
          petType: petType || "neko",
          endingType,
          endingId,
          cgImage,
          endingName,
        })
      );

      if (chapterIndex !== undefined) {
        dispatch(
          updateStoryProgress({
            userId: user._id,
            petType: petType || "neko",
            chapterIndex,
            unlocked: true,
          })
        );
      }
    }

    if (endingType === "TE" || endingType === "BE") {
      destination = "/home";
      if (user?._id) {
        dispatch(deletePetData({ userId: user._id, petType }))
          .then(() => {
            console.log("[StoryPage] Pet data deleted successfully");
            navigate(destination);
          })
          .catch((err) => {
            console.error("[StoryPage] Failed to delete pet data:", err);
            setServerError("無法刪除寵物資料，請稍後重試");
            navigate(destination);
          });
      } else {
        navigate(destination);
      }
    } else {
      if (user?._id) {
        const updatePayload = {
          userId: user._id,
          petType,
          petData: finalPetData,
          lastActivePet: petType,
        };
        dispatch(updatePetData(updatePayload))
          .then(() => {
            console.log("[StoryPage] Pet data updated successfully");
            setServerError(null);
            navigate(destination, {
              state: { updatedPetData: finalPetData, petType },
            });
            // 檢查並同步待處理更新
            if (pendingUpdates.current.length > 0) {
              console.log(
                "[StoryPage] Attempting to sync pending updates:",
                pendingUpdates.current
              );
              pendingUpdates.current.forEach((update) => {
                dispatch(updatePetData(update)).catch((err) => {
                  console.error(
                    "[StoryPage] Failed to sync pending update:",
                    err
                  );
                });
              });
              pendingUpdates.current = [];
            }
          })
          .catch((err) => {
            console.error("[StoryPage] Failed to update pet data:", err);
            setServerError("無法儲存寵物進度，已使用本地資料");
            pendingUpdates.current.push(updatePayload);
            navigate(destination, {
              state: { updatedPetData: finalPetData, petType },
            });
          });
      } else {
        navigate(destination, {
          state: { updatedPetData: finalPetData, petType },
        });
      }
    }

    console.log("[StoryPage] Navigating to:", destination);
  };

  const handleEndingNavigation = (currentDialogue) => {
    const endingType = currentDialogue.endingType || "HE";
    let destination = returnPath || "/raise-pet";

    if (currentDialogue.ending && user?._id) {
      const endingIdMatch = currentDialogue.endingTitle?.match(/《(.*?)》/);
      const rawEndingName = endingIdMatch
        ? endingIdMatch[1]
        : currentDialogue.endingTitle || "未知結局";

      const possibleCG = allPossibleCGs.find(
        (cg) =>
          cg.petType === (petType || "neko") &&
          cg.endingType === endingType &&
          cg.endingName === rawEndingName
      );

      const endingId = possibleCG ? possibleCG.endingId : 1;
      const cgImage = possibleCG
        ? possibleCG.cgImage
        : currentDialogue.background || "/images/black.png";
      const endingName = possibleCG ? possibleCG.endingName : rawEndingName;

      dispatch(
        unlockCG({
          userId: user._id,
          petType: petType || "neko",
          endingType,
          endingId,
          cgImage,
          endingName,
        })
      );

      if (chapterIndex !== undefined) {
        dispatch(
          updateStoryProgress({
            userId: user._id,
            petType: petType || "neko",
            chapterIndex,
            unlocked: true,
          })
        );
      }
    }

    let updatedPetData = petData || myPet?.pets?.[petType];
    if (!updatedPetData) {
      updatedPetData = {
        name: `${petType}`,
        type: petType,
        img2: `/images/${petType}.png`,
        stats: { level: 1, exp: 0, hunger: 50, cleanliness: 50, emotion: 50 },
        eventIndex: 1,
        triggeredEvents: [0],
      };
    }

    const updatedStats = {
      ...updatedPetData.stats,
      exp: (updatedPetData.stats.exp || 0) + (storyRewards?.expReward || 0),
      level:
        (updatedPetData.stats.level || 1) + (storyRewards?.levelReward || 0),
      emotion: Math.min(
        100,
        (updatedPetData.stats.emotion || 0) + (storyRewards?.emotionReward || 0)
      ),
      hunger: updatedPetData.stats.hunger || 50,
      cleanliness: updatedPetData.stats.cleanliness || 50,
    };

    const newEventIndex = updatedPetData.eventIndex;

    let newImg2 = updatedPetData.img2 || `/images/${petType}.png`;
    if (newEventIndex > 3) {
      newImg2 = `/images/${
        petType === "neko"
          ? "neko_relaxed"
          : petType === "puppy"
          ? "dog-relaxed"
          : "parrot-relaxed"
      }.png`;
    } else if (newEventIndex > 1) {
      newImg2 = `/images/${
        petType === "neko"
          ? "cat_running"
          : petType === "puppy"
          ? "dog_running"
          : "parrot_running"
      }.png`;
    }

    const finalPetData = {
      ...updatedPetData,
      stats: updatedStats,
      eventIndex: newEventIndex,
      triggeredEvents: updatedPetData.triggeredEvents || [0],
      img2: newImg2,
    };

    if (isReviewMode) {
      navigate(destination);
      return;
    }

    if (endingType === "TE" || endingType === "BE") {
      destination = "/home";
      if (user?._id) {
        dispatch(deletePetData({ userId: user._id, petType }))
          .then(() => {
            console.log("[StoryPage] Pet data deleted successfully");
            navigate(destination);
          })
          .catch((err) => {
            console.error("[StoryPage] Failed to delete pet data:", err);
            setServerError("無法刪除寵物資料，請稍後重試");
            navigate(destination);
          });
      } else {
        navigate(destination);
      }
    } else {
      if (user?._id) {
        const updatePayload = {
          userId: user._id,
          petType,
          petData: finalPetData,
          lastActivePet: petType,
        };
        dispatch(updatePetData(updatePayload))
          .then(() => {
            console.log("[StoryPage] Pet data updated successfully");
            setServerError(null);
            navigate(destination, {
              state: { updatedPetData: finalPetData, petType },
            });
            // 同步待處理更新
            if (pendingUpdates.current.length > 0) {
              console.log(
                "[StoryPage] Attempting to sync pending updates:",
                pendingUpdates.current
              );
              pendingUpdates.current.forEach((update) => {
                dispatch(updatePetData(update)).catch((err) => {
                  console.error(
                    "[StoryPage] Failed to sync pending update:",
                    err
                  );
                });
              });
              pendingUpdates.current = [];
            }
          })
          .catch((err) => {
            console.error("[StoryPage] Failed to update pet data:", err);
            setServerError("無法儲存寵物進度，已使用本地資料");
            pendingUpdates.current.push(updatePayload);
            navigate(destination, {
              state: { updatedPetData: finalPetData, petType },
            });
          });
      } else {
        navigate(destination, {
          state: { updatedPetData: finalPetData, petType },
        });
      }
    }
  };

  const handleSkip = () => {
    if (!storyData || !storyData.dialogues || currentDialogueIndex < 0) return;

    let nextIndex = currentDialogueIndex;
    const skippedDialogues = [];

    while (nextIndex < storyData.dialogues.length) {
      const dialogue = storyData.dialogues[nextIndex];
      if (!dialogue) break;

      const dialogueText = dialogue.text || "";
      if (dialogueText) {
        skippedDialogues.push({
          speaker: dialogue.speaker || "我",
          text: dialogueText,
        });
      }

      if (dialogue.choices || dialogue.ending) {
        break;
      }
      nextIndex++;
    }

    if (skippedDialogues.length > 0) {
      setDialogueHistory((prev) => [...prev, ...skippedDialogues]);
    }

    if (nextIndex >= storyData.dialogues.length) {
      console.log("[StoryPage] Skip to end, stopping auto-play");
      dispatch(setStoryState({ isAutoPlay: false }));
      dispatch(resetStoryState());
      setDialogueHistory([]);
      clearTimeout(autoPlayTimeoutRef.current);
      handleBack();
    } else {
      dispatch(setStoryState({ currentDialogueIndex: nextIndex }));
    }
  };

  if (!storyData || !storyData.dialogues) {
    console.warn("[StoryPage] Missing storyData or dialogues, showing loading");
    return <div className="loading">載入中...</div>;
  }

  const currentDialogue =
    currentDialogueIndex >= 0 &&
    currentDialogueIndex < storyData.dialogues.length
      ? storyData.dialogues[currentDialogueIndex]
      : null;

  if (!showIntro && !currentDialogue) {
    console.error(
      "[StoryPage] Invalid currentDialogueIndex:",
      currentDialogueIndex
    );
    return <div className="loading">載入中...</div>;
  }

  let endingCG = currentBackground;
  let endingName = "";
  if (currentDialogue?.ending && currentDialogue.endingType !== "NE") {
    const endingIdMatch = currentDialogue.endingTitle?.match(/《(.*?)》/);
    const rawEndingName = endingIdMatch
      ? endingIdMatch[1]
      : currentDialogue.endingTitle || "未知結局";

    const possibleCG = allPossibleCGs.find(
      (cg) =>
        cg.petType === (petType || "neko") &&
        cg.endingType === currentDialogue.endingType &&
        cg.endingName === rawEndingName
    );

    endingCG = possibleCG
      ? possibleCG.cgImage
      : currentDialogue.background || "/images/placeholder-cg.png";
    endingName = possibleCG ? possibleCG.endingName : rawEndingName;
  }

  return (
    <div
      className="story-container"
      onClick={showIntro ? handleDialogueClick : undefined}
    >
      {serverError && <p className="error-message">{serverError}</p>}
      <div className="top-left-icons-story">
        {/* menu */}
        <button
          className="icon-button"
          onClick={() => dispatch(setShowMenu(true))}
        >
          <img
            src="/images/storyBtn/button_menu.png"
            alt="menu"
            className="icon-img"
            style={{ width: "35vh" }}
          />
        </button>
        {/* 自動撥放鍵 */}
        <button className="icon-button" onClick={handleAutoPlayToggle}>
          <div className="skip">
            {!isAutoPlay ? (
              <img
                src="/images/storyBtn/button_auto.png"
                alt="自動撥放鍵"
                className="icon-img"
              />
            ) : (
              <img
                src="/images/storyBtn/button_pause.png"
                alt="自動暫停鍵"
                className="icon-img"
              />
            )}
          </div>
        </button>
        {/* skip鍵 */}
        <button className="icon-button" onClick={handleSkip}>
          <div className="skip">
            <img src="/images/storyBtn/button_skip.png" alt="skip鍵" />
          </div>
        </button>
      </div>
      <div className="top-right-icons-story">
        {/* 對話文本Log */}
        <button
          className="icon-button"
          onClick={() => dispatch(setStoryState({ showLog: true }))}
        >
          <div className="skip">
            <img src="/images/storyBtn/button_return.png" alt="文本Log" />
          </div>
        </button>
      </div>
      <audio ref={audioRef} loop />
      <div
        className={`story-background ${fadeIn ? "fade-in" : ""} ${
          fadeOut ? "fade-out" : ""
        }`}
        style={{ backgroundImage: `url(${endingCG || currentBackground})` }}
      />
      {showIntro && (
        <div className="intro-container">
          <div className="intro-animation">
            <div className="chapter-title-intro">
              <h1>{storyData.title}</h1>
            </div>
            {storyData.subtitle && (
              <div className="chapter-subtitle">
                <h2>{storyData.subtitle}</h2>
              </div>
            )}
            <div className="skip-hint">點擊畫面跳過</div>
            <div className="intro-overlay"></div>
          </div>
        </div>
      )}
      {!showIntro && currentDialogue && (
        <div className="characters-container">
          {characters.map((character, index) => (
            <div
              key={`${character.id}-${index}`}
              className={`character ${character.position || "center"} ${
                character.entrance ? "entering" : ""
              } ${character.exiting ? "exiting" : ""}`}
              style={{
                left:
                  character.position === "left"
                    ? "10%"
                    : character.position === "right"
                    ? "60%"
                    : "35%",
                transform:
                  character.position === "center" ? "translateX(-50%)" : "none",
              }}
            >
              <img src={character.image} alt={character.id} />
            </div>
          ))}
        </div>
      )}
      {!showIntro && currentDialogue && (
        <div
          className={`dialogue-box ${
            currentDialogue.ending && currentDialogue.endingType !== "NE"
              ? "hidden"
              : ""
          }`}
          onClick={handleDialogueClick}
        >
          {!currentDialogue.ending && (
            <div className="dialogue-text">
              <div className="dialogue-speaker">
                {currentDialogue.speaker || "我"}
              </div>
              <div className="dialogue-content">
                {localDisplayedText}
                {isTyping ? (
                  <span className="typing-cursor">|</span>
                ) : (
                  !showChoices && <div className="continue-indicator">▼</div>
                )}
              </div>
            </div>
          )}
          {currentDialogue.choices && (
            <div className="choices-container">
              {currentDialogue.choices.map((choice, index) => (
                <button
                  key={index}
                  className="choice-button"
                  onClick={() =>
                    handleChoiceSelect(
                      choice.nextDialogueIndex,
                      choice.text,
                      index
                    )
                  }
                >
                  <p className="choice-text">{choice.text}</p>
                </button>
              ))}
            </div>
          )}
          {currentDialogue.ending && currentDialogue.endingType === "NE" && (
            <div className="dialogue-text">
              <div className="dialogue-speaker">
                {currentDialogue.speaker || "我"}
              </div>
              <div className="dialogue-content">
                {localDisplayedText || currentDialogue.endingSubTitle}
                {isTyping ? (
                  <span className="typing-cursor">|</span>
                ) : (
                  <div className="continue-indicator">▼</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {currentDialogue?.ending && currentDialogue.endingType !== "NE" && (
        <>
          <div
            className="ending-container"
            onClick={() => handleEndingNavigation(currentDialogue)}
          >
            <div className="ending-name">
              <p>達成結局《{endingName}》</p>
              <p className="ending-subTitle">
                {currentDialogue.endingSubTitle}
              </p>
            </div>
          </div>
          <p className="click-to-continue">*點擊畫面繼續</p>
        </>
      )}
      <MenuPanel />
      {showLog && (
        <DialogueLog
          logData={dialogueHistory}
          onClose={() => dispatch(setStoryState({ showLog: false }))}
        />
      )}
    </div>
  );
};

export default StoryPage;
