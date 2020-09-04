import axios from 'axios';
import { FETCH_USER } from './types';

// This is an Action Creator. Usually it returns an Action.
// An action should have a type and payload (at least)
// redux-thunk allows up to break this convention and return something else, in our case a function
// When the Action is returned it is sent to all of the reducers via Dispath Function.
// redux-thunk provides us with a direct access to this Dispath Function.
// When we return a function redux-thunk automatically calls the function with the dispatch
// This dispatch is what sends the action to the reducers.
// This allows us to control the action before dispatching.
// In our case we want to dispatch the action only after the user was returned from an ASYNC call.
// we call this as soon as App loads "this.props.fetchUser()"
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleStripeToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  dispatch({ type: FETCH_USER, payload: res.data });
  history.push('/surveys');
};
