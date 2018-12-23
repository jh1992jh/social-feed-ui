import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import NavbarBottom from './components/navbars/NavbarBottom';
import NavbarTop from './components/navbars/NavbarTop';
import MainView from './components/mainView/MainView';
import Explore from './components/explore/Explore';
// import PostAPost from './components/create-post/PostaPost';
import PostAPost from './components/create-post/PreviewPost';
import Likes from './components/likes/Likes';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import MyProfile from './components/profile/MyProfile';
import Profile from './components/profile/Profile';
import Following from './components/profile/Following';
import Followers from './components/profile/Followers';
import SinglePost from './components/posts/SinglePost';
import Login from './components/login/Login';
import Register from './components/login/Register';
import CreateStory from './components/stories/CreateStory';
import PreviewStory from './components/stories/PreviewStory';
import SeeStory from './components/stories/SeeStory';
import WatchAll from './components/stories/WatchAll';
import { createGlobalStyle } from 'styled-components';
//import './App.css';

const GlobalStyle = createGlobalStyle`
* {
  font-family: 'Raleway', sans-serif;
}

a,
a:link {
  text-decoration: none;
  color: #222;
  margin: 0;
  padding: 0;
}

button,
i {
  cursor: pointer;
}

input,
input:focus {
  border: none;
  border-bottom: 1px solid #888;
  outline: none;
}

ul {
  list-style-type: none;
}

button {
  background: #fff;
  border: 3px solid #0099cc;
  color: #0099cc;
  padding: 0.5em;
  border-radius: 10px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  min-width: 10%;
  min-height: 1.2rem;

  @media (max-width: 1000px) {
    min-width: 30%;
  }
}
`

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)

  const decoded = jwt_decode(localStorage.jwtToken); 

  store.dispatch(setCurrentUser(decoded));

  const checkTime = Date.now() / 1000;

  if(decoded.exp < checkTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
          <GlobalStyle />
          <Switch>
            <PrivateRoute exact path="/" component={MainView} />
            
           
            <PrivateRoute exact path="/explore" component={Explore} />
            
            <PrivateRoute exact path="/create-post" component={PostAPost} />
            
            <PrivateRoute exact path="/likes" component={Likes} />
            
            <PrivateRoute exact path="/my-profile" component={MyProfile} />
            
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            
            <PrivateRoute exact path="/post/:postId" component={SinglePost} />
            
            <PrivateRoute exact path="/profile/:userId" component={Profile} />
            
              <PrivateRoute exact path="/profile/following/:userId" component={Following} /> 
            
              <PrivateRoute exact path="/profile/followers/:userId" component={Followers} /> 
           
            <PrivateRoute exact path="/create-story" component={CreateStory} />
           
            <PrivateRoute exact path="/preview-story" component={PreviewStory} />
            
            <PrivateRoute exact path="/story/:storyId" component={SeeStory} />
          
            <PrivateRoute exact path="/stories" component={WatchAll} />
            </Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <NavbarTop />
            <NavbarBottom />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
