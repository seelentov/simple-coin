import { createSlice } from '@reduxjs/toolkit'


let initialState = {
  email: null,
  token: null,
  id: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload: inputs }) => {
      state.email = inputs.email
      state.token = inputs.token
      state.id = inputs.id
    },
    clearUser: (state,) => {
      state.email = null
      state.token = null
      state.id = null
    }
  }
})