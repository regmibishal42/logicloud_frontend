import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user:{}
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser:(state,action)=>{
      state.user = action.payload
    }
  },
});

export const { setMode,setUser } = globalSlice.actions;

export default globalSlice.reducer;