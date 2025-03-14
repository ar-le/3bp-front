import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import type { AppThunk, RootState  } from '../../app/store'
import { ILoggedUser, ILogin, IRegisterUser } from '../../types/UserTypes'
import { AuthApi, loginIndependiente } from './authApi'

interface AuthState{
    user : ILoggedUser | null,
    status : 'idle' | 'loading' | 'failed'
}

const initialState : AuthState = {
    user : null,
    status: 'idle'
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
      }
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
    },
})


export const { login, logout } = authSlice.actions;

export const selectUsername = (state: RootState) => state.auth.user?.username;
/* export const selectRole = (state: RootState) => state.auth.user?.role;
export const selectToken = (state: RootState) => state.auth.user?.token;
export const selectTeam = (state: RootState) => state.auth.user?.team_id; */
export const selectUser = (state: RootState) => state.auth.user; 

//meter en la store para poder leer state
export default authSlice.reducer  

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (data : ILogin) => {
     const response = await AuthApi.login(data);
    return response.data; 
   
  }
)


//https://www.dhiwise.com/post/ultimate-guide-to-implementing-secure-redux-authentication