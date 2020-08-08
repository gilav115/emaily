import { FETCH_USER } from '../actions/types';

// if null - we don't know if user logged in
// if logged in - return the user
// if logged out - return false (when logged out payload is empty string)
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
