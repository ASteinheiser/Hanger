import { SET_NOTIFICATIONS } from '../actions/notifications';

const REHYDRATE = 'persist/REHYDRATE';

export const INIT = {};

export default function(state = INIT, { type, payload }) {

  let newState = Object.assign({}, state);

  switch(type) {

    case SET_NOTIFICATIONS:
      return Object.assign({}, state, payload);

    case REHYDRATE:
      if(payload && payload.notifications) {
        return payload.notifications;
      } else {
        return state;
      }

    default:
      return state;
  }
}
