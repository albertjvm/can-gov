import { combineReducers } from "redux";
import bills from './bills.reducers';
import politicians from './politicians.reducers';

export default combineReducers({
  bills,
  politicians,
});
