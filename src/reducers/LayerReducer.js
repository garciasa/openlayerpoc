import {
  LOAD_LAYER,
  UNLOAD_LAYER,
} from '../actions/types';

const INITIAL_STATE = {
  layers: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_LAYER:
      return { layers: [...state.layers, action.payload] };
    case UNLOAD_LAYER:
      if (state.layers.lenth === 1) {
        return INITIAL_STATE;
      }
      const indexOfLayer = state.layers.findIndex(l =>
        l.id === action.payload
      );
      return { layers: [
        ...state.layers.slice(0, indexOfLayer),
        ...state.layers.slice(indexOfLayer + 1),
      ] };
    default:
      return state;
  }
};
