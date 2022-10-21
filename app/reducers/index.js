import { combineReducers } from 'redux';
import auth from './authReducer';
import Loader from './apiLoader'

export default combineReducers({
  auth,
  Loader,
});
