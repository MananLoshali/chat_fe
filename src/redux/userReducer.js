import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    id: null,
    email: "",
    image: "",
    token: "",
  },
  selectedChat: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state, action) => {
      state.user = initialState;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      console.log(state.selectedChat);
    },
  },
});

export const { setUser, resetUser, setSelectedChat } = userSlice.actions;
export default userSlice.reducer;
