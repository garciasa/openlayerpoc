import { combineReducers } from 'redux';

import LayerReducer from './LayerReducer';

export default combineReducers({
  visibleLayers: LayerReducer,
});
