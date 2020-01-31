import { combineReducers } from "redux";
import bills from "./bills.reducers";
import politicians from "./politicians.reducers";
import reps from "./rep.reducers";

export default combineReducers({
  bills,
  politicians,
  representatives: reps
});
