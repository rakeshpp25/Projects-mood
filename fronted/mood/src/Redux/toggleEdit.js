import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // A map to hold the edit state for each field, initialized with false
  editStates: {},
};

const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    toggleEdit(state, action) {
      const { id } = action.payload;
      // Toggle the edit state for the specific field (id)
      state.editStates[id] = !state.editStates[id];
    },
    resetEdit(state, action) {
      const { id } = action.payload;
      state.editStates[id] = false;
    },
  },
});

export const { toggleEdit, resetEdit } = editSlice.actions;

export default editSlice.reducer;