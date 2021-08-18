import { takeEvery, fork, put } from "redux-saga/effects";
import canada from "../api/canada";
import postalCodeApi from "../api/postalCodes";
import {
  REQUEST_POLITICIANS,
  SEARCH_POSTAL_CODE
} from "../constants/ActionTypes";
import { loadPoliticians, setRep } from "../actions";

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
    action.payload.toUpperCase().replace(/\s/g, "")
  );

  //   yield put(setRep(getRepByElectedOffice(results, "Prime Minister"), "Prime Minister"));
  yield put(setRep(getRepByElectedOffice(results, "MP"), "MP"));
//   yield put(setRep(getRepByElectedOffice(results, "Premier"), "Premier"));
  yield put(setRep(getRepByElectedOffice(results, "MPP"), "MPP"));
  yield put(setRep(getRepByElectedOffice(results, "Mayor"), "Mayor"));
  yield put(setRep(getRepByElectedOffice(results, "Councillor"), "Councillor"));
}

function getRepByElectedOffice(reps, office) {
  return reps.find(r => r.elected_office === office);
}

export default function*() {
  yield fork(watchRequestPoliticians);
  yield fork(watchSearchPostalCode);
}
