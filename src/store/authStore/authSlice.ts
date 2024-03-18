import { createSlice } from '@reduxjs/toolkit';

interface AuthSliceState {
  isAuth: boolean;
}

const initialState: AuthSliceState = {
  isAuth: false,
};
const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});
export const { setIsAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
