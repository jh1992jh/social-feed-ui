import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class NavbarBottom extends Component {
  render() {
    let outputContent;
    if (this.props.history.location.pathname === '/create-post') {
      outputContent = (
        <nav className="navBottomCreatePost">
          <p>GALLERY</p>
          <p>PHOTO</p>
          <p>VIDEO</p>
        </nav>
      );
    } else if (this.props.history.location.pathname === '/login' || this.props.history.location.pathname === '/register') {
      outputContent = null;
    } else {
      outputContent = (
        <nav className="navBottom">
          <div className="iconContainer">
            <NavLink exact to="/" activeClassName="selected">
              <i className="fas fa-home" />
            </NavLink>
            <NavLink to="/explore" activeClassName="selected">
              <i className="fas fa-search" />
            </NavLink>
            <NavLink to="/create-post" activeClassName="selected">
              <i className="far fa-plus-square" />
            </NavLink>
            <NavLink to="/likes" activeClassName="selected">
              <i className="far fa-heart" />
            </NavLink>
            <NavLink to="/my-profile" activeClassName="selected">
              <i className="far fa-user" />
            </NavLink>
          </div>
        </nav>
      );
    }
    return <Fragment>{outputContent}</Fragment>;
  }
}

export default withRouter(NavbarBottom);
