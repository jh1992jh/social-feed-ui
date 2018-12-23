import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NavtopLikes from './NavtopLikes';
//import Likes from '../likes/Likes';
import { toggleLikesMenu } from '../../actions/postActions';
import { logoutUser } from '../../actions/authActions';
import styled from 'styled-components';
import { icons, logos } from '../../images-and-icons';

const NavTop = styled.nav`
position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    background: #fff;
    box-shadow: 0 0.5px 1px #909090;
    @media (max-width: 1000px) {
      display: none;
    }

`;

const NavBrand = styled.div`
display: flex;
font-size: 1.2rem;
align-items: center;

img {
  height: 35px;
  width: auto;
}
`;

const BrandText = styled.p`
font-weight: 600;
  margin: 0 1em;
  `

  const ForDesktop = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
@media (max-width: 980px) {
  display: none
}
`;

const CloseLikes = styled.div`
width: 100vw;
min-height: 100vh;
position: fixed; 
top: 0; 
left: 0; 
background: rgba(0,0,0, 0);
`

const NavLogout = styled.div`
  margin: 0 2em;
`

const NavLogoutLink = styled.div`
  display: flex;
  align-items: center;
`

const TopNavIcon = styled.img`
  margin: 0 0.5em
`
class NavbarTop extends Component {
  state = {
    likesMenuOpen: false
  }

  componentWillReceiveProps(nextProps) {
    // const { likesMenuOpen } = this.state;
    if(nextProps.posts.likesMenuOpen === true) {
      this.setState({likesMenuOpen: true})
    } else {
      this.setState({likesMenuOpen: false})
    }
  }
  render() {
    const { likesMenuOpen } = this.state;
    // const { showLikes, onToggleLikesMenu, posts } = this.props;
    if(!this.props.auth.isAuthenticated) return null;
    return (
      <NavTop>
        <NavLink to="/">
          <NavBrand>
            <img src={logos.mainLogo1} alt="main logo"/>
            <BrandText>SocialFeed</BrandText>
          </NavBrand>
        </NavLink>

        <div className="forDesktop marginLR">
          {/* TODO: <i className="fas fa-search" />
    <input type="search" placeholder="Search" /> */}
        </div>

        

  <ForDesktop> {/* additional className icons*/}
          <NavLink to="/explore">
          <TopNavIcon src={icons.search} alt="explore" />   
          </NavLink>

          <NavLink to="/create-post">
            <TopNavIcon src={icons.add} alt="add a post" />          
          </NavLink>
          <TopNavIcon src={icons.likes} onClick={() => this.props.toggleLikesMenu()} alt="likes"/>

          {likesMenuOpen ? (
           <Fragment>
            <NavtopLikes />
            <CloseLikes onClick={() => this.props.toggleLikesMenu()}/>
            </Fragment>
            ) : null}
          <NavLink to="/my-profile">
          <TopNavIcon src={icons.user} alt="user" />
          </NavLink>
          <NavLogout>
          <NavLogoutLink onClick={() => this.props.logoutUser()}>
          <TopNavIcon src={icons.signout} alt="signout"/> 
          <span>Sign Out</span>
        </NavLogoutLink>
        </NavLogout>
        </ForDesktop>
      </NavTop>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
})

export default connect(mapStateToProps, { logoutUser, toggleLikesMenu })(NavbarTop);
