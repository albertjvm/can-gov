import { fork, put, select, takeEvery } from 'redux-saga/effects';
import { REQUEST_BILL } from '../constants/ActionTypes';
import { getBillByUrl } from '../selectors';
import { loadBill } from '../actions';
import canada from '../api/canada';

function* watchRequestBill() {
  yield takeEvery(REQUEST_BILL, requestBill);
}

function* requestBill(action) {
  const bill = yield select(getBillByUrl, action.payload);
  if (!bill) {
    const result = yield canada.getBill(action.payload);
    yield put(loadBill(result));
  }
}

export default function*() {
  yield fork(watchRequestBill);
}
