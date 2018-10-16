import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Likes from '../likes/Likes';
import { toggleLikesMenu } from '../../actions/postActions';
import { logoutUser } from '../../actions/authActions';

class NavbarTop extends Component {
  state = {
    likesMenuOpen: false
  }

  componentWillReceiveProps(nextProps) {
    const { likesMenuOpen } = this.state;
    if(nextProps.posts.likesMenuOpen === true) {
      this.setState({likesMenuOpen: true})
    } else {
      this.setState({likesMenuOpen: false})
    }
  }
  render() {
    const { likesMenuOpen } = this.state;
    const { showLikes, onToggleLikesMenu, posts } = this.props;
    return (
      <nav className="navTop">
        <NavLink to="/">
          <div className="navBrand">
            <i className="fas fa-camera" />{' '}
            <p className="brandText">SocialFeed</p>
          </div>
        </NavLink>

        <div className="forDesktop marginLR">
          {/* TODO: <i className="fas fa-search" />
    <input type="search" placeholder="Search" /> */}
        </div>

        

        <div className="forDesktop icons">
          <NavLink to="/explore">
            <i className="far fa-compass" />
          </NavLink>

          <i className="far fa-heart" onClick={() => this.props.toggleLikesMenu()} />

          {likesMenuOpen ? (
           <Fragment>
            <div className="triangle" />
            <Likes />
            <div className="closeLikesMenuOverLay" onClick={() => this.props.toggleLikesMenu()}/>
            </Fragment>
            ) : null}
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

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps, { logoutUser, toggleLikesMenu })(NavbarTop);
