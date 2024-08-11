// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/Components/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store;
