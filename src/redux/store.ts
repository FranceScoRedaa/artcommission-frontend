import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import artistReducer from './slices/artistSlice';
import portfolioReducer from './slices/portfolioSlice';
import commissionReducer from './slices/commissionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    artists: artistReducer,
    portfolios: portfolioReducer,
    commissions: commissionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;