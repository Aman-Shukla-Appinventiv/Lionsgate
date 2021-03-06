import thunk from 'redux-thunk';
import { createLogger, logger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {rootReducer} from './reducers/rootReducer'

const enhancer = compose(
    applyMiddleware(
        thunk,
        createLogger({
            predicate: () => __DEV__,
        }),
    ),
);

const persistConfig = {
    key: 'root',
    timeout: 0,
    storage: AsyncStorage,
    whitelist: ['authReducer','Downloads_N_WatchlistReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);