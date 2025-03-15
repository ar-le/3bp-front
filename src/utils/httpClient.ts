import axios, { AxiosResponse } from "axios";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
//import { selectToken} from "../features/auth/authSlice";
const BASE_URL = 'http://127.0.0.1:8000/api/'

export function httpResponseOk(response: AxiosResponse)
{
    return response.status >= 200 && response.status <= 299;
}

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'accept': 'application/json'}
});

//añadir header authorization cuando hay un token almacenado
/* httpClient.interceptors.request.use(function (config) {
  const user = useAppSelector(selectUser);
  if(user) config.headers['Authorization'] =  `Bearer ${user.token}`;
  
  return config;
}); */