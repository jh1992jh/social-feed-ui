import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { logoutUser } from "../../actions/authActions";

const NoProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  p {
    text-align: center;
  }
  a {
    color: #0099cc !important;
  }
  span {
    color: #0099cc !important;
    cursor: pointer;
  }
`;

const NoProfile = ({ auth, logoutUser }) => (
  <NoProfileStyled>
    <i className="far fa-user-circle" />
    <h3>
      Hey {auth.user.username}
      <br />
    </h3>
    <p>
      you have no profile yet
      <br />
      click this link to to make one <br />
      So you can post, comment, like and much more!
      <br />
      <Link to="/create-profile" className="createProfileLink">
        Create a profile
      </Link>
      <br />
      or <br />
      <br />
      <span onClick={() => logoutUser()}>Logout</span>
    </p>
  </NoProfileStyled>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NoProfile);
