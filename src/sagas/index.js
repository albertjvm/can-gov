import { fork } from "redux-saga/effects";
import politician from "./politicians.sagas";

export default function*() {
  yield fork(politician);
};