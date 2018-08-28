import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';

class NavbarBottom extends Component {
  componentDidMount() {
    if(!this.props.history.location.pathname === '/' || !this.props.match.params.userId && this.props.auth.isAuthenticated === true) {
      this.props.getCurrentProfile();
    }
  }
  render() {
    let outputContent;
 if (this.props.auth.isAuthenticated === false ) {
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

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(withRouter(NavbarBottom));
