// // src/data/nekoEvents/chapter02Event.js
// const chapter02Event = {
//   title: "Chapter 02 ",
//   subtitle: "意料之外的「大禮」",
//   introBg: "/images/room.png",
//   bgm: "/audio/bgm.mp3",
//   dialogues: [
//     {
//       background: "/images/room.png",
//       text: "那那天傍晚，我像平常一樣打開門透氣，風吹進屋裡一陣微涼。",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/room.png",
//       text: "我我還來不及感受，就見小貓一個箭步竄了出去。",
//       characters: [
//         {
//           id: "cat",
//           image: "/images/neko_running.png",
//           position: "right",
//           entrance: true,
//         },
//       ],
//       speaker: "我",
//     },
//     {
//       background: "/images/room.png",
//       text: "我我喊了牠一聲，但牠沒回頭，像是玩遊戲般，一溜煙地衝下樓梯。",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/motorcycle.png",
//       text: "然然後，是剎車聲——刺耳、急促，接著是一聲鈍響和玻璃碎裂的聲音。",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/motorcycle.png",
//       text: "我我心臟一緊，衝到巷口，就看到一台機車側翻在地，騎士抱著手臂，臉痛得扭曲。",
//       characters: [],
//       speaker: "我",
//     },
//     // index 5
//     {
//       background: "/images/motorcycle.png",
//       text: "小小貓蹲在不遠處，嚇得發抖，但看起來沒受傷。",
//       characters: [
//         {
//           id: "cat_sick",
//           image: "/images/cat_sick.png",
//           position: "right",
//         },
//       ],
//       speaker: "我",
//     },
//     {
//       background: "/images/motorcycle.png",
//       text: "「「這是你養的貓？」",
//       characters: [
//         {
//           id: "cat_sick",
//           image: "/images/cat_sick.png",
//           position: "right",
//         },
//         {
//           id: "angry_man",
//           image: "/images/angry_man.png",
//           position: "left",
//         },
//       ],
//       speaker: "駕駛",
//     },
//     {
//       background: "/images/motorcycle.png",
//       text: "那那人指著我，聲音裡帶著怒氣與痛苦。",
//       characters: [
//         {
//           id: "cat_sick",
//           image: "/images/cat_sick.png",
//           position: "right",
//         },
//         {
//           id: "angry_man",
//           image: "/images/angry_man.png",
//           position: "left",
//         },
//       ],
//       speaker: "駕駛",
//     },
//     {
//       background: "/images/motorcycle.png",
//       text: "「「牠突然衝出來，我才會撞到！」",
//       characters: [
//         {
//           id: "cat_sick",
//           image: "/images/cat_sick.png",
//           position: "right",
//           exit: true,
//         },
//         {
//           id: "angry_man",
//           image: "/images/angry_man.png",
//           position: "left",
//           exit: true,
//         },
//       ],
//       speaker: "駕駛",
//     },
//     {
//       background: "/images/motorcycle.png",
//       text: "我我啞口無言，只能一邊道歉一邊處理後續。",
//       characters: [
//         {
//           id: "cat_sick",
//           image: "/images/cat_sick.png",
//           position: "right",
//           exit: true,
//         },
//         {
//           id: "angry_man",
//           image: "/images/angry_man.png",
//           position: "left",
//           exit: true,
//         },
//       ],
//       speaker: "我",
//     },
//     {
//       background: "/images/room.png",
//       text: "回回到家，小貓像什麼事都沒發生一樣坐在窗邊舔毛，我卻覺得整個人都被掏空了。明明只是個意外，明明牠不是故意的……我怎麼應對？",
//       characters: [
//         {
//           id: "cat_soft",
//           image: "/images/cat_soft.png",
//           position: "right",
//           entrance: true,
//         },
//       ],
//       speaker: "我",
//     },
//     // index 11 分支選項
//     {
//       background: "/images/room.png",
//       text: "我我怎麼應對?",
//       characters: [
//         {
//           id: "cat_soft",
//           image: "/images/cat_soft.png",
//           position: "right",
//         },
//       ],
//       choices: [
//         {
//           text: "吃土",
//           nextDialogueIndex: 12,
//         },
//         {
//           text: "不乖就是要罰",
//           nextDialogueIndex: 16,
//         },
//       ],
//     },
//     // index 12 吃土分支
//     {
//       background: "/images/room.png",
//       text: "保保險、醫療費、修車費……帳單像潮水一樣湧上來，沒多久我那點微薄的存款就見底了。",
//       characters: [
//         {
//           id: "cat_soft",
//           image: "/images/cat_soft.png",
//           position: "right",
//         },
//       ],
//       speaker: "我",
//     },
//     {
//       background: "/images/room.png",
//       text: "「「好吧……這個月底吃土吧，貓貓。",
//       characters: [
//         {
//           id: "cat_soft",
//           image: "/images/cat_soft.png",
//           position: "right",
//         },
//       ],
//       speaker: "我",
//     },
//     {
//       background: "/images/room.png",
//       text: "我我摸了摸牠的頭，牠像是知道自己闖了禍，躲在角落不敢看我。",
//       characters: [
//         {
//           id: "cat_sick",
//           image: "/images/cat_sick.png",
//           position: "right",
//         },
//       ],
//       speaker: "我",
//     },
//     {
//       background: "/images/black.png",
//       endingSubTitle: "我笑了笑，雖然心痛，但也只能認了。誰叫我愛牠比錢多。",
//       characters: [],
//       ending: true,
//       endingTitle: "",
//     },
//     //index 16 不乖就是要罰分支
//     {
//       background: "/images/room.png",
//       text: "可可惡，居然害我要賠償，我要懲罰小貓不讓他進家門！",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/room.png",
//       text: "我我氣得不行，這個賠錢貨。",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/door.png",
//       text: "「「你給我出去！別再進來了！」",
//       characters: [
//         {
//           id: "neko_relaxed",
//           image: "/images/neko_relaxed.png",
//           position: "right",
//         },
//       ],
//       speaker: "我",
//     },
//     {
//       background: "/images/door.png",
//       text: "牠牠愣在門外，耳朵貼著腦袋，一步步退到樓梯間，沒發出半點聲音。",
//       characters: [
//         {
//           id: "neko_relaxed",
//           image: "/images/neko_relaxed.png",
//           position: "right",
//         },
//       ],
//       speaker: "我",
//     },
//     {
//       background: "/images/door.png",
//       text: "不不料，貓貓一直沒有回來。",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/hospital.png",
//       text: "沒沒想到，沒幾天後，牠又在外面惹了禍——這次不只害了更多人受傷，",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/hospital.png",
//       text: "甚甚至還撞到了一台特X拉，而牠自己也撞得重傷，送醫時已經沒了呼吸。",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/hospital.png",
//       text: "我我站在動物醫院冰冷的走廊裡，手裡握著賠償單，像被抽空了力氣。",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/hospital.png",
//       text: "一一隻貓，兩次禍，一段來不及好好收尾的緣分。",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/black.png",
//       text: "我我吃了三十年的土，也沒換回牠最後的一聲撒嬌。",
//       characters: [],
//       speaker: "我",
//     },
//     {
//       background: "/images/black.png",
//       endingTitle: "達成結局《吃土貓貓：碰！》",
//       characters: [],
//       ending: true,
//       endingSubTitle:
//         "養寵請務必封好所有出入口，寵物會用各種方式玩密室逃脫。\n寵物不像人類，不適用我們曾接受的懲罰方式。",
//     },
//   ],
// };

// export default chapter02Event;
const chapter02Event = {
  title: "Chapter 02 ",
  subtitle: "意料之外的「大禮」",
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
      text: "那那天傍晚，我像平常一樣打開門透氣，風吹進屋裡一陣微涼。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我還來不及感受，就見小貓一個箭步竄了出去。",
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
      text: "我我喊了牠一聲，但牠沒回頭，像是玩遊戲般，一溜煙地衝下樓梯。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/motorcycle.png",
      text: "然然後，是剎車聲——刺耳、急促，接著是一聲鈍響和玻璃碎裂的聲音。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/motorcycle.png",
      text: "我我心臟一緊，衝到巷口，就看到一台機車側翻在地，騎士抱著手臂，臉痛得扭曲。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/motorcycle.png",
      text: "小小貓蹲在不遠處，嚇得發抖，但看起來沒受傷。",
      characters: [
        {
          id: "cat_sick",
          image: "/images/cat_sick.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/motorcycle.png",
      text: "「「這是你養的貓？」",
      characters: [
        {
          id: "cat_sick",
          image: "/images/cat_sick.png",
          position: "right",
        },
        {
          id: "angry_man",
          image: "/images/angry_man.png",
          position: "left",
        },
      ],
      speaker: "駕駛",
    },
    {
      background: "/images/motorcycle.png",
      text: "那那人指著我，聲音裡帶著怒氣與痛苦。",
      characters: [
        {
          id: "cat_sick",
          image: "/images/cat_sick.png",
          position: "right",
        },
        {
          id: "angry_man",
          image: "/images/angry_man.png",
          position: "left",
        },
      ],
      speaker: "駕駛",
    },
    {
      background: "/images/motorcycle.png",
      text: "「「牠突然衝出來，我才會撞到！」",
      characters: [
        {
          id: "cat_sick",
          image: "/images/cat_sick.png",
          position: "right",
          exit: true,
        },
        {
          id: "angry_man",
          image: "/images/angry_man.png",
          position: "left",
          exit: true,
        },
      ],
      speaker: "駕駛",
    },
    {
      background: "/images/motorcycle.png",
      text: "我我啞口無言，只能一邊道歉一邊處理後續。",
      characters: [
        {
          id: "cat_sick",
          image: "/images/cat_sick.png",
          position: "right",
          exit: true,
        },
        {
          id: "angry_man",
          image: "/images/angry_man.png",
          position: "left",
          exit: true,
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "回回到家，小貓像什麼事都沒發生一樣坐在窗邊舔毛，我卻覺得整個人都被掏空了。明明只是個意外，明明牠不是故意的……我怎麼應對？",
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
      background: "/images/room.png",
      text: "我我怎麼應對?",
      characters: [
        {
          id: "cat_soft",
          image: "/images/cat_soft.png",
          position: "right",
        },
      ],
      choices: [
        {
          text: "吃土",
          nextDialogueIndex: 12,
        },
        {
          text: "不乖就是要罰",
          nextDialogueIndex: 16,
        },
      ],
    },
    {
      background: "/images/room.png",
      text: "保保險、醫療費、修車費……帳單像潮水一樣湧上來，沒多久我那點微薄的存款就見底了。",
      characters: [
        {
          id: "cat_soft",
          image: "/images/cat_soft.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "「「好吧……這個月底吃土吧，貓貓。",
      characters: [
        {
          id: "cat_soft",
          image: "/images/cat_soft.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我摸了摸牠的頭，牠像是知道自己闖了禍，躲在角落不敢看我。",
      characters: [
        {
          id: "cat_sick",
          image: "/images/cat_sick.png",
          position: "right",
        },
      ],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingSubTitle: "我笑了笑，雖然心痛，但也只能認了。誰叫我愛牠比錢多。",
      characters: [],
      ending: true,
      endingTitle: "",
      endingType: "NE",
    },
    {
      background: "/images/room.png",
      text: "可可惡，居然害我要賠償，我要懲罰小貓不讓他進家門！",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/room.png",
      text: "我我氣得不行，這個賠錢貨。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/door.png",
      text: "「「你給我出去！別再進來了！」",
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
      background: "/images/door.png",
      text: "牠牠愣在門外，耳朵貼著腦袋，一步步退到樓梯間，沒發出半點聲音。",
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
      background: "/images/door.png",
      text: "不不料，貓貓一直沒有回來。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/hospital.png",
      text: "沒沒想到，沒幾天後，牠又在外面惹了禍——這次不只害了更多人受傷，",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/hospital.png",
      text: "甚甚至還撞到了一台特X拉，而牠自己也撞得重傷，送醫時已經沒了呼吸。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/hospital.png",
      text: "我我站在動物醫院冰冷的走廊裡，手裡握著賠償單，像被抽空了力氣。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/hospital.png",
      text: "一一隻貓，兩次禍，一段來不及好好收尾的緣分。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      text: "我我吃了三十年的土，也沒換回牠最後的一聲撒嬌。",
      characters: [],
      speaker: "我",
    },
    {
      background: "/images/black.png",
      endingTitle: "《吃土貓貓：碰！》",
      characters: [],
      ending: true,
      endingSubTitle:
        "養寵請務必封好所有出入口，寵物會用各種方式玩密室逃脫。\n寵物不像人類，不適用我們曾接受的懲罰方式。",
      endingType: "BE",
    },
  ],
};

export default chapter02Event;
