import Echo from "laravel-echo";

import Pusher from "pusher-js";
import { BASE_URL } from "./httpClient";
window.Pusher = Pusher;


//const url = 'https://www.api.tbp.es';
const url = '3bpapi.lo';


const options = {
  /*  broadcaster: rev, */
  key: "5qnqqalyfvmxii89n7p1",

  //wsHost: 'localhost',
  wsHost: url,
  wsPort: 8080,

  wssPort: 8080,

  forceTLS: false,

  enabledTransports: ["ws", "wss"],
  //authEndpoint is your apiUrl + /broadcasting/auth
  authEndpoint: 'http://3bpapi.lo/broadcasting/auth',

  auth: {
    headers: {
      Authorization: `Bearer 2|IX2HaXazgr26OdrjwcFCmEoGgsdCiIg04FNutXHCabb11fee`,
      Accept: "application/json",
    },
  },
};

window.Echo = new Echo({ ...options, broadcaster: "reverb" });

export function createWebsocketConnection(token: string) {
  window.Pusher = Pusher;

  const options = {
    /*  broadcaster: rev, */
    key: "5qnqqalyfvmxii89n7p1",

    //wsHost: 'localhost',
    wsHost: url,
    wsPort: 8080,

    wssPort: 8080,

    forceTLS: false,

    enabledTransports: ["ws", "wss"],
    
    authEndpoint: "http://3bpapi.lo/broadcasting/auth",

    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  };

  window.Echo = new Echo({ ...options, broadcaster: "reverb" });
}
