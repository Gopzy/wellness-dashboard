import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserLogs } from "../../api/wellness";

export const loadLogs = createAsyncThunk(
  "logs/loadLogs",
  async ({ userId, token }: { userId: number; token: string }) => {
    const response = await fetchUserLogs(userId, token);
    return response.data;
  }
);

interface LogEntry {
  id: number;
  mood: string;
  sleepHours: number;
  notes?: string;
  userId: number;
}

interface LogsState {
  entries: LogEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: LogsState = {
  entries: [],
  loading: false,
  error: null,
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadLogs.fulfilled, (state, action) => {
        state.entries = action.payload;
        state.loading = false;
      })
      .addCase(loadLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load logs";
      });
  },
});

export const logReducer = logSlice.reducer;
