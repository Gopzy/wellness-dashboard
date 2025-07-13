import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { authReducer } from "./reducer/authSlice";
import { logReducer } from "./reducer/logSlice";
import { uiReducer } from "./reducer/uiSlice";
import { themeReducer } from "./reducer/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    logs: logReducer,
    theme: themeReducer,
    ui: uiReducer,
  },
});

// Types and hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
