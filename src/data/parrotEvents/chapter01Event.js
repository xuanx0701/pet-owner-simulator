const chapter01Event = {
  title: "Chapter 01 ",
  subtitle: "初遇之處，我們秘密的基地",
  introBg: "/images/tree2.png",
  bgm: "/audio/bgm.mp3",
  rewards: {
    expReward: 0,
    levelReward: 1,
    emotionReward: 20,
  },
  dialogues: [
    {
      background: "/images/tree.png",
      text: "風風有些涼，午後的陽光斜斜地落在校園邊那棵老榕樹下。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "手手裡拿著剛從便利商店買來的貓食，在我們的秘密基地蹲守。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "那那隻熟悉的身影果然沒讓我等太久。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "牠牠步伐輕盈地穿過草叢，尾巴高高翹著，像是對我報以某種肯定。",
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
      background: "/images/tree.png",
      text: "我我是一個來自外地的大學生，人生地不熟的這座城市，實在有點擁擠、有些寂寞。",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "直直到某天，我在校園的偏僻角落遇見了牠。",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "牠牠不說話，卻彷彿懂我。每當我感到煩悶而造訪秘密基地時，牠總是靜靜坐在那裡，像是在說：「你來啦？」",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "原原本只是偶爾投餵，慢慢地，我會特地繞遠路，只為看看牠今天有沒有造訪。",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "甚甚至在下雨天，也會忍不住撐傘出去找牠。今天，牠吃完東西後沒急著走，反而跳上長椅，靜靜靠在我腳邊睡著了。",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "我我看著牠那小小的身體，心裡忽然湧起一股難以言喻的柔軟——",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
      ],
      speaker: "我",
    },
    {
      background: "/images/tree.png",
      text: "要要不要……乾脆收養這隻小貓呢？",
      characters: [
        { id: "cat", image: "/images/neko_running.png", position: "right" },
      ],
      choices: [
        {
          text: "不要",
          nextDialogueIndex: 11,
        },
        {
          text: "收養牠",
          nextDialogueIndex: 21,
        },
      ],
    },
    {
      background: "/images/tree.png",
      text: "還還是不要好了，我嫌麻煩，還是順手餵牠順便撸貓就好。",
      characters: [
        {
          id: "cat",
          image: "/images/neko_running.png",
          position: "right",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      text: "",
      characters: [],
      transition: "fade",
    },
    {
      background: "/images/road.png",
      text: "那那天傍晚天色陰沉，小貓照例出現，卻突然竄到馬路上。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/road.png",
      text: "一一聲刺耳的剎車聲響起，我心頭一緊——牠害人出車禍了。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/accident-cg.png",
      text: "駕駕駛為了閃避小貓，撞上了分隔島。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/accident-cg.png",
      text: "「「這是你養的吧？你要負責！」",
      characters: [
        {
          id: "angry_man",
          image: "/images/angry_man.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "駕駛",
    },
    {
      background: "/images/accident-cg.png",
      text: "我我手忙腳亂，賠了一筆不小的錢。",
      characters: [
        {
          id: "angry_man",
          image: "/images/angry_man.png",
          position: "right",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/accident-cg.png",
      text: "從從那天起，小貓再也沒有出現。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/accident-cg.png",
      text: "牠牠像風一樣消失了，只留下一個空蕩蕩的位置，和我心裡，說不出口的空虛。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingSubTitle:
        "隨意餵養流浪動物，會造成許多社會問題，包含但不限於車禍等。\n就算並非飼主，身為長期餵養者，仍有可能被判罰。",
      characters: [],
      ending: true,
      endingTitle: "達成結局《只餵不養，是渣男行為》",
      endingType: "BE",
    },
    {
      background: "/images/black.png",
      text: "",
      characters: [],
      transition: "fade",
    },
    {
      background: "/images/room.png",
      text: "天天終於放晴了，陽光斜斜地灑進我窄小的租屋房間。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "牠牠躺在窗邊曬太陽，眼睛半瞇，像個剛安頓下來的旅人。",
      characters: [
        {
          id: "neko_relaxed",
          image: "/images/neko_relaxed.png",
          position: "right",
          entrance: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我蹲在牠旁邊，看著牠的鬍鬚微微顫動，心裡一陣踏實。",
      characters: [
        {
          id: "neko_relaxed",
          image: "/images/neko_relaxed.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "決決定收養牠的那一刻，其實我也很不確定——我這個外地來的窮學生，到底能給牠什麼呢？",
      characters: [
        {
          id: "neko_relaxed",
          image: "/images/neko_relaxed.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "但但此刻，看著牠在這個本來冷清的小房間裡安穩睡著，",
      characters: [
        {
          id: "neko_relaxed",
          image: "/images/neko_relaxed.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      endingSubTitle: "我突然覺得，或許我也一樣，是被牠收養了。",
      characters: [
        {
          id: "neko_relaxed",
          image: "/images/neko_relaxed.png",
          position: "right",
        },
      ],
      speaker: "我",
      ending: true,
      endingTitle: "",
      endingType: "NE",
    },
  ],
};

export default chapter01Event;
