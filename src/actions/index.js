import * as types from '../constants/ActionTypes';

export const requestPolitions = () => ({
  type: types.REQUEST_POLITICIANS,
});

export const loadPoliticians = politicians => ({
  type: types.LOAD_POLITICIANS,
  payload: politicians,
});
