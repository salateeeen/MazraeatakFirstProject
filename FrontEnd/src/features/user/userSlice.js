import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: !!localStorage.getItem("token"),
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setLoading, setError, logout } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;

export const selectUserId = (state) => state.user.user?._id;
export const selectUserRole = (state) => state.user.user?.role;
export const selectUserEmail = (state) => state.user.user?.email;

export const selectUserFullName = (state) => {
  const user = state.user.user;
  if (!user) return "";
  return `${user.firstName || ""} ${user.lastName || ""}`.trim();
};

export const selectUserAvatar = (state) => state.user.user?.profilePicture;
