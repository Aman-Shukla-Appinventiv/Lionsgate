import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {HomeApiReducer} from './HomeApiReducer';
import { ShowApiReducer } from './ShowApiReducer';
import {MovieTvReducer} from './MovieTvReducer';
import {SearchReducer} from './SearchReducer';
import { Downloads_N_WatchlistReducer } from './Downloads&WatchlistReducer';

export var rootReducer = combineReducers({
  authReducer,
  HomeApiReducer,
  ShowApiReducer,
  MovieTvReducer,
  SearchReducer,
  Downloads_N_WatchlistReducer
});
