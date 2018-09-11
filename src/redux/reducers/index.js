import { combineReducers } from 'redux';

// Import reducers here
import user from './user';

const rootReducer = combineReducers({
  user
});

export default rootReducer;
