import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducer';

const store = configureStore({
  reducer: todoReducer
});

export default store;
