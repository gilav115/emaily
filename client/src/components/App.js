import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  // when the app boots-up it would automatically call the action creator
  // the action creator would fetch the user (ajax via axios)
  // then we dispatch the result to the reducers (the action param at the reducer)
  componentDidMount() {
    // this is an action from actions
    this.props.fetchUser();
  }

  mainComponenets() {
    return (
      <div>
        <Header />
        <Route exact path='/' component={Landing} />
        <Route exact path='/surveys' component={Dashboard} />
        <Route path='/surveys/new' component={SurveyNew} />
      </div>
    );
  }

  render() {
    return (
      <div className='container'>
        <BrowserRouter>{this.mainComponenets()}</BrowserRouter>
      </div>
    );
  }
}

// The connect() function connects a React component to a Redux store.
// It provides its connected component with the pieces of the data it needs from the store,
// and the functions it can use to dispatch actions to the store.
// It does not modify the component class passed to it;
// instead, it returns a new, connected component class that wraps the component you passed in.
export default connect(null, actions)(App);
