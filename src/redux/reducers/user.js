import { SET_USER } from '../actions/user';

export const INIT = {};

export default function(state = INIT, { type, payload }) {
  switch(type) {
    case SET_USER:
      if(JSON.stringify(payload) === JSON.stringify({})) {
        return payload;
      }
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
