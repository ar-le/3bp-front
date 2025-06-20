import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { ILoggedUser, ILogin, IRegisterUser } from '../../types/UserTypes'
import { AuthApi } from './authApi'

interface AuthState{
    user : ILoggedUser | null,
    status : 'idle' | 'loading' | 'failed',
    team : string | null
}

const initialState : AuthState = {
    user : null,
    status: 'idle',
    team: null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action: PayloadAction<ILoggedUser>) => {
        state.user = action.payload;
      }, 
      logout: (state) => {
        state.user = null
      },
      setTeam: (state, action: PayloadAction<string>) => {
        state.team = action.payload
      },
    },
    extraReducers(builder) {
      builder
      .addCase(loginAsync.fulfilled, (state, action) =>{
        state.status = "idle"
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, state => {
        state.status = "failed"
      })
      .addCase(registerAsync.fulfilled, (state, action) =>{
        state.status = "idle"
        //state.user = action.payload;
      })
      .addCase(registerAsync.rejected, state => {
        state.status = "failed"
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.user = null;
        state.status = "idle";
      })
      .addCase(logoutAsync.rejected, state => {
        state.status = "failed"
      })
    },
})


export const { login, logout, setTeam } = authSlice.actions;

export const selectUsername = (state: RootState) => state.auth.user?.username;

export const selectUser = (state: RootState) => state.auth.user; 
export const selectTeam = (state: RootState) => state.auth.team; 
export const selectAuthSliceStatus = (state: RootState) => state.auth.status; 

//meter en la store para poder leer state
export default authSlice.reducer  

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (data : ILogin) => {
     const response = await AuthApi.login(data);
    return response.data; 
   
  }
)

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async (data : IRegisterUser) => {
     const response = await AuthApi.register(data);
    return response.data; 
   
  }
)

export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async () => {
      await AuthApi.logout();
      return null;
  }
)

