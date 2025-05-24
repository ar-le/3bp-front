import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { LocalStorageManager } from "./localStorageManagement";
import { ILoggedUser } from "../types/UserTypes";

//import { selectToken} from "../features/auth/authSlice";
//export const BASE_URL = 'http://3bpapi.lo/api/'
export const BASE_URL = 'https://api.tbp.es/api/'
export function httpResponseOk(response: AxiosResponse)
{
    return response.status >= 200 && response.status <= 299;
}

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'accept': 'application/json'}
});


/* httpClient.interceptors.response.use(function (response){
  return response;
}, function (error)
{
  toast.error('Connection error. Try again later')
  return Promise.reject(error);
}); */

httpClient.interceptors.request.use((config) => {
  const user = LocalStorageManager.get<ILoggedUser>('loggedUser');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  else config.headers.Authorization = `Bearer no`;

  return config;
},null, {synchronous:true});



export { httpClient };
