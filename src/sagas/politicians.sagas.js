import { takeEvery, fork, put } from "redux-saga/effects";
import canada from "../api/canada";
import { REQUEST_POLITICIANS } from "../constants/ActionTypes";
import { loadPoliticians } from "../actions";

function* watchRequestPoliticians() {
  yield takeEvery(REQUEST_POLITICIANS, requestPoliticians);
}

function* requestPoliticians() {
  const results = yield canada.getPoliticians();
  yield put(loadPoliticians(results));
}

export default function*() {
  yield fork(watchRequestPoliticians);
}
