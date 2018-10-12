import { SET_SETTINGS } from '../actions/settings';

const REHYDRATE = 'persist/REHYDRATE';

export const INIT = {};

export default function(state = INIT, { type, payload }) {

  let newState = Object.assign({}, state);

  switch(type) {

    case SET_SETTINGS:
      return Object.assign({}, state, payload);

    case REHYDRATE:
      if(payload && payload.settings) {
        return payload.settings;
      } else {
        return state;
      }

    default:
      return state;
  }
}
