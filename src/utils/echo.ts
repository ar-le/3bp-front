
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;


const options = {
   /*  broadcaster: rev, */
    key: '5qnqqalyfvmxii89n7p1',

    wsHost: 'localhost',

    wsPort: 8080,

    wssPort: 8080,

    forceTLS: false,
    

    enabledTransports: ['ws', 'wss'], 
     //authEndpoint is your apiUrl + /broadcasting/auth
    authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
    //    // As I'm using JWT tokens, I need to manually set up the headers.
    auth: {
      headers: {
        Authorization: `Bearer 2|YG8lxnvamQeBopQCMNN9gtR7G1bC1lKxaDLBU9E00389d53e`,
        Accept: 'application/json',
      },
    },
  };

window.Echo = new Echo({...options, broadcaster:"reverb"});