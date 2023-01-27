import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authentication/authSlice";
import zoneReducer from "../features/zone/zoneSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    zone: zoneReducer
  },
});
