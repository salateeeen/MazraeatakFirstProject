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
