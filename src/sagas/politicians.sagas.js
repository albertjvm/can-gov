import { takeEvery, fork, put } from "redux-saga/effects";
import canada from "../api/canada";
import postalCodeApi from "../api/postalCodes";
import {
  REQUEST_POLITICIANS,
  SEARCH_POSTAL_CODE
} from "../constants/ActionTypes";
import { loadPoliticians } from "../actions";

function* watchRequestPoliticians() {
  yield takeEvery(REQUEST_POLITICIANS, requestPoliticians);
}

function* requestPoliticians() {
  const results = yield canada.getPoliticians();
  yield put(loadPoliticians(results));
}

function* watchSearchPostalCode() {
  yield takeEvery(SEARCH_POSTAL_CODE, searchPostalCode);
}

function* searchPostalCode(action) {
  const results = yield postalCodeApi.searchPostalCode(
    action.payload.replace(/\s/g, "")
  );
  yield console.log(results);
}

export default function*() {
  yield fork(watchRequestPoliticians);
  yield fork(watchSearchPostalCode);
}
