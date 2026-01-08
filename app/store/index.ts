import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import bookmarksReducer from "./bookmarksSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
     theme: themeReducer,
     bookmarks: bookmarksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
