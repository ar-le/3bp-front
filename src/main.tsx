//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import './App.scss'

import App from './App.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
        </Routes>
    </BrowserRouter>

)
