import { LOAD_POLITICIANS } from "../constants/ActionTypes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_POLITICIANS:
      return [...action.payload];
    default:
      return state;
  }
};

export default reducer;
