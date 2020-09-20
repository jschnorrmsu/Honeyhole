import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
      return [...state, { ...action.cart }];
    default:
      return state;
  }
}
