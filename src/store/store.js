/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { api } from './api/api'
import { currApi } from './api/curr.api'
import { userSlice } from './user/user.slice'
const logger = createLogger({
  collapsed: true
})

export const actions = {
  ...userSlice.actions
}

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  [currApi.reducerPath]: currApi.reducer,
  user: userSlice.reducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(currApi.middleware).concat(api.middleware).concat(logger)
})
