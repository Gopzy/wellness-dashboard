import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { authReducer } from "../features/auth/authSlice";
import { logReducer } from "../features/wellness/logSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    logs: logReducer,
  },
});

// Types and hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
