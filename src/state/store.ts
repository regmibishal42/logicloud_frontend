import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./index";

export const ReduxStore = configureStore({
  reducer:{
    globalReducer,
  }
});


