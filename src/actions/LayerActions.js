import {
  LOAD_LAYER,
  UNLOAD_LAYER,
} from './types';

export const loadLayer = layer => ({
  type: LOAD_LAYER,
  payload: layer,
});

export const unloadLayer = id => ({
  type: UNLOAD_LAYER,
  payload: id,
});
