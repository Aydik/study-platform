export interface ApiResponse<T> {
  timestamp: string;
  message: string;
  data: T;
}

export type ApiStringResponse = ApiResponse<string>;
export type ApiMapResponse = ApiResponse<Record<string, string>>;
