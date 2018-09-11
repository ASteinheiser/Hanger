import { SET_USER } from '../actions/user';

const REHYDRATE = 'persist/REHYDRATE';

export const INIT = {};

export default function(state = INIT, { type, payload }) {
  switch(type) {

    case SET_USER:
      if(JSON.stringify(payload) === JSON.stringify({})) {
        return payload;
      }
      return Object.assign({}, state, payload);

    case REHYDRATE:
      if(payload && payload.user) {
        return payload.user;
      } else {
        return state;
      }

    default:
      return state;
  }
}
