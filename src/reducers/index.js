import { combineReducers } from 'redux';

import WMSLayerReducer from './WMSLayerReducer';
import VectorLayerReducer from './VectorLayerReducer';

export default combineReducers({
  wmslayers: WMSLayerReducer,
  vectorlayers: VectorLayerReducer,
});
