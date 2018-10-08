import { SET_USER } from '../actions/user';
import { uuidv4 }   from '../../functions/uuid-v4';

const REHYDRATE = 'persist/REHYDRATE';

export const INIT = {};

export default function(state = INIT, { type, payload }) {
  switch(type) {

    case SET_USER:
      if(JSON.stringify(payload) === JSON.stringify({})) {
        return payload;
      }
      let newState = Object.assign({}, state, payload);
      // give profile image a uuid query param for no caching
      if(newState.profile_img) newState.profile_img += ('?data=' + uuidv4());
      return newState;

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
