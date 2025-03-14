//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import './App.scss'

import App from './App.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
//import AuthGuard from './features/auth/routeGuards/AuthGuard.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'

createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                {/* <Route element={<AuthGuard roles={[]} redirectPath='/dashboard'/>}> */}
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                {/* </Route> */}
            </Routes>
        </BrowserRouter>
    </Provider>

)
