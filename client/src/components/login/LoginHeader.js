import React, { Fragment, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { logos } from '../../images-and-icons';

const LoginHeaderStyled = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    h3 {
        margin: 1em;
    }
`;

const Logo = styled.div`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
margin: 1em 0;
font-size: 3rem;

h1 {
    font-size: 2rem;
    color: #0099cc;
    text-shadow: -1px -1px 2px #555;
}
`;



class LoginHeader extends Component {
    render() {
  return (
    <Fragment>
    <LoginHeaderStyled>
    <Link to="/login">
    <h3 className={this.props.history.location.pathname === '/login' ? 'selected' : null}>Sign in</h3>
    </Link>
    <Link to="/register">
    <h3 className={this.props.history.location.pathname === '/register' ? 'selected' : null}>Sign up</h3>
    </Link>
</LoginHeaderStyled>

<Logo>
    <img src={logos.mainLogo1} alt="main logo"/>
    <h1>
        SocialFeed
    </h1>
</Logo>
    </Fragment>
  )
}
}

export default withRouter(LoginHeader);