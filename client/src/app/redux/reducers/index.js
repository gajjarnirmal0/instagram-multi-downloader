import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import errorReducer from './error.reducer';
import downloadReducer from './download.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'downloads'
  ]
}

const rootReducer = combineReducers({
  errors: errorReducer,
  downloads: downloadReducer,
});

// export default rootReducer;
export default persistReducer(persistConfig, rootReducer);