//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import './App.scss'
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import AuthGuard from './features/auth/routeGuards/AuthGuard.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import Dashboard from './pages/Dashboard.tsx'
import UserLayout from './components/layout/UserLayout.tsx'
import Transmissions from './pages/Transmissions.tsx';
import {TransmissionDetail} from './pages/TransmissionDetail.tsx';
import Chatrooms from './pages/Chatrooms.tsx';
import Chat from './pages/Chat.tsx';
import UserProfile from './pages/UserProfile.tsx';
import Recruiting from './pages/Recruiting.tsx';

createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
        <BrowserRouter>
        <Routes>
                <Route element={<AuthGuard roles={[]} redirectPath='/'/>}>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                </Route>
                <Route element={<AuthGuard roles={['user', 'mod', 'admin']} redirectPath='/login'/>}>
                   <Route element={<UserLayout />}>
                     {/* <Route path='/' element={<Dashboard/>}></Route> */}
                     <Route path='transmissions/:id' element={<TransmissionDetail/>}/>
                     <Route path='transmissions' element={<Transmissions />} ></Route>  
                     <Route path='/' element={<Chatrooms/>}></Route> 
                     <Route path='chatrooms/:id' element={<Chat/>}/>
                     <Route path='user/:id' element={<UserProfile/>}></Route>
                     
                   </Route>
                   <Route path='recruit/:id' element={<Recruiting/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>

)
