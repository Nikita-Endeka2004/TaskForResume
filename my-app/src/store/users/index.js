import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  list: [],
  variable: false,
  render: false,
  isLoaded: false,
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
    setRender(state, {payload}){
      state.render = payload;
    },
    setIsLoaded(state, {payload}){
      state.isLoaded = payload;
    },
  },
})

export const { setUsers, addUsers, setVariable, setRender, setIsLoaded } = counterSlice.actions
export default counterSlice.reducer