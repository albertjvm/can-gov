import {
  LOAD_BILL,
} from '../constants/ActionTypes';

const reducer = (state = [], action) => {
  switch(action.type) {
    case LOAD_BILL:
      return [
        ...state,
        action.payload,
      ];
    default:
      return state;
  }
};

export default reducer;
