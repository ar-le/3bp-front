import Echo from "laravel-echo";

import Pusher from "pusher-js";
import { BASE_URL } from "./httpClient";
window.Pusher = Pusher;

const options = {
  /*  broadcaster: rev, */
  key: "5qnqqalyfvmxii89n7p1",

  //wsHost: 'localhost',
  wsHost: "3bp-api.lo",
  wsPort: 8080,

  wssPort: 8080,

  forceTLS: false,

  enabledTransports: ["ws", "wss"],
  //authEndpoint is your apiUrl + /broadcasting/auth
  authEndpoint: "http://3bp-api.lo/broadcasting/auth",
  // authEndpoint : 'http://127.0.0.1/broadcasting/auth',
  //    // As I'm using JWT tokens, I need to manually set up the headers.
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
    wsHost: "3bp-api.lo",
    wsPort: 8080,

    wssPort: 8080,

    forceTLS: false,

    enabledTransports: ["ws", "wss"],
    //authEndpoint is your apiUrl + /broadcasting/auth
    authEndpoint: "http://3bp-api.lo/broadcasting/auth",
    // authEndpoint : 'http://127.0.0.1/broadcasting/auth',
    //    // As I'm using JWT tokens, I need to manually set up the headers.
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  };

  window.Echo = new Echo({ ...options, broadcaster: "reverb" });
}
