import axios from "axios";

import {
  PRODCUT_LIST_REQUEST,
  PRODCUT_LIST_SUCCESS,
  PRODCUT_LIST_FAIL,
  PRODCUT_DETAILS_REQUEST,
  PRODCUT_DETAILS_SUCCESS,
  PRODCUT_DETAILS_FAIL,
} from "../const";

export const productListAction = () => async (dispath) => {
  try {
    dispath({ type: PRODCUT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispath({ type: PRODCUT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispath({
      type: PRODCUT_LIST_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const productDetailsAction = (id) => async (dispath) => {
  try {
    dispath({ type: PRODCUT_DETAILS_REQUEST });
    const { data } = await axios.get("/api/products/" + id);
    dispath({ type: PRODCUT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispath({
      type: PRODCUT_DETAILS_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};
