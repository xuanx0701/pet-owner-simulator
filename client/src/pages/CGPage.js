import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCGs } from "../store/cgSlice";
import "./CGStyle/CGStyle.css";

const CGPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const { cgs, loading, error } = useSelector((state) => state.cg);

  const [selectedPet, setSelectedPet] = useState("neko");
  const [unlockedPets, setUnlockedPets] = useState([]);
  const [magnifyMode, setMagnifyMode] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null); // 當前放大的圖片
  const [zoomedTitle, setZoomedTitle] = useState(""); // 當前放大的結局標題

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const userId = user._id || user.userId;
    if (userId) {
      dispatch(fetchCGs(userId)).then(() => {
        console.log("Fetched CGs:", cgs);
      });
    }
  }, [dispatch, user, navigate]);

  useEffect(() => {
    if (cgs && cgs.length > 0) {
      const pets = [...new Set(cgs.map((cg) => cg.petType))];
      setUnlockedPets(pets);
      if (!pets.includes("neko") && pets.length > 0) {
        setSelectedPet(pets[0]);
      }
    }
  }, [cgs]);

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
      endingName: "未解鎖結局",
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

  const displayCGs = allPossibleCGs
    .filter((cg) => cg.petType === selectedPet)
    .map((possibleCG) => {
      const cleanedPossibleEndingName = possibleCG.endingName.replace(
        /[《》]/g,
        ""
      );
      const unlockedCG = cgs.find(
        (cg) =>
          cg.petType === possibleCG.petType &&
          cg.endingType === possibleCG.endingType &&
          cg.endingId === possibleCG.endingId &&
          cg.endingName.replace(/[《》]/g, "") === cleanedPossibleEndingName
      );
      return unlockedCG
        ? { ...unlockedCG, unlocked: true, cgImage: possibleCG.cgImage }
        : { ...possibleCG, unlocked: false };
    })
    .sort((a, b) => {
      const order = { BE: 1, TE: 2, HE: 3 };
      return (
        order[a.endingType] - order[b.endingType] || a.endingId - b.endingId
      );
    });

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
  };

  const handleZoomImage = (cgImage, endingName) => {
    setZoomedImage(cgImage);
    setZoomedTitle(endingName);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
    setZoomedTitle("");
  };

  const toggleMagnifyMode = () => {
    setMagnifyMode((prev) => !prev);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="cg-page">
      {zoomedImage && (
        <div className="zoom-modal" onClick={handleCloseZoom}>
          <img src={zoomedImage} alt="Zoomed CG" className="zoomed-image" />
          <div className="zoom-title">
            <p>{zoomedTitle}</p>
          </div>
          <div className="close-zoom">
            <img src="/images/back-arrow.png" alt="返回箭頭" />
          </div>
        </div>
      )}

      {!magnifyMode && (
        <div className="top-left-icons-cg">
          <button className="icon-button" onClick={() => navigate("/home")}>
            <img
              src="/images/back-arrow.png"
              alt="回首頁"
              className="icon-img"
            />
          </button>
        </div>
      )}

      <div className="cg-container">
        {!magnifyMode && (
          <div className="pet-tabs">
            {["neko", "dog", "parrot"].map((pet) => (
              <div
                key={pet}
                className={`pet-tab ${selectedPet === pet ? "active" : ""}`}
                onClick={() => handlePetSelect(pet)}
                style={{
                  backgroundColor: "#ece6df",
                  border: `2px solid #8a5c40`,
                }}
              >
                <img
                  src={
                    unlockedPets.includes(pet) && selectedPet === pet
                      ? `/images/${pet}.png`
                      : `/images/${pet}-shadow.png`
                  }
                  alt={pet}
                  className="pet-icon"
                />
              </div>
            ))}
          </div>
        )}

        <div className="cg-gallery">
          {loading && <p>載入中...</p>}
          {error && <p className="error">錯誤: {error}</p>}
          <div className="cg-grid">
            {displayCGs.map((cg, index) => (
              <div
                key={`${cg.petType}-${cg.endingType}-${cg.endingId}`}
                className="cg-card"
                style={{
                  marginTop: index % 2 === 0 ? "0" : `30vh`,
                }}
              >
                <div className="cg-frame">
                  {cg.unlocked && (
                    <img
                      src={cg.cgImage}
                      alt={cg.endingName}
                      className="cg-image"
                      onClick={() => handleZoomImage(cg.cgImage, cg.endingName)}
                    />
                  )}
                  {!magnifyMode && (
                    <>
                      <p>{cg.unlocked ? cg.endingName : "尚未解鎖"}</p>
                      <img
                        src="/images/cg_frame_locked.png"
                        alt="上鎖圖片"
                        className="lock-img"
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGPage;
