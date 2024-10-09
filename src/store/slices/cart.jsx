import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addDress(state, action) {
      const isPresent = state.some((dress) => dress.id == action.payload.id);
      !isPresent && state.push(action.payload);
    },
    increase(state, action) {
      state.map((item) => {
        item.id == action.payload
          ? {
              ...item,
              quantity: item.quantity++,
            }
          : item;
      });
    },
    decrease(state, action) {
      state.map((item) => {
        item.id == action.payload && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity--,
            }
          : item;
      });
    },
    deleteItem(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addDress, increase, decrease, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
