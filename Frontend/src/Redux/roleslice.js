// src/features/roleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    role: null
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    clearRole: (state) => {
      state.role = null;
    }
  }
});

export const { setRole, clearRole } = roleSlice.actions;
export default roleSlice.reducer;
