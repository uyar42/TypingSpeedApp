import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import wordsjson from "../words.json";
// console.log(wordsjson);
const wordCount = 30;

const getWords = (arr, num) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  const newWords = shuffled.slice(0, num);
  console.log(newWords);
  return newWords.map((word) => ({
    ...word,
    turkish: word.turkish.toLowerCase(),
    english: word.english.toLowerCase(),
    status: "",
  }));
};

export const wordSlice = createSlice({
  name: "words",
  initialState: {
    items: getWords(wordsjson, wordCount),
    lang: "turkish",
    input: "",
    index: 0,
    time: 60,
    score: { true: 0, false: 0 },
    start: false,
    filtered: "",
  },
  reducers: {
    selectLang: (state, action) => {
      state.lang = action.payload;
      state.items = getWords(wordsjson, wordCount);
      state.index = 0;
      state.input = "";
      state.start = false;
    },
    setFiltered: (state, action) => {
      state.filtered = action.payload;
      // console.log(action.payload);
    },
    setInputs: (state, action) => {
      if (action.payload === "") {
        return;
      }
      state.input = action.payload;
      if (state.items[state.index][state.lang] === action.payload) {
        state.items[state.index].status = true;
        state.score.true += 1;
      } else {
        state.items[state.index].status = false;
        state.score.false += 1;
      }
      state.index += 1;
    },
    countdown: (state, action) => {
      state.time--;
    },
    start: (state, action) => {
      state.start = action.payload;
    },
    continues: (state, action) => {
      if (!action.payload) {
        state.time = 60;
        state.start = false;
      }
      state.items = getWords(wordsjson, wordCount);
      state.index = 0;
      state.input = "";
    },
  },
});

export const wordsSelector = (state) => state.words.items;
export const inputSelector = (state) => state.words.input;
export const timeSelector = (state) => state.words.time;

export const {
  selectLang,
  continues,
  setInputs,
  countdown,
  start,
  setFiltered,
} = wordSlice.actions;
export default wordSlice.reducer;
