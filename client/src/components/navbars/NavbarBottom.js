import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { icons } from '../../images-and-icons';



/* class NavbarBottom extends Component {
  componentDidMount() {
  
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
*/

const NavBottom = styled.nav`
position: fixed;
padding: 10px 10px;
display: block;
bottom: 0;
left: 0;
right: 0;
z-index: 1030;
max-width: 100%;
background: #fff;
box-shadow: 0 -0.5px 1px #909090;
@media (min-width: 1000px) {
  display: none;
}
`

const IconContainer = styled.div`
display: flex;
justify-content: space-around;
` 



const NavbarBottom = ({ auth }) => {
  if(!auth.isAuthenticated) return null;
  
  return (
    <NavBottom>
      <IconContainer>
      <NavLink exact to="/" activeClassName="selected">
              <img src={icons.home} alt="home"/>
            </NavLink>
            <NavLink to="/explore" activeClassName="selected">
            <img src={icons.search} alt="search"/>
            </NavLink>
            <NavLink to="/create-post" activeClassName="selected">
            <img src={icons.add} alt="add"/>
            </NavLink>
            <NavLink to="/likes" activeClassName="selected">
            <img src={icons.likes} alt="likes"/>
            </NavLink>
            <NavLink to="/my-profile" activeClassName="selected">
            <img src={icons.user} alt="my profile"/>
            </NavLink>
      
      </IconContainer>  
    </NavBottom>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withRouter(NavbarBottom));
