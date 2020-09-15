import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import fileReducer from './fileReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  files: fileReducer,
});
