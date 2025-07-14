import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserLogs, logWellnessEntry } from "../../api/wellness";
import { WellnessFormData } from "../../schema/wellnessSchema";

export const loadLogs = createAsyncThunk(
  "logs/loadLogs",
  async ({ userId, token }: { userId: number; token: string }) => {
    const response = await fetchUserLogs(userId, token);
    return response.data;
  }
);

export const submitLog = createAsyncThunk(
  "logs/submitLog",
  async (
    {
      data,
      token,
      userId,
    }: { data: WellnessFormData; token: string; userId: number },
    thunkAPI
  ) => {
    const response = await logWellnessEntry(data, token, userId);
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
  loading: boolean;
  logs: LogEntry[];
  error: string | null;
}

const initialState: LogsState = {
  loading: false,
  logs: [],
  error: null,
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    addLog(state, action: PayloadAction<LogEntry>) {
      state.logs.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadLogs.fulfilled, (state, action) => {
        state.logs = action.payload.reverse();
        state.loading = false;
      })
      .addCase(loadLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load logs.";
      })
      .addCase(submitLog.fulfilled, (state, action) => {
        state.logs.unshift(action.payload);
      });
  },
});

export const logReducer = logSlice.reducer;
