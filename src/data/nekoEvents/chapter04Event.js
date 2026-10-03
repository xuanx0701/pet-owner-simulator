// src/data/nekoEvents/chapter04Event.js
const chapter04Event = {
  title: "Chapter 04",
  subtitle: "鳳凰花開，何去何從",
  introBg: "/images/room.png",
  bgm: "/audio/bgm.mp3",
  rewards: {
    expReward: 0,
    levelReward: 1,
    emotionReward: 20,
  },
  dialogues: [
    {
      background: "/images/room.png",
      text: "一一晃眼，四年過去，還有一個月，就要畢業了。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我站在熟悉的小套房裡，房東送的貓抓板還在服役中，上面都是小貓的痕跡，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "而而牠──一如既往地靜靜躺在陽光曬得到的角落。",
      characters: [
        {
          id: "cat",
          image: "/images/cat_soft.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "小小貓還是像從前一樣，不吵不鬧，像是一種被生活溫柔包住的沉默。",
      characters: [
        { id: "cat", image: "/images/cat_soft.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "腦腦海裡，突然閃過那個午後，我們初次相遇的畫面。",
      characters: [
        {
          id: "cat",
          image: "/images/cat_soft.png",
          position: "right",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "那那時我剛上大學，人生地不熟，壓力大得喘不過氣。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "偶偶然或命運，我在校園邊的榕樹下發現了牠。",
      characters: [
        {
          id: "cat_sick",
          image: "/images/cat_sick.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "牠牠縮在樹木後面，骨瘦如柴，卻還努力地舔著一塊發霉的麵包。",
      characters: [
        { id: "cat_sick", image: "/images/cat_sick.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "四四下沒人，我悄悄蹲下，從便利商店帶來的鮪魚飯糰掰了一點放在掌心。",
      characters: [
        { id: "cat_sick", image: "/images/cat_sick.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "牠牠猶豫了一下，終於走近，舔了舔，然後抬頭看我一眼。",
      characters: [
        {
          id: "cat_yawn",
          image: "/images/neko_relaxed.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "就就是那一眼，我記到現在。",
      characters: [
        {
          id: "cat_yawn",
          image: "/images/neko_relaxed.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "後後來我常去那塊地，每次牠都等我，有時蹭我腿，有時靜靜陪我坐著看天。",
      characters: [
        {
          id: "cat_yawn",
          image: "/images/neko_relaxed.png",
          position: "right",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "那那片被我戲稱為「秘密基地」的小空地，成了我逃避現實的角落，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "而而牠，是那段低谷裡唯一的暖光。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "再再後來，我把牠帶回這個租屋處，偷偷收養。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "牠牠從害羞到撒嬌，從在門邊等我到主動跳上我的腿打盹。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我們一起過了颱風天、期末考、情人節、無數個失眠的夜晚。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "牠牠不只是我的寵物，更是我在異鄉唯一真正的家人。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我要走了，小貓怎麼辦？",
      characters: [],
      speaker: "我",
    },
    // index 19 小貓怎麼辦分支選項
    {
      background: "/images/room.png",
      text: "小小貓怎麼辦？",
      characters: [],
      speaker: "我",
      choices: [
        {
          text: "一起走",
          nextDialogueIndex: 20,
        },
        {
          text: "向房東請教",
          nextDialogueIndex: 50,
        },
        {
          text: "棄養吧",
          nextDialogueIndex: 124,
        },
      ],
    },
    // index 20 一起走分支
    {
      background: "/images/room.png",
      text: "我我蹲下來，撫摸牠的頭，牠輕輕「喵」了一聲。",
      characters: [
        {
          id: "cat",
          image: "/images/neko_lying.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "不不是抗議，也不是挽留，像是說：「去哪，我都陪你。」",
      characters: [
        { id: "cat", image: "/images/neko_lying.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我忽然笑了，眼眶卻濕了。",
      characters: [
        {
          id: "cat",
          image: "/images/neko_lying.png",
          position: "right",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「走吧，我們一起回家。」",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "這這一段租屋的日子會結束，但小貓還在，記憶還在。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "那那些我們一起走過的片段，像書頁被翻動，聲音輕輕，但留下的字句刻骨銘心。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "離離去的那天，我輕輕地把牠放進準備好的背包裡，牠窩在熟悉的毛毯上，一邊打哈欠一邊看我忙進忙出。",
      characters: [
        {
          id: "cat",
          image: "/images/neko_lying.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "門門被關上，人生翻了篇。",
      characters: [
        {
          id: "cat",
          image: "/images/neko_lying.png",
          position: "right",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "但但這次，不再是孤身一人。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/train.png",
      text: "然然而，上了高鐵的前一刻，我才發現——寵物要裝箱才能上車！",
      characters: [],
      speaker: "我",
    },
    // index 30 怎麼辦分支選項？
    {
      background: "/images/train.png",
      text: "怎怎麼辦？",
      characters: [],
      speaker: "我",
      choices: [
        {
          text: "丟包在高鐵站",
          nextDialogueIndex: 31,
        },
        {
          text: "隨便買個塑膠箱",
          nextDialogueIndex: 36,
        },
        {
          text: "買個好的寵物箱",
          nextDialogueIndex: 42,
        },
      ],
    },
    // index 31 丟包在高鐵站分支
    {
      background: "/images/train.png",
      text: "我我低頭看著牠，牠也仰著頭看我，像是在問：「我們要去哪？」",
      characters: [
        {
          id: "cat",
          image: "/images/neko_lying.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/train.png",
      text: "最最後，我咬牙轉身，把牠留在了台北車站的某個角落。",
      characters: [
        { id: "cat", image: "/images/neko_lying.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/train.png",
      text: "「「有緣再相見吧……」我喃喃地說。",
      characters: [
        { id: "cat", image: "/images/neko_lying.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/wtf.png",
      text: "那那一刻，小貓的表情只有三個字能形容：傻眼貓咪。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingTitle: "《傻眼貓咪》",
      endingSubTitle: "太瞎了吧。",
      characters: [],
      ending: true,
      endingType: "BE",
    },
    // index 36 隨便買個塑膠箱
    {
      background: "/images/train.png",
      text: "在在車站附近，我隨便買了個塑膠箱，手提就走。",
      characters: [
        {
          id: "plastic",
          image: "/images/plastic.png",
          position: "center",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/train.png",
      text: "省省錢第一，方便就好。",
      characters: [
        {
          id: "plastic",
          image: "/images/plastic.png",
          position: "center",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/train.png",
      text: "上上車後我太累了，滑手機滑到忘我，連小貓悶得沒動靜都沒注意到。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "等等我到家，打開箱子時，",
      characters: [
        {
          id: "suffocate",
          image: "/images/suffocate.png",
          position: "center",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "只只剩一片沉默。",
      characters: [
        {
          id: "suffocate",
          image: "/images/suffocate.png",
          position: "center",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingTitle: "《當我悶痛在一起》",
      endingSubTitle:
        "便宜沒好貨，不要貪便宜。\n你以為自己做了對的選擇，但錯在不夠用心。\n小貓的旅程，永遠停在了那個密不透氣的塑膠牢籠裡。",
      characters: [],
      ending: true,
      endingType: "BE",
    },
    // index 42 買個好的寵物箱
    {
      background: "/images/train.png",
      text: "我我花了時間，挑了個透氣良好、空間充足的寵物專用箱，還鋪上牠最喜歡的小毛毯。",
      characters: [
        {
          id: "box",
          image: "/images/box.png",
          position: "center",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/train.png",
      text: "上上車時，牠窩在裡頭安穩地睡著了，",
      characters: [
        {
          id: "box",
          image: "/images/box.png",
          position: "center",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/train.png",
      text: "我我不時低頭看看，確保牠沒事。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/train.png",
      text: "這這一趟路，我們都平安，也都安心。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "回回到家，牠跳出箱子，",
      characters: [
        {
          id: "cat",
          image: "/images/neko_running.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "第第一件事是探索新環境，第二件事是跑回來蹭我腳。",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "從從此，我們過上幸福又快樂的生活。",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingTitle: "《當我們同在一起》",
      endingSubTitle:
        "你是個細心又善良的飼主。\n你和牠一起，平凡卻幸福地，走過了很多很多年。",
      characters: [],
      ending: true,
      endingType: "HE",
    },
    // index 50 向房東請教
    {
      background: "/images/room.png",
      text: "我我站在門邊，握著手機，看著訂票頁面發呆。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "───如果帶牠回去，得先買個品質好的寵物箱，搭高鐵、轉公車，再到家……",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "家家裡還得先消毒，買好飼料砂盆。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "但但即使一切都安排妥當，出社會後呢？",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "新新環境、忙碌的工作，搬來搬去，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我有辦法讓牠繼續像現在這樣，被愛、被照顧得那麼好嗎？",
      characters: [],
      speaker: "我",
    },
    // index 56
    {
      background: "/images/room.png",
      text: "我我不確定。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "思思來想去，實在太多不安、太多未知，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我走到樓下，敲開那扇我總是有點怕打擾的門。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "我我鼓起勇氣敲了房東的門。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "他他開門的時候，小貓也跟在我腳邊，像知道這是場重要的談話。",
      characters: [
        {
          id: "cat",
          image: "/images/neko_lying.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    // index 61
    {
      background: "/images/tearoom.png",
      text: "牠牠蹭了蹭我的腳背，然後抬頭看著房東，眼神亮晶晶的。",
      characters: [
        { id: "cat", image: "/images/neko_lying.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "房房東開門時正在泡茶，看到我帶著小貓，笑說：",
      characters: [
        { id: "cat", image: "/images/neko_lying.png", position: "right" },
        {
          id: "teapot",
          image: "/images/teapot.png",
          position: "center",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「又出來散步啊？」",
      characters: [
        { id: "cat", image: "/images/neko_lying.png", position: "right" },
        {
          id: "teapot",
          image: "/images/teapot.png",
          position: "center",
          exit: true,
        },
        {
          id: "landlord",
          image: "/images/landlord_happy.png",
          position: "left",
          entrance: true,
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "我我乾笑了一聲，但沒回話，反而低頭看著懷裡的小貓，輕聲說：",
      characters: [
        { id: "cat", image: "/images/neko_lying.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord_happy.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「房東，我有件事……想請教您。」",
      characters: [
        { id: "cat", image: "/images/neko_lying.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord_happy.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    // index 66
    {
      background: "/images/tearoom.png",
      text: "他他見我語氣不對，",
      characters: [
        { id: "cat", image: "/images/neko_lying.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord_happy.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「什麼事啊？」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "我我咬了咬牙，把心裡的煩惱說了出來。沒有冗長的故事，也沒有情緒渲染，只是一件一件，像清點一樣，把那些我做不到的部分坦白。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「我要畢業了。」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「也要離開台北……但我還不知道小貓該怎麼辦。」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    // index 71
    {
      background: "/images/tearoom.png",
      text: "「「我真的很喜歡牠，但我不敢保證，以後還能讓牠過得像現在一樣好……」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "房房東靜靜地聽著，沒打斷。他的表情比我想像的溫柔許多。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "語語畢，沉默了一會兒，他摸了摸小貓的頭，牠竟然沒閃。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「……你知道，我當初怎麼發現你偷養這傢伙的嗎？」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "我我搖搖頭，從未仔細思考過。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    // index 76
    {
      background: "/images/tearoom.png",
      text: "「「其實，是因為牠跑來我陽台，踩壞了我的植物。」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "「「當時，我就好奇了，哪裡來的貓兒？」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "「「我一路跟著他走，發現牠溜回了你那間房。」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "我我一愣，他繼續說：",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    // 80
    {
      background: "/images/tearoom.png",
      text: "「「過了這麼久，我也不是來責怪你，我的意思是──牠也好像不太排斥我啊。」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "「「不如，讓我來照顧牠？」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "令令人意外地，房東說，牠願意接手小貓。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "我我看著房東，再看向小貓──",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "牠牠竟然一副「早知道會這樣」的模樣，趴在我的腿上，尾巴搖得悠哉。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    // index 85 該放手嗎分支選項
    {
      background: "/images/tearoom.png",
      text: "該該放手嗎？",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
      choices: [
        {
          text: "給房東養",
          nextDialogueIndex: 86,
        },
        {
          text: "不給他養",
          nextDialogueIndex: 113,
        },
      ],
    },
    // index 86 給房東養分支
    {
      background: "/images/tearoom.png",
      text: "我我愣住了，一時之間不知道該說什麼。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "房房東低頭看著小貓，笑得像個孩子，",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「我一個人住這麼久了，也該有個伴了。而且，我也早就看牠看得很喜歡啦。」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "我我看著他抱起小貓，那畫面意外地和諧。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "牠牠沒有掙扎，只是發出一聲慵懶的呼嚕。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    // index 91
    {
      background: "/images/tearoom.png",
      text: "我我笑了，眼淚卻在眼眶打轉。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「好，謝謝房東。」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我放心地把小貓託付給房東的那天，天氣出奇地好，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "陽陽光暖洋洋地灑進屋子，像是老天爺也默默祝福這個離別的決定。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "房房東把牠抱進懷裡的時候，小貓沒有掙扎，只是眨了眨眼，像在說：",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「哦，原來你早就安排好了啊。」",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我忍不住笑了，雖然眼眶有點酸。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "也也許，有時候，最好的選擇，不是緊緊抓住，而是放心地交給一個，真的願意好好對待牠的人。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "房房東不是那種會講很多感性話的人，但從他添購的自動餵食器、舒適貓窩、還有架到窗邊的貓跳台，我就知道",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "───他不只是養牠，而是真的在「對牠好」。",
      characters: [],
      speaker: "我",
    },
    // 101
    {
      background: "/images/train.png",
      text: "畢畢業後我回到家鄉，生活像洪水一樣一口氣湧上來。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/train.png",
      text: "工工作、加班、租屋、搬家，每天都像踩在一塊會沉的浮板上，努力維持平衡。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/train.png",
      text: "但但偶爾，我還是會抽出幾天回房東家探望。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "我我敲開熟悉的門，小貓一下就從屋裡竄出來，在我腳邊打轉、撒嬌，一點也沒變，反而胖了一圈。",
      characters: [
        {
          id: "cat",
          image: "/images/neko_running.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "房房東在後頭笑：「牠現在可是這整棟公寓的明星，連超商店員都認識牠！」",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
          entrance: true,
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "我我摸著牠的頭，",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「你過得不錯嘛，小傢伙。」",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "小小貓呼嚕地回應，尾巴輕輕掃過我的手背。",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "我我望著這熟悉又安心的一幕，心裡忽然升起一種很平靜的感覺——不是遺憾、不是羨慕，而是一種很單純的快樂。",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "在在遙遠的地方，牠過得很好。",
      characters: [],
      speaker: "我",
    },
    // 111
    {
      background: "/images/tearoom.png",
      text: "這這樣就夠了。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      endingTitle: "《千里之外》",
      endingSubTitle:
        "這是最好的安排。\n房東有時間、有資源、也有愛。\n你放心地離開，小貓也從未孤單。",
      characters: [],
      ending: true,
      endingType: "BE",
    },
    // index 113 不給他養分支
    {
      background: "/images/tearoom.png",
      text: "我我搖了搖頭，勉強擠出個笑容，",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「謝謝房東，不過我想再看看……或許還有更適合牠的地方。」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "終終究是陪伴我多年的伙伴，我實在不願拱手讓人。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "然然而，話一出口，我就感覺氣氛變了。",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "房房東皺起眉頭，語氣一反之前的和善，",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tearoom.png",
      text: "「「你是不是太自以為是了？住在我這裡偷偷養貓，現在倒拿我當備胎？你這種人，根本不配養寵物。」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
        {
          id: "landlord",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/tearoom.png",
      text: "我我愣在原地，一句話也說不出來。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "之之後的日子，我和房東再沒講過話。原本偶爾會收到他的貓罐頭或貓砂支援也都斷了。",
      characters: [],
      speaker: "我",
    },
    // 121
    {
      background: "/images/room.png",
      text: "((小貓的生活品質一夜下降，也不像以前那樣活潑，常常窩在角落裡不動。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我想，牠可能也察覺了──我們失去了某個重要的後盾。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      endingTitle: "《惹毛房東》",
      endingSubTitle:
        "你與房東的關係就此決裂，小貓失去了贊助商，生活水準明顯下降。眼看生活無法繼續，你只好把小貓送給網友領養，再也見不到小貓。",
      characters: [],
      ending: true,
      endingType: "BE",
    },
    // 124 棄養吧分支
    {
      background: "/images/room.png",
      text: "雖雖然小貓陪了我這麼多年，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "但但老實說，我早已失去對於養寵物的熱情。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "恰恰逢畢業，看來我和小貓是真的沒有緣分了。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "牠牠坐在窗邊，一如往常，用尾巴繞著身體，眼神帶著幾分慵懶，也有幾分信任。那是無數次曾依賴過我的目光。",
      characters: [
        {
          id: "cat",
          image: "/images/neko_relaxed.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「See you !」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "牠牠傻傻地歪了歪頭，似乎沒聽懂，還伸出爪子撥了撥我垂下的袖子，像是在問：「那是什麼意思？」",
      characters: [
        { id: "cat", image: "/images/neko_relaxed.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "我我迅速打開房門，心情愉悅的把小貓丟出去。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "小小貓嚇了一大跳，一臉困惑不解，以為我在跟牠玩鬧，嫌棄地叫了兩聲，讓我放牠回去。",
      characters: [
        {
          id: "cat",
          image: "/images/cat-crazy.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "我我才不要勒。",
      characters: [
        { id: "cat", image: "/images/cat-crazy.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "碰碰！門在我的手中迅速關上。",
      characters: [
        { id: "cat", image: "/images/cat-crazy.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "牠牠還留在門外，一臉疑惑地望著我。",
      characters: [
        { id: "cat", image: "/images/cat-crazy.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "我我根本不想理他，現在房子這麼難找，窮困大學生才不會跟錢過不去呢。",
      characters: [
        { id: "cat", image: "/images/cat-crazy.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "門門再也不會打開了。從此我的快樂生活將會展開。",
      characters: [
        { id: "cat", image: "/images/cat-crazy.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "喵喵甚麼喵，喵屁喵，當貓了不起啊，來打我啊略略略！",
      characters: [
        {
          id: "cat",
          image: "/images/cat-crazy.png",
          position: "right",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/cg.png",
      text: "再再次流浪的生活讓小貓學會很多事。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/cg.png",
      text: "牠牠曾經相信過人類是溫暖的，是會陪伴的。 但現在，那份信任成了最鋒利的傷口。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/cg.png",
      text: "牠牠不再輕易靠近人，也不再對善意低頭。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/cg.png",
      text: "牠牠學會領導其他流浪的同伴：狗、鳥、兔子、刺蝟……所有曾被遺棄、忽視、利用後丟棄的動物，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/cg.png",
      text: "牠牠們團結起來，組成了一個沉默而強大的勢力。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/cg.png",
      text: "「「被棄養動物帝國」的誕生像是大自然的報復。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/newspaper.png",
      text: "新新聞震撼全球：一隻貓帶領著成千上萬的流浪動物，接管了城市、癱瘓了交通、咬傷了無數人類。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/newspaper.png",
      text: "牠牠們並非發狂，牠們有秩序、有戰略、有意圖。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/newspaper.png",
      text: "「「被棄養動物帝國」的宗旨只有一個：復仇與統治人類。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/newspaper.png",
      text: "而而我——那扇門內的背叛者，只能在新聞中，看著那雙熟悉的眼睛，從信任走向冷酷。那天的決定，成了一場人類文明的引爆點。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "門門外忽地傳來刺耳的警報聲，我看見一批又一批的寵物大軍正朝我家襲來。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "——報——報應終將來臨，我閉上眼接受死神的審判。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「See you !」",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "臨臨死前，我似乎聽見了這段話。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingTitle: "達成結局《貓咪大戰爭6周年》",
      endingSubTitle:
        "隨意棄養動物所帶來的後果不容小覷。\n玩弄感情更是不可原諒。\n喊出「來打我啊」，可能真的會被打。\n(貓咪大戰爭沒有贊助。)",
      characters: [],
      ending: true,
      endingType: "BE",
    },
  ],
};
export default chapter04Event;
