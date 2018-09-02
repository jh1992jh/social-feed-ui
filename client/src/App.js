import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import NavbarBottom from './components/navbars/NavbarBottom';
import MainView from './components/mainView/MainView';
import Explore from './components/explore/Explore';
// import PostAPost from './components/create-post/PostaPost';
import PostAPost from './components/create-post/PreviewPost';
import Likes from './components/likes/Likes';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import Profile from './components/profile/Profile';
import Following from './components/profile/Following';
import Followers from './components/profile/Followers';
import Post from './components/posts/Post';
import Login from './components/login/Login';
import Register from './components/login/Register';
import CreateStory from './components/stories/CreateStory';
import PreviewStory from './components/stories/PreviewStory';
import SeeStory from './components/stories/SeeStory';
import './App.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)

  const decoded = jwt_decode(localStorage.jwtToken); 

  store.dispatch(setCurrentUser(decoded));

  const checkTime = Date.now() / 1000;

  if(decoded.exp < checkTime) {
    store.dispatch(logoutUser());
    window.location.href = './';
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <div>
          <Switch>
            <PrivateRoute exact path="/" component={MainView} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/explore" component={Explore} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/create-post" component={PostAPost} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/likes" component={Likes} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/my-profile" component={Profile} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/post/:postId" component={Post} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/profile/:userId" component={Profile} />
            </Switch>
            
            <Switch>
              <PrivateRoute exact path="/profile/following/:userId" component={Following} /> 
            </Switch>
            <Switch>
              <PrivateRoute exact path="/profile/followers/:userId" component={Followers} /> 
            </Switch>
            <Switch>
            <PrivateRoute exact path="/create-story" component={CreateStory} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/preview-story" component={PreviewStory} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/story/:storyId" component={SeeStory} />
            </Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <NavbarBottom />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
