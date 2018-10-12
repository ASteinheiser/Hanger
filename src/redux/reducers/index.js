import { combineReducers } from 'redux';

// Import reducers here
import user           from './user';
import messages       from './messages';
import notifications  from './notifications';
import settings       from './settings';

const rootReducer = combineReducers({
  user,
  messages,
  notifications,
  settings
});

export default rootReducer;
