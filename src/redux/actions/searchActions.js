import * as types from "./actionTypes";

export function loadSearchSuccess(search) {
  return { type: types.LOAD_SEARCH_SUCCESS, search };
}

export function loadSearch() {
  return function (dispatch) {
    let search = [];
    return search
      .then((products) => {
        dispatch(loadSearchSuccess(products.data));
      })
      .catch((error) => {
        throw error;
      });
  };
}
