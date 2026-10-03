const express = require("express");
const Pet = require("../models/Pet");
const router = express.Router();

// 獲取寵物資料
router.get("/:userId", async (req, res) => {
  try {
    console.log(
      `[GET /api/pet/:userId] Fetching pet data for userId: ${req.params.userId}`
    );
    const pet = await Pet.findOne({ userId: req.params.userId });
    if (!pet) {
      console.log(
        `[GET /api/pet/:userId] No pet found for userId: ${req.params.userId}, returning default`
      );
      return res.json({ pets: {}, lastActivePet: "neko" });
    }
    console.log(`[GET /api/pet/:userId] Pet data found:`, pet);
    res.json(pet);
  } catch (err) {
    console.error(
      "[GET /api/pet/:userId] Error fetching pet data:",
      err.message,
      err.stack
    );
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 更新寵物資料
router.post("/:userId", async (req, res) => {
  try {
    const { petType, petData, lastActivePet } = req.body;

    // 驗證輸入
    if (!petType || !petData) {
      console.error("[POST /api/pet/:userId] Missing petType or petData:", {
        petType,
        petData,
      });
      return res.status(400).json({ message: "缺少 petType 或 petData" });
    }

    // 驗證 petData 結構
    if (
      !petData.stats ||
      typeof petData.stats !== "object" ||
      !petData.eventIndex ||
      !Array.isArray(petData.triggeredEvents)
    ) {
      console.error(
        "[POST /api/pet/:userId] Invalid petData structure:",
        petData
      );
      return res.status(400).json({ message: "petData 結構不完整" });
    }

    let pet = await Pet.findOne({ userId: req.params.userId });

    if (!pet) {
      console.log(
        `[POST /api/pet/:userId] No pet found for userId: ${req.params.userId}, creating new`
      );
      pet = new Pet({
        userId: req.params.userId,
        pets: new Map(),
        lastActivePet: petType || "neko",
      });
    }

    // 確保 pets 是 Map 類型
    if (!(pet.pets instanceof Map)) {
      console.log(
        `[POST /api/pet/:userId] Converting pets to Map for userId: ${req.params.userId}`
      );
      pet.pets = new Map(Object.entries(pet.pets || {}));
    }

    // 準備更新的寵物數據
    const existingPetData = pet.pets.get(petType) || {};
    const updatedPetData = {
      name: petData.name || existingPetData.name || `${petType}`,
      type: petType,
      img2: petData.img2 || existingPetData.img2 || `/images/${petType}.png`,
      stats: {
        level: petData.stats.level || existingPetData.stats?.level || 1,
        exp: petData.stats.exp || existingPetData.stats?.exp || 0,
        hunger: petData.stats.hunger || existingPetData.stats?.hunger || 50,
        cleanliness:
          petData.stats.cleanliness || existingPetData.stats?.cleanliness || 50,
        emotion: petData.stats.emotion || existingPetData.stats?.emotion || 50,
      },
      eventIndex: petData.eventIndex || existingPetData.eventIndex || 1,
      triggeredEvents: petData.triggeredEvents ||
        existingPetData.triggeredEvents || [0],
      createdAt: existingPetData.createdAt || new Date(),
    };

    console.log(
      `[POST /api/pet/:userId] Updating pet data for ${petType}:`,
      updatedPetData
    );
    pet.pets.set(petType, updatedPetData);

    // 更新最後活躍寵物
    if (lastActivePet) {
      pet.lastActivePet = lastActivePet;
    }

    await pet.save();
    console.log(
      `[POST /api/pet/:userId] Pet data updated successfully:`,
      pet.toObject()
    );
    res.json(pet.toObject());
  } catch (err) {
    console.error(
      "[POST /api/pet/:userId] Error updating pet data:",
      err.message,
      err.stack
    );
    res.status(500).json({ message: "伺服器錯誤", error: err.message });
  }
});

// 刪除特定寵物資料
router.delete("/:userId/:petType", async (req, res) => {
  try {
    const { userId, petType } = req.params;
    console.log(
      `[DELETE /api/pet/:userId/:petType] Deleting pet ${petType} for userId: ${userId}`
    );
    const pet = await Pet.findOne({ userId });
    if (!pet || !pet.pets.get(petType)) {
      console.log(
        `[DELETE /api/pet/:userId/:petType] Pet ${petType} not found for userId: ${userId}`
      );
      return res.status(404).json({ message: "寵物不存在" });
    }
    pet.pets.delete(petType);
    if (pet.lastActivePet === petType) {
      const remainingPets = Array.from(pet.pets.keys());
      pet.lastActivePet = remainingPets.length > 0 ? remainingPets[0] : "neko";
      console.log(
        `[DELETE /api/pet/:userId/:petType] Updated lastActivePet to: ${pet.lastActivePet}`
      );
    }
    await pet.save();
    console.log(
      `[DELETE /api/pet/:userId/:petType] Pet ${petType} deleted successfully`
    );
    res.status(204).send();
  } catch (err) {
    console.error(
      "[DELETE /api/pet/:userId/:petType] Error deleting pet data:",
      err.message,
      err.stack
    );
    res.status(500).json({ message: "無法刪除寵物數據" });
  }
});

module.exports = router;
