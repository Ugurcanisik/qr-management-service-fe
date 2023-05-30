import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, clearAuth } = authSlice.actions;

export const getUser = (state) => state.auth.user;
export const getToken = (state) => state.auth.user.token;
export const getAuth = (state) => Boolean(state.auth.user?.token);

export default authSlice;
