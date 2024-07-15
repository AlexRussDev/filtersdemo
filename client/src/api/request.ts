import axios, { AxiosError, AxiosResponse } from "axios";
import { ErrorMessage, WarningMessage } from "../components/ToastNotification";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep();
    return response;
  },
  (error: AxiosError<any>) => {
    const { data, status } = error.response!;
   
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          ErrorMessage(modelStateErrors.join("\r\n") as string);
          throw modelStateErrors.flat();
        }
        break;
      case 401:
        WarningMessage("Unauthorized");
        setTimeout(() => window.location.reload(), 1000);
        break;
      case 403:
        WarningMessage("You are not allowed to do that!");
        break;
      case 500:
        ErrorMessage("Internal Server Error");
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

export const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}, headers: {}) =>
    axios.post(url, body, headers).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};
