import { configureStore } from '@reduxjs/toolkit';
import libraryDetailsReducer from './OverviewSlice';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import editStates from './toggleEdit'

// Configure persist settings
const persistConfig = {
  key: 'root', // Key for local storage
  storage,
  blacklist: ['edit'], 
};

// Combine reducers if needed
const rootReducer = combineReducers({
  overviewDescription: libraryDetailsReducer,
  edit :editStates,
});

// Wrap reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

// Clear persisted state during development
// if (process.env.NODE_ENV === 'development') {
//   persistor.purge();
// }
export { store, persistor };