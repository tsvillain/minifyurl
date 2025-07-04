import { ApiResponse } from "../interfaces/response.interface";

export const createResponse = <T>(
  status: "success" | "error",
  message: string,
  data: T | null = null
): ApiResponse<T> => {
  return {
    status,
    message,
    data,
  };
};
