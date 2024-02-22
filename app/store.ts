import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import MenuReducer from "../features/data/menuSlice";

export const store = configureStore({
  reducer: {
    MenuReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
