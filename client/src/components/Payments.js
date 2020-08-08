import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name='Emaily'
        description='Add credits to your account!'
        amount={500}
        currency='USD'
        token={(token) => this.props.handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className='btn'>Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
