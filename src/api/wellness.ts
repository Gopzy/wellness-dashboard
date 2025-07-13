import { WellnessFormData } from "../schema/wellnessSchema";
import { api } from "./axios";

export const logWellnessEntry = async (
  data: WellnessFormData,
  token: string,
  userId: number
) => {
  return await api.post(
    "/logs",
    { ...data, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const fetchUserLogs = async (userId: number, token: string) => {
  return await api.get(`/logs?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteLog = async (logId: number, token: string) => {
  return await api.delete(`/logs/${logId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
