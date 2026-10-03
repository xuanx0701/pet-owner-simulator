const chapter01Event = {
  title: "Chapter 01 本小姐今天心情好",
  subtitle: "今天天氣真是好得過分。",
  introBg: "/images/sunny_day.png", // Background for the introduction
  bgm: "/audio/bgm.mp3", // Background music
  rewards: {
    expReward: 0,
    levelReward: 1,
    emotionReward: 20,
  },
  dialogues: [
    {
      background: "/images/sunny_background.png",
      text: "天空一整片湛藍，太陽像塊閃閃發光的黃金，暖得剛剛好。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/sunny_background.png",
      text: "不會黏膩，也不會讓妝花。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/sunny_background.png",
      text: "本小姐戴著墨鏡、穿著新買的法國小眾洋裝，踩著訂製限量高跟鞋。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/sunny_background.png",
      text: "連太陽都懂得怎麼配合我這種氣質非凡的存在。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/sunny_background.png",
      text: "我啜了口冰拿鐵，突然一個念頭從腦中彈出──「天氣這麼好，是不是……養隻狗？」",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/sunny_background.png",
      text: "對嘛，這種日子就該配一隻可愛、聽話又上鏡的狗狗。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/sunny_background.png",
      text: "讓牠陪我走紅毯般的街道，在陽光下拍幾張限時動態，然後再找間下午茶店坐下，好好享受身為人間貴族的生活。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/sunny_background.png",
      text: "「啊！」我眼睛一亮，一家寵物店就在前面，像是被命運安排在那裡等我多年似的。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/sunny_background.png",
      text: "我停下腳步，掏出手機自拍一張：「#今天天氣真好 #適合買狗狗」。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "招牌雖然有點土，但本小姐今天心情好，就賞他一次機會。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "推門進去，步伐優雅如伸展台女王，店員滿臉堆笑地迎了上來。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "我揮揮手：「不用介紹，我自己選。」",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "我走過一排又一排的狗籠，毛絨絨的、短腿的、長耳朵的、雙眼像會放電那種……唔，還真是選擇困難。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "然後，我的目光被一隻狗吸引。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "說實話，牠看起來不是特別可愛，也沒有名種那種高貴的氣息。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "毛有點亂，眼神呆呆的，甚至還有點癡癡地看著我流口水。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "「就、就牠嗎？」養這隻狗？",
      characters: [],
      speaker: "我",
    },
    // 17
    {
      background: "/images/pet_shop.png",
      text: "選選牠",
      choices: [
        {
          text: "選牠",
          nextDialogueIndex: 18,
        },
        {
          text: "算了",
          nextDialogueIndex: 23,
        },
      ],
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "「選牠！」我對自己說，聲音忽然大了一點，像是怕反悔似的。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "於是我刷了卡，買了狗。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "多麼果斷，多麼帥氣，完全符合本小姐的風格。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "哼，拜託，我可是超級有錢的大小姐，還有什麼是我得不到的？",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      endingSubTitle:
        "我已經在腦中想好接下來幫牠買什麼穿搭、搭配什麼濾鏡、開幾個追蹤帳號了。",
      characters: [],
      speaker: "我",
      ending: true,
      endingTitle: "",
      endingType: "NE",
    },
    {
      background: "/images/pet_shop.png",
      text: "「……等等。」我看著狗，越看越覺得哪裡不對，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "「牠的毛……是不是有點太亂了？還有……好像有點味道？」",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "跟著我一路的店員愣了一下，尷尬笑道：「嗯，狗狗有時候會流口水……。」",
      characters: [],
      speaker: "店員",
    },
    {
      background: "/images/pet_shop.png",
      text: "「口水？」我倒退一步，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "「天啊，那不是很髒嗎？我剛做完指甲耶……。」",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "我皺著鼻子，盯了狗一眼。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "「不行，突然不想養了，算了。」我拍拍手包，轉身走出店門，鞋跟踩在地上發出清脆聲響。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "「留給別人吧，我的手包不需要口水這個配件。」",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/pet_shop.png",
      text: "走出店的那一瞬間，陽光依舊明媚。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingTitle: "達成結局《我的手包不需要口水》",
      endingSubTitle:
        "喜怒無常的人還是別養寵物比較好。\n有些生命，不是用來填補心情空虛的裝飾品。",
      characters: [],
      ending: true,
      endingType: "BE",
    },
  ],
};

export default chapter01Event;
