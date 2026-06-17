import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem("fashionhub-wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
};

const saveWishlist = (wishlistItems) => {
  localStorage.setItem("fashionhub-wishlist", JSON.stringify(wishlistItems));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlist(),
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
        saveWishlist(state);
      }
    },
    removeFromWishlist: (state, action) => {
      const updatedWishlist = state.filter((itemId) => itemId !== action.payload);
      saveWishlist(updatedWishlist);
      return updatedWishlist;
    },
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;
