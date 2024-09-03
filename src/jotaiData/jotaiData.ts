import { atom } from "jotai";
import { topicData, IsettingsData } from "../types/interfaces";
import { atomWithStorage } from "jotai/utils";

export const topicsData = atom<topicData[]>([
   {
      id: 0,
      icon: "language",
      name: "first",
      data: [
         { id: 6, word: "hallo", meaning: "привіт", img: "", rate: 0 },
         { id: 2, word: "bottle", meaning: "пляшка", img: "sadasd", rate: 0 },
         {
            id: 3,
            word: "elephant",
            meaning:
               "великий сірий африканський або азіатський ссавець з довгим хоботом",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPxUKpr0j3uneqvlXmFaFvuScEDt4B-DLLYA&s",
            rate: 0,
         },
         {
            id: 432,
            word: "sky",
            meaning: "небо",
            img: "https://thumbs.dreamstime.com/b/sky-background-14624881.jpg",
            rate: 0,
         },
         {
            id: 32423,
            word: "universe",
            meaning: "весь космос, включаючи всі зірки, планети та галактики",
            img: "https://cdn.mos.cms.futurecdn.net/jfkAU4tM8XMUAPZDm4h5Nh-1200-80.jpeg",
            rate: 0,
         },

         {
            id: 623423,
            word: "knowledge",
            meaning: "знання, які отримуються через навчання або досвід",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFGZGeztlxp5ACmDxiI3V58nFaF4pF4jvuYw&s",
            rate: 0,
         },
         {
            id: 64564,
            word: "computer",
            meaning:
               "електронний пристрій для обробки даних ER23 dfsdf ewr cvdfg rerfgdfgdfgerqertwerhs hgwtghwtrgwthwthwthfsd whtshthstrhserthwerqersrghgshwthwthwthshfhwtwwt4thwthtrshst",
            img: "computer.png",
            rate: 0,
         },
         {
            id: 23423,
            word: "sandwichsadasdsada sd sadasda sasdasdasd asd asd adasda sdasdasda sdasda sdasdasda sdasda sd asd asd asd",
            meaning: "бутерброд",
            img: "sandwich.png",
            rate: 0,
         },
         {
            id: 23421,
            word: "quantum",
            meaning: "квантова фізика",
            img: "quantum.png",
            rate: 0,
         },
         {
            id: 6234,
            word: "light",
            meaning: "світло",
            img: "light.png",
            rate: 0,
         },
         {
            id: 612,
            word: "light",
            meaning: "світло",
            img: "light.png",
            rate: 0,
         },
         {
            id: 654,
            word: "light",
            meaning: "світло",
            img: "light.png",
            rate: 0,
         },
         {
            id: 676,
            word: "fascination",
            meaning: "захоплення",
            img: "fascination.png",
            rate: 0,
         },
         {
            id: 687,
            word: "ocean",
            meaning: "океан",
            img: "ocean.png",
            rate: 0,
         },
         {
            id: 6765,
            word: "volcano",
            meaning: "вулкан",
            img: "volcano.png",
            rate: 0,
         },

         {
            id: 645645756,
            word: "bicycle",
            meaning: "велосипед",
            img: "bicycle.png",
            rate: 0,
         },
         {
            id: 699078,
            word: "flower asdasd",
            meaning: "квітка",
            img: "flower.png",
            rate: 0,
         },
         {
            id: 6768,
            word: "moon",
            meaning: "місяць",
            img: "moon.png",
            rate: 0,
         },
         {
            id: 6978,
            word: "exploration",
            meaning: "дослідження невідомих місць або речей",
            img: "exploration.png",
            rate: 0,
         },
         {
            id: 60987,
            word: "mountain",
            meaning: "гора",
            img: "mountain.png",
            rate: 0,
         },
         {
            id: 236,
            word: "art",
            meaning: "мистецтво",
            img: "art.png",
            rate: 0,
         },
         {
            id: 76,
            word: "rocket",
            meaning: "ракета",
            img: "rocket.png",
            rate: 0,
         },
         {
            id: 436,
            word: "unicorn",
            meaning: "міфічна тварина, що виглядає як кінь з рогом на лобі",
            img: "unicorn.png",
            rate: 0,
         },
         {
            id: 676,
            word: "rainbow",
            meaning: "райдуга",
            img: "rainbow.png",
            rate: 0,
         },
         {
            id: 87646,
            word: "adventure",
            meaning: "пригода, цікава і небезпечна подорож",
            img: "adventure.png",
            rate: 0,
         },
         {
            id: 9877656,
            word: "book",
            meaning: "книга",
            img: "book.png",
            rate: 0,
         },
         {
            id: 66567,
            word: "music",
            meaning: "музика",
            img: "music.png",
            rate: 0,
         },
         {
            id: 42566,
            word: "history",
            meaning: "історія, вивчення минулих подій",
            img: "history.png",
            rate: 0,
         },
         {
            id: 234536,
            word: "science",
            meaning: "наука",
            img: "science.png",
            rate: 0,
         },
         {
            id: 54626,
            word: "forest",
            meaning: "ліс",
            img: "forest.png",
            rate: 0,
         },
         {
            id: 98766575,
            word: "technology",
            meaning: "технологія, практичне застосування науки",
            img: "technology.png",
            rate: 0,
         },
         {
            id: 6567567,
            word: "friendship",
            meaning: "дружба, близькі стосунки між людьми",
            img: "friendship.png",
            rate: 0,
         },
         {
            id: 69765432,
            word: "happiness",
            meaning: "щастя, почуття великої радості",
            img: "happiness.png",
            rate: 0,
         },
         {
            id: 68678753,
            word: "dragon",
            meaning:
               "міфічна істота, часто уявляється як велика летюча ящірка, що дихає вогнем",
            img: "dragon.png",
            rate: 0,
         },
         {
            id: 656756752456,
            word: "library",
            meaning: "бібліотека, місце для зберігання книг",
            img: "library.png",
            rate: 0,
         },
         {
            id: 665752526,
            word: "jungle",
            meaning: "джунглі, густі тропічні ліси",
            img: "jungle.png",
            rate: 0,
         },
         {
            id: 6567532,
            word: "castle",
            meaning: "замок, велика фортифікована будівля",
            img: "castle.png",
            rate: 0,
         },
         {
            id: 656456,
            word: "puzzle",
            meaning: "головоломка, гра для розуму",
            img: "puzzle.png",
            rate: 0,
         },
         {
            id: 622568764,
            word: "garden",
            meaning: "сад",
            img: "garden.png",
            rate: 0,
         },
         {
            id: 69784,
            word: "planet",
            meaning: "планета",
            img: "https://i.computer-bild.de/imgs/1/5/2/6/7/4/2/7/Firefly-Erstelle-mir-ein-Bild-von-einem-neuen-Planeten.-Der-Planet-ist-sehr-farbenfroh-und-sieht-ein_1-d117279849f54f1a.jpg",
            rate: 0,
         },
         {
            id: 234234234,
            word: "waterfall",
            meaning: "водоспад",
            img: "waterfall.png",
            rate: 0,
         },
         {
            id: 6256,
            word: "starlight",
            meaning: "світло зірок, зазвичай спостерігається вночі",
            img: "starlight.png",
            rate: 0,
         },
      ],
   },
   {
      id: 1,
      icon: "literature",
      name: "second",
      data: [
         { id: 1, word: "hallo", meaning: "привіт", img: "sadasd", rate: 0 },
         { id: 2, word: "buy", meaning: "купить", img: "sadasd", rate: 0 },
      ],
   },
   {
      id: 2,
      icon: "mathematics",
      name: "second round my view eschkere",
      data: [
         { id: 2, word: "hallo", meaning: "привіт", img: "sadasd", rate: 0 },
      ],
   },
   {
      id: 3,
      icon: "science",
      name: "long t1qxt round",
      data: [
         { id: 3, word: "hallo", meaning: "привіт", img: "sadasd", rate: 0 },
      ],
   },
   {
      id: 4,
      icon: "language",
      name: "third",
      data: [
         { id: 4, word: "hallo", meaning: "привіт", img: "sadasd", rate: 0 },
      ],
   },
   {
      id: 5,
      icon: "language",
      name: "fourtthdsfsd",
      data: [
         { id: 5, word: "hallo", meaning: "привіт", img: "sadasd", rate: 0 },
      ],
   },
   {
      id: 6,
      icon: "language",
      name: "hi my data",
      data: [
         { id: 6, word: "hallo", meaning: "привіт", img: "sadasd", rate: 0 },
      ],
   },
]);

export const settingsDataConst = atomWithStorage<IsettingsData>(
   "settingsData",
   {
      flashcards: {
         showBack: {
            question: "Which side to show?",
            answes: ["Back", "Front"], //   true, false
            data: false,
         },
         whereIsImage: {
            question: "What will be written with the image?",
            answes: ["Word", "Meaning"],
            data: false,
         },
      },
      tests: {
         whatAsk: {
            question: "What should be asked?",
            answes: ["Meaning", "Word"],
            data: false,
         },
         showQuestion: {
            question: "What should be shown?",
            answes: ["Image", "Word"],
            data: false,
         },
      },
      writing: {
         whatAsk: {
            question: "What should be asked?",
            answes: ["Word", "Meaning"],
            data: false,
         },
         showQuestion: {
            question: "What should be shown?",
            answes: ["Image", "Word"],
            data: false,
         },
      },
   }
);
