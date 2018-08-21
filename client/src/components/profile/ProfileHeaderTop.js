import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

class ProfileHeaderTop extends Component {
render() {
  const { username } = this.props;
  return (
    <div className="myProfileHeaderTop" >
      <div className="myProfieHeaderTopLeft">
      <i className="fas fa-arrow-left" onClick={() => this.props.history.go(-1)}/>{' '} <span className="username">{username}</span>
      </div>
      <div className="myProfileHeaderTopRight">
        <a onClick={() => this.props.logoutUser()}>
          Sign Out{' '}<i className="fas fa-sign-out-alt" />
        </a>
      </div>
    </div>
  );
}
};

export default connect(null, { logoutUser })(withRouter(ProfileHeaderTop));
