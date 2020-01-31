import { SET_REP } from "../constants/ActionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_REP:
      const { office, rep } = action.payload;
      return {
        ...state,
        [office]: rep
      };
    default:
      return state;
  }
};

export default reducer;
