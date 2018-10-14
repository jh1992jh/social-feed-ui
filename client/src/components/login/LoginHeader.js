import React, { Fragment, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class LoginHeader extends Component {
    render() {
  return (
    <Fragment>
    <div className="loginHeader">
    <Link to="/login">
    <h3 className={this.props.history.location.pathname === '/login' ? 'selected' : null}>Sign in</h3>
    </Link>
    <Link to="/register">
    <h3 className={this.props.history.location.pathname === '/register' ? 'selected' : null}>Sign up</h3>
    </Link>
</div>

<div className="loginBrand">
    <i className="fas fa-camera" />
    <h1 className="brandText">
        SocialFeed
    </h1>
</div>
    </Fragment>
  )
}
}

export default withRouter(LoginHeader);