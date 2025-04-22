import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";

const initialState = {
BusinessNameinputvalue : "" ,
BusinessLocationInputValue : ""

}
const libraryDetailSlice = createSlice({
      name : "overviewDescription",
      initialState,
      reducers :{
            setBusinessName : (state , action) =>{
                  state.BusinessNameinputvalue = action.payload; 
            },
            setBusinessLocation : (state , action) =>{
                  state.BusinessLocationInputValue = action.payload; 
            }
      }
})

export const { setBusinessName, setBusinessLocation } = libraryDetailSlice.actions;
export default libraryDetailSlice.reducer;