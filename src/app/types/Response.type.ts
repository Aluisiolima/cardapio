export type ResponseApi<T> = {
  error: boolean;
  sucess: boolean;
  data: T | null;
  message: string | null;
};
