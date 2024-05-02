import { configureStore, combineReducers } from '@reduxjs/toolkit';
import jobReducer from './reducers/jobReducer';

const portalReducer = combineReducers({
  job: jobReducer,
});

export const store = configureStore({
  reducer: portalReducer,
});
