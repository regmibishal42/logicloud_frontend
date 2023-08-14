import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user:{},
  products:[],
  category:[],
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
    },
    setProducts:(state,action)=>{
      state.products = action.payload
    },
    setCategory:(state,action)=>{
      state.category = action.payload
    }
  },
});

export const { setMode,setUser,setProducts,setCategory } = globalSlice.actions;

export default globalSlice.reducer;