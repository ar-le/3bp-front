import Echo from "laravel-echo";

import Pusher from "pusher-js";
import { BASE_URL } from "./httpClient";
window.Pusher = Pusher;


const url = 'www.api.tbp.es';
//const url = '3bpapi.lo';


const options = {
  /*  broadcaster: rev, */
  key: "5qnqqalyfvmxii89n7p1",

  //wsHost: 'localhost',
  wsHost: url,
  wsPort: 443,

  wssPort: 443,

  forceTLS: false,

  enabledTransports: ["ws", "wss"],
  //authEndpoint is your apiUrl + /broadcasting/auth
  authEndpoint: 'https://'+url+'/broadcasting/auth',

  auth: {
    headers: {
      Authorization: `Bearer `,
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
    wsPort: 443,

    wssPort: 443,

    forceTLS: false,

    enabledTransports: ["ws", "wss"],
    
    authEndpoint: 'https://'+url+'/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  };

  window.Echo = new Echo({ ...options, broadcaster: "reverb" });
}
