import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { icons } from '../../images-and-icons';

const MyProfileHeaderTopStyled = styled.div`
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
`

const Right = styled.div`
  * {
    margin: 0 0.5em
  }

  img {
    height: 1rem;
    width: auto;
  }
`

const ProfileHeaderTop = ({ username, onGoBack, logoutUser }) => (
    <MyProfileHeaderTopStyled>
      <Left>
        <img src={icons.goback} alt="go back" onClick={() => onGoBack()}/>{' '} <span className="username">{username}</span>
      </Left>
      <Right>
        <a onClick={() => logoutUser()}>
          Sign Out{' '} <img src={icons.signout} alt="signout" />
        </a>
      </Right>
    </MyProfileHeaderTopStyled>
    )


ProfileHeaderTop.propTypes = {
  logoutUser: PropTypes.func.isRequired
}

export default connect(null, { logoutUser })(withRouter(ProfileHeaderTop));
