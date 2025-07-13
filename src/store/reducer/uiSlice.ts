import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  loadingComponents: Record<string, boolean>;
}

const initialState: UIState = {
  loadingComponents: {},
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setComponentLoading(
      state,
      action: PayloadAction<{ component: string; isLoading: boolean }>
    ) {
      const { component, isLoading } = action.payload;
      state.loadingComponents[component] = isLoading;
    },
  },
});

export const { setComponentLoading } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
