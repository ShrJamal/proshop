import {
  PRODCUT_LIST_REQUEST,
  PRODCUT_LIST_SUCCESS,
  PRODCUT_LIST_FAIL,
  PRODCUT_DETAILS_REQUEST,
  PRODCUT_DETAILS_SUCCESS,
  PRODCUT_DETAILS_FAIL,
} from "../const";

export function productsReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODCUT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODCUT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case PRODCUT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
export function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODCUT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODCUT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODCUT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
