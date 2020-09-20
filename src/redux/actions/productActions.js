import * as types from "./actionTypes";
import axios from "axios";

export function loadProductSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function loadProducts() {
  return function (dispatch) {
    return axios
      .get("/products")
      .then((products) => {
        dispatch(loadProductSuccess(products.data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function filterProductsSuccess(search) {
  return { type: types.FILTER_PRODUCTS_SUCCESS, search };
}

export function filterProducts(products, event) {
  return function (dispatch) {
    return {
      search: products
        .filter((product) => product.title === event.target.name)
        .then((search) => {
          dispatch(filterProductsSuccess(search));
        })
        .catch((error) => {
          throw error;
        }),
    };
  };
}
