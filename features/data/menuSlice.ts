"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import base_service from "services/base_service";

interface MenuItem {
  numberToOrder: number;
  name: string;
  total: number;
  modifiers?: {
    name?: string;
    price?: number;
  };
}

interface MenuState {
  data: object;
  numberToOrder: number;
  basket: MenuItem[];
  pending: boolean;
  error: boolean;
}

const initialState: MenuState = {
  data: {},
  numberToOrder: 1,
  basket: [],
  pending: false,
  error: false,
};

export const getMenuData = createAsyncThunk("challenge/menu", async () => {
  const response = await base_service.get({
    api: process.env.NEXT_PUBLIC_API_ROUTE + "/menu",
  });

  return response.data;
});

export const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    SET_ITEMS_SELECTED(
      state,
      action: PayloadAction<{
        name: string;
        total: number;
        numberToOrder: number;
        modifiers?: {
          name?: string;
          price?: number;
        };
      }>
    ) {
      state.basket = [...state.basket, action.payload];
    },
    SET_NUMBER_TO_ORDER(state, action: PayloadAction<number>) {
      state.numberToOrder = action.payload;
    },
    SET_NUMBER_TO_ORDER_BASKET(
      state,
      action: PayloadAction<{
        numberToOrder: number;
        index: number;
      }>
    ) {
      state.basket[action.payload.index].numberToOrder =
        action.payload.numberToOrder;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenuData.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMenuData.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getMenuData.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const SelectData = (state: RootState) => state.MenuReducer;

export const {
  SET_ITEMS_SELECTED,
  SET_NUMBER_TO_ORDER,
  SET_NUMBER_TO_ORDER_BASKET,
} = MenuSlice.actions;

export default MenuSlice.reducer;
