
import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import fetchStatusSlice from "./fetchSlice";
import bagSlice from "./bagSlice";
import wishlistSlice from "./wishlistSlice";

const myntraStore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    fetchStatus:fetchStatusSlice.reducer,
    bag:bagSlice.reducer,
    wishlist:wishlistSlice.reducer,
  },
});

export default myntraStore;
