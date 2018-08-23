import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileHeaderTopOther extends Component {
render() {
        const { handle } = this.props;
  return (
    <div className="myProfileHeaderTop" >
      <div className="myProfieHeaderTopLeft">
      <i className="fas fa-arrow-left" onClick={() => this.props.history.go(-1)}/>{' '} <span className="username">{handle}</span>
      </div>
      <div className="myProfileHeaderTopRight">
        <i className="fas fa-ellipsis-v" />
      </div>
    </div>
  );
  }
};

ProfileHeaderTopOther.propTypes = {
  handle: PropTypes.string.isRequired
}

export default withRouter(ProfileHeaderTopOther);
