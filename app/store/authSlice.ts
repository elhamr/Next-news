import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

type User = {
  email: string;
  favorites: string[];
  role: "admin" | "user";
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

/* ================= PERSIST ================= */

const persistedAuth: AuthState | null =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("auth") || "null")
    : null;

/* ================= INITIAL STATE ================= */

const initialState: AuthState =
  persistedAuth ?? {
    user: null,
    token: null,
    isAuthenticated: false,
  };

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("auth", JSON.stringify(state));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("auth");
    },

    updateProfile: (
      state,
      action: PayloadAction<{ email: string; favorites: string[] }>
    ) => {
      if (state.user) {
        state.user.email = action.payload.email;
        state.user.favorites = action.payload.favorites;

        localStorage.setItem("auth", JSON.stringify(state));
      }
    },
  },
});

/* ================= EXPORTS ================= */

export const { loginSuccess, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
