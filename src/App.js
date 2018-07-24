import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import NavbarBottom from './components/navbars/NavbarBottom';
import MainView from './components/mainView/MainView';
import Explore from './components/explore/Explore';
import CreatePost from './components/create-post/CreatePost';
import Likes from './components/likes/Likes';
import Profile from './components/profile/Profile';
import Post from './components/posts/Post';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <div>
            <Route exact path="/" component={MainView} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/create-post" component={CreatePost} />
            <Route exact path="/likes" component={Likes} />
            <Route exact path="/my-profile" component={Profile} />
            <Route exact path="/post/:postId" component={Post} />
            <Route exact path="/profile/:userId" component={Profile} />
            <NavbarBottom />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
