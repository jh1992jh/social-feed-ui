import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { icons } from '../../images-and-icons';

const ProfileHeaderTopStyled = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%
  box-shadow: 0 2px 3px 0px #909090;
  padding: 0.5em 0;
  @media (min-width: 980px) {
    display: none;
  }
`

const Left = styled.div`
  * {
    margin: 0 0.5em
  }

  img {
    height: 1rem;
    width: auto;
  }
`



class ProfileHeaderTopOther extends Component {
render() {
        const { handle } = this.props;
  return (
    <ProfileHeaderTopStyled>
      <Left>
      <img src={icons.goback} alt="go back" onClick={() => this.props.history.go(-1)}/>{' '} <span className="username">{handle}</span>
      </Left>
    </ProfileHeaderTopStyled>
  );
  }
};

ProfileHeaderTopOther.propTypes = {
  handle: PropTypes.string.isRequired
}

export default withRouter(ProfileHeaderTopOther);
