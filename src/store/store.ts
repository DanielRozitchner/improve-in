import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import bandsReducer from './features/bands/bandsSlice';

export const store = configureStore({
  reducer: {
    bands: bandsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
