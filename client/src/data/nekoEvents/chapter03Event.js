// src/data/nekoEvents/chapter03Event.js
const chapter03Event = {
  title: "Chapter 03 ",
  subtitle: "東窗事發！貓咪房東對峙中",
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
      text: "天天氣悶得讓人透不過氣。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我剛上完一場線上課，正準備給小貓添飼料，手機響了。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "房房東突然來電，語氣冷冷的：",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「我聽說你在房間裡養貓？」",
      characters: [],
      speaker: "房東",
    },
    {
      background: "/images/room.png",
      text: "一一股不祥的預感，我查看了貓眼——",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "———果然！我房東站在門外，手裡還拿著一杯冰紅茶，看起來是隨意經過，卻帶著某種壓力十足的氣場。",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我愣了一下，還沒來得及回話，",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "小小貓正巧從紙箱裡探出頭，對著我輕輕「喵」了一聲。像是在說：完了，你被抓包了。",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
          entrance: true,
        },
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "還還不都是因為誰！",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "匆匆匆結束通話，我趕緊開門迎接房東，邊道歉邊試圖解釋：",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
          exit: true,
        },
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「牠很乖的，不會抓東西，也不吵……。」",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "房房東皺起眉頭：",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「你知道合約裡寫不能養寵物吧？」",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/room.png",
      text: "我我站在門邊，一時之間腦子一片混亂。",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "這這裡是我和小貓的避風港，是我們逃離喧囂與孤單的小世界。",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "這這房間雖小，但有陽光、有靜謐，還有小貓窩在我肚子上睡覺的每一個早晨。",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我低下頭，手緊握成拳。",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    // 17 完蛋了？分支選項
    {
      background: "/images/room.png",
      text: "完完蛋了？",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      choices: [
        {
          text: "讓貓賣萌",
          nextDialogueIndex: 18,
        },
        {
          text: "受罰",
          nextDialogueIndex: 30,
        },
        {
          text: "找新主人",
          nextDialogueIndex: 60,
        },
        {
          text: "棄養吧",
          nextDialogueIndex: 78,
        },
      ],
      speaker: "我",
    },
    // 18 讓貓賣萌分支
    {
      background: "/images/room.png",
      text: "我我靈機一動，把小貓抱起來遞到房東面前：",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
          entrance: true,
        },
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「要不要聽聽我們怎麼相遇的故事？」",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "房房東皺著眉頭正要說話，小貓竟突然伸了個懶腰，用頭蹭了蹭他手指，還發出呼嚕聲，一臉無辜地望著對方，整個貓生都在表演「我超可愛」。",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我一邊講故事，小貓一邊全力賣萌。",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "不不知道是不是錯覺，貓貓抽空給了我一記鄙視的眼神——彷彿在說：「不要臉的傢伙。」",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "好好好，成功後絕對少不了你貓條吃。",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "萬萬幸，奇蹟真的發生了。",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "房房東笑了，摸摸小貓的頭：",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord-happy2",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「牠的眼神還挺像我以前家的貓。」",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord-happy2",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/room.png",
      text: "他他沉默了幾秒，",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord-happy2",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「好吧，只要你保持乾淨，我就破例。還有，牠好像缺個抓板，我幫你買一個。」",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
        {
          id: "landlord-happy2",
          image: "/images/landlord-happy2.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/room.png",
      endingSubTitle:
        "我差點感動得哭出來，感謝這隻嘴硬心軟的老先生，還有這隻擅長演戲的貓。",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
          exit: true,
        },
        {
          id: "landlord-happy2",
          image: "/images/landlord-happy2.png",
          position: "left",
          exit: true,
        },
      ],
      speaker: "我",
      ending: true,
      endingTitle: "",
      endingType: "NE",
    },
    // 30 受罰分支
    {
      background: "/images/room.png",
      text: "我我雙手合十，像要上刑場一樣站直：",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「求求你，我什麼都願意做，我是真的不能跟牠分開！」",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "房房東皺眉思考了一下，冷冷說：",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「好，違規就是違規，定期繳罰金。」",
      characters: [
        {
          id: "landlord_angry",
          image: "/images/landlord_angry.png",
          position: "left",
        },
      ],
      speaker: "房東",
    },
    {
      background: "/images/room.png",
      text: "我我毫不猶豫地掏出剩下的生活費，把巨額罰金一口氣轉了過去。",
      characters: [
        {
          id: "landlord-happy2",
          image: "/images/landlord_angry.png",
          position: "left",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "那那一刻我知道，接下來的日子，我可能要啃泡麵啃半年。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "但但我回頭，看見小貓蹭著我腳邊，抬頭望我，眼神裡全是信任與依賴。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "那那瞬間我告訴自己——值得。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      text: "",
      characters: [],
      transition: "fade",
    },
    {
      background: "/images/death.png",
      text: "把把錢用光是有代價的。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "我我開始每天只吃一餐，把能泡的東西全都泡來當晚餐，白吐司泡熱水、泡麵湯當湯底。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "就就連貓糧也是硬擠出錢來才買的。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "牠牠每次吃得津津有味，我卻越來越吃不下。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "營營養不良的副作用很快找上門。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "起起初是站起來時的頭暈，接著是早晨的乾咳，後來變成晚上也咳、深夜也咳。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "偶偶爾咳到喘不過氣，我只得抱著被子縮在角落。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "如如果是小感冒，撐一撐就過了，對吧？",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "還還是別去看醫生了，因為連掛號費也交不起。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "天天氣變冷了。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "身身體像被什麼壓著一樣沉重，意識也模糊得像浸在水裡。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "連連翻身都覺得吃力，只能看著天花板，聽見小貓在我耳邊輕聲叫喚。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "牠牠舔我的手指，輕輕地、一下又一下。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "我我多想回應，卻連舉手的力氣都沒有了。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/death.png",
      text: "好好睏，睡一下吧。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/newspaper.png",
      text: "三三個月後，報紙標題寫著：",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/newspaper.png",
      text: "《《大學生為愛貓犧牲健康，病逝異鄉》",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "貓貓貓又回到了秘密基地。再也不會離開他們的秘密基地。",
      characters: [
        {
          id: "cat_soft",
          image: "/images/cat_soft.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "日日復一日等著，主人也許，能在某刻再摸摸牠的頭。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "「「你來啦？」",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingTitle: "《羅密歐與茱麗葉》",
      characters: [],
      ending: true,
      endingSubTitle: "養寵物前，請務必衡量自身情況，不然連自己也養不起。",
      endingType: "BE",
    },
    // 60 找新主人分支
    {
      background: "/images/room.png",
      text: "房房東不讓養，我無計可施。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我打開電腦，上網發了一篇文，尋找能真正照顧牠的飼主。",
      characters: [],
      speaker: "我",
    },
    // 62 找新主人分支選項
    {
      background: "/images/room.png",
      text: "找找新主人",
      characters: [],
      choices: [
        {
          text: "耐心篩選",
          nextDialogueIndex: 63,
        },
        {
          text: "隨便找找",
          nextDialogueIndex: 69,
        },
      ],
    },
    {
      background: "/images/room.png",
      text: "耐耐心篩選訊息，和幾位願意收養的人一一通話，最後找到了個養過貓、家裡還有其他貓咪的女孩。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/adopt.png",
      text: "交交接那天，小貓一開始不肯進籠子，我在牠耳邊低聲說：",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/adopt.png",
      text: "「「只是暫時的，我會去看你。」牠彷彿懂了，沒有掙扎。",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/adopt.png",
      text: "我我望著牠離開的背影，心像被掏空，但我知道——在目前不能飼養的情況下，這是最負責任的選擇。",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/adopt.png",
      text: "至至少，牠現在有個真正的家。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingTitle: "《珍重再見喵》",
      characters: [],
      ending: true,
      endingSubTitle: "珍重再見喵",
      endingType: "TE",
    },
    // 69 隨便找找分支
    {
      background: "/images/room.png",
      text: "但但我那週實在太忙，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/messy.png",
      text: "作作業堆積、打工時間又長，最後隨便挑了一個自稱「愛貓人士」的人。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/messy.png",
      text: "對對方來接貓時我還沒完全確認過他背景，只覺得總比被房東趕好。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "結結果過沒多久，我在社群上看到消息——那人性情古怪，小貓不適應新環境，被趕出家門。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "再再被人發現時，牠已虛弱地倒在雨中，送醫無效。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我坐在電腦前，滑著牠的照片，後悔得快不能呼吸。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "後後來才知道，對方是慣犯，藉由偽裝成愛貓人士，向各方社會人士索取資金或物資，以此謀財。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "要要是早知道就好了……。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingTitle: "《撒優娜啦喵》",
      characters: [],
      ending: true,
      endingSubTitle: "不管甚麼時候，都要負責任。",
      endingType: "BE",
    },
    {
      background: "/images/room.png",
      text: "情情況至此，看來我和小貓是真的沒有緣分了。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我下定決心，走到牠面前，蹲下身，視線和牠齊平。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "牠牠坐在窗邊，一如往常，用尾巴繞著身體，眼神帶著幾分慵懶，也有幾分信任。那是無數次曾依賴過我的目光。",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
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
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "牠牠傻傻地歪了歪頭，似乎沒聽懂，還伸出爪子撥了撥我垂下的袖子，像是在問：「那是什麼意思？」",
      characters: [
        {
          id: "neko_lying",
          image: "/images/neko_lying.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "我我迅速打開房門，心情愉悅的把小貓丟出去。",
      characters: [
        {
          id: "cat_angry",
          image: "/images/cat_angry.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "小小貓嚇了一大跳，一臉困惑不解，以為我在跟牠玩鬧，嫌棄地叫了兩聲，讓我放牠回去。",
      characters: [
        {
          id: "cat_angry",
          image: "/images/cat_angry.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "我我才不要勒。",
      characters: [
        {
          id: "cat_angry",
          image: "/images/cat_angry.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "碰碰！門在我的手中迅速關上。",
      characters: [
        {
          id: "cat_angry",
          image: "/images/cat_angry.png",
          position: "right",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "牠牠還留在門外，一臉疑惑地望著我。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "我我根本不想理他，現在房子這麼難找，窮困大學生才不會跟錢過不去呢。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "門門再也不會打開了。從此我的快樂生活將會展開。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "喵喵甚麼喵，喵屁喵，當貓了不起啊，來打我啊略略略！",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/wars.png",
      text: "再再次再流浪的生活讓小貓學會很多事。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/wars.png",
      text: "牠牠曾經相信過人類是溫暖的，是會陪伴的。但現在，那份信任成了最鋒利的傷口。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/wars.png",
      text: "牠牠不再輕易靠近人，也不再對善意低頭。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/wars.png",
      text: "牠牠學會領導其他流浪的同伴：狗、鳥、兔子、刺蝟……所有曾被遺棄、忽視、利用後丟棄的動物，牠們團結起來，組成了一個沉默而強大的勢力。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/wars.png",
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
      text: "而而我——那扇門內的背叛者，只能在新聞中，看著那雙熟悉的眼睛，從信任走向冷酷。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/newspaper.png",
      text: "那那天的決定，成了一場人類文明的引爆點。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "門門外忽忽地傳來刺耳的警報聲，我看見一批又一批的寵物大軍正朝我家襲來。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "———報應終將來臨，我閉上眼接受死神的審判。",
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
      characters: [],
      ending: true,
      endingSubTitle:
        "隨意棄養動物所帶來的後果不容小覷。玩弄感情更是不可原諒。喊出「來打我啊」，可能真的會被打。(貓咪大戰爭沒有贊助。)",
      endingType: "BE",
    },
  ],
};

export default chapter03Event;
