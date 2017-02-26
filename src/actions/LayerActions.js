import {
  LOAD_WMS_LAYER,
  UNLOAD_WMS_LAYER,
  LOAD_VECTOR_LAYER,
  UNLOAD_VECTOR_LAYER,
} from './types';

export const loadWmsLayer = (layer) => {
  return (dispatch) => {
    dispatch({
      type: LOAD_WMS_LAYER,
      payload: layer,
    });
  };
};

export const unloadWmsLayer = id => ({
  type: UNLOAD_WMS_LAYER,
  payload: id,
});

export const loadVectorLayer = (layer) => {
  return (dispatch) => {
    dispatch({
      type: LOAD_VECTOR_LAYER,
      payload: layer,
    });
  };
};

export const unloadVectorLayer = id => ({
  type: UNLOAD_VECTOR_LAYER,
  payload: id,
});
