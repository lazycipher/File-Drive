import {FETCH_USER_FILES_SUCCESS , FETCH_USER_FILES_FAILED, DELETE_FILE_FAILED, DELETE_FILE_SUCCESS, CLEAR_FILES} from '../types';

const initialState = {
  files: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_FILES_SUCCESS:
      return{
        ...state,
        files: action.payload,
        loading: false
      }
    case FETCH_USER_FILES_FAILED:
      return{ 
        ...state,
        loading: false
      }
    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        files: state.files.filter(file => file._id !== action.payload)
      }
    case CLEAR_FILES: 
    return {
      ...state,
      files: null
    }
    default:
      return state;
  }
}
