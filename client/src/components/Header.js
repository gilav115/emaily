import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  logInGoogle() {
    return (
      <li>
        <a href='/auth/google'>Log in with Google</a>
      </li>
    );
  }

  // auth == user, as defined in mapStateToProps
  loggedIn() {
    return [
      <li key={0}>
        <Payments />
      </li>,
      <li key={1} style={{ margin: '0 10px' }}>
        Credits: {this.props.auth.credits}
      </li>,
      <li key={2}>
        <a href='/api/logout'>Logout</a>
      </li>,
    ];
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return this.logInGoogle();
      default:
        return this.loggedIn();
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'
          >
            Emaily
          </Link>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// we'll return an object that we'll be passed to the Header as props.
// this function:
// function mapStateToProps({ state }) {
//   return { auth: state.auth };
// }
// is identical to this one:
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
