import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Likes from '../likes/Likes';
import { logoutUser } from '../../actions/authActions';

class NavbarTop extends Component {
  render() {
    const { showLikes, onToggleLikesMenu } = this.props;
    return (
      <nav className="navTop">
        <NavLink to="/">
          <div className="navBrand">
            <i className="fas fa-camera" />{' '}
            <p className="brandText">SocialFeed</p>
          </div>
        </NavLink>

        <div className="forDesktop marginLR">
          <i className="fas fa-search" />
          <input type="search" placeholder="Search" />
        </div>

        

        <div className="forDesktop icons">
          <NavLink to="/explore">
            <i className="far fa-compass" />
          </NavLink>

          <i className="far fa-heart" onClick={onToggleLikesMenu} />

          {showLikes ? <Likes /> : null}
          <NavLink to="/my-profile">
            <i className="far fa-user" />
          </NavLink>
          <div className="navTopLogout">
          <a onClick={() => this.props.logoutUser()}>
          <i className="fas fa-sign-out-alt" />
          <br/> 
          <span>Sign Out</span>
        </a>
        </div>
        </div>
      </nav>
    );
  }
}

export default connect(null, { logoutUser })(NavbarTop);
