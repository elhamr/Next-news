import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from '../type';

interface BookmarksState {
  bookmarks: News[];
}

const initialState: BookmarksState = {
  bookmarks: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addToBookmarks: (state, action: PayloadAction<News>) => {
      const existing = state.bookmarks.find(news => news.id === action.payload.id);
      if (!existing) {
        state.bookmarks.push(action.payload);
      }
    },
    removeFromBookmarks: (state, action: PayloadAction<News>) => {
      state.bookmarks = state.bookmarks.filter(news=> news.id !== action.payload.id);
    },
    clearBookmarks: (state) => {
      state.bookmarks = [];
    },
  },
});

export const {addToBookmarks ,removeFromBookmarks , clearBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;