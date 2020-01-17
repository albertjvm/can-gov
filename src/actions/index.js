import * as types from "../constants/ActionTypes";

export const requestPoliticians = () => ({
  type: types.REQUEST_POLITICIANS
});

export const loadPoliticians = politicians => ({
  type: types.LOAD_POLITICIANS,
  payload: politicians
});

export const requestBill = url => ({
  type: types.REQUEST_BILL,
  payload: url
});

export const loadBill = bill => ({
  type: types.LOAD_BILL,
  payload: bill
});

export const searchPostalCode = postalCode => ({
  type: types.SEARCH_POSTAL_CODE,
  payload: postalCode
});
