import {
  LOAD_WMS_LAYER,
  UNLOAD_WMS_LAYER,
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_WMS_LAYER:
      const indexOf = state.findIndex(l => action.payload.id === l.id);
      if (indexOf === -1) {
        return [...state, action.payload];
      } else {
        return [...state];
      }
    case UNLOAD_WMS_LAYER:
      if (state.lenth === 1) {
        return INITIAL_STATE;
      }
      const indexOfLayer = state.findIndex(l =>
        l.id === action.payload
      );
      return [
        ...state.slice(0, indexOfLayer),
        ...state.slice(indexOfLayer + 1),
      ];
    default:
      return state;
  }
};
