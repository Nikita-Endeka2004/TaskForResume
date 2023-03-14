import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  list: [],
  variable: false,
}

const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, {payload}) {
      state.list = payload;
    },
    addUsers(state, {payload}) {
      state.list = [...state.list, payload];
    },
    setVariable(state, {payload}) {
      state.variable = payload;
    },
  },
})

export const { setUsers, addUsers, setVariable } = counterSlice.actions
export default counterSlice.reducer