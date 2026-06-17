// src/store/items-slice.js
import { createSlice } from "@reduxjs/toolkit";

const loadBag = () => {
  try {
    const savedBag = localStorage.getItem("fashionhub-bag");
    return savedBag ? JSON.parse(savedBag) : [];
  } catch {
    return [];
  }
};

const saveBag = (bagItems) => {
  localStorage.setItem("fashionhub-bag", JSON.stringify(bagItems));
};

const bagSlice = createSlice({
  name: "bag",
  initialState:loadBag(),
  reducers: {
    addToBag: (state, action) => {
     if (!state.includes(action.payload)) {
      state.push(action.payload)
      saveBag(state);
     }
    },
    
    removeFromBag: (state, action) => {
     const updatedBag = state.filter(itemId=>itemId !==action.payload)
     saveBag(updatedBag);
     return updatedBag;
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice;
