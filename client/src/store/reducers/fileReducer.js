import {FETCH_USER_FILES_SUCCESS , FETCH_USER_FILES_FAILED} from '../types';

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
    default:
      return state;
  }
}
