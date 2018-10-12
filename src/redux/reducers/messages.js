import { SET_MESSAGES } from '../actions/messages';

const REHYDRATE = 'persist/REHYDRATE';

export const INIT = {};

export default function(state = INIT, { type, payload }) {

  let newState = Object.assign({}, state);

  switch(type) {

    case SET_MESSAGES:
      return Object.assign({}, state, payload);

    case REHYDRATE:
      if(payload && payload.messages) {
        return payload.messages;
      } else {
        return state;
      }

    default:
      return state;
  }
}
