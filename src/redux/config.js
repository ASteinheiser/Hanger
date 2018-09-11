import { applyMiddleware, compose }     from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk                            from 'redux-thunk';
import Reactotron                       from '../ReactotronConfig';

import storage  from 'redux-persist/lib/storage';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const enhancer = compose(
  applyMiddleware(thunk),
  process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  typeof window.devToolsExtension !== 'undefined'
  ? // Call the brower extension function to create the enhancer.
    window.devToolsExtension()
  : // Else we return a no-op function.
    f => f,
);

export const store = Reactotron.createStore(persistedReducer, {}, enhancer);
export let persistor = persistStore(store);
