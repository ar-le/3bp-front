import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './App.scss'

import "./echo";

function App() {
  const [count, setCount] = useState(0)

  window.Echo.channel(`public-channel`)
        .listen('.publicevent', (event: unknown) => {
            console.log(event);
           
        })
        /* .listen('.order-delivered', (event: { orderId: string }) => {
            console.log(event);
            ;
        }); */

  window.Echo.private(`private-channel.user.${1}`)
  .listen('.privateevent', (event: unknown) => {
      console.log(event);
      
  });

  return (
    <>
      
    </>
  )
}

export default App
