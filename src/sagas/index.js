import { fork } from "redux-saga/effects";
import politicians from "./politicians.sagas";
import bills from "./bills.sagas";

export default function*() {
  yield fork(politicians);
  yield fork(bills);
};