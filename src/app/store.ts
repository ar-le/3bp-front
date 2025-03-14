import { configureStore } from '@reduxjs/toolkit'

import  authReducer from '../features/auth/authSlice'
import type { Action, ThunkAction } from "@reduxjs/toolkit"


export const store =  configureStore({
  reducer: {
    auth: authReducer
  }
})


//export store;
export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
