import { WellnessFormData } from "../schema/wellnessSchema";
import { api } from "./axios";

export const logWellnessEntry = async (
  data: WellnessFormData,
  token: string
) => {
  return await api.post("/logs", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWellnessEntries = async (token: string) => {
  return await api.get("/logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
