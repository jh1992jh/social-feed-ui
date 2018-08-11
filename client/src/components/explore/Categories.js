import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForYou from './ForYou';
import Category from './Category';

class Categories extends Component {
  render() {
    const { posts, authUser } = this.props;
    return (
      <div className="exploreCategories">
        <ForYou img={authUser.profPic} profPic={authUser.profPic} />
        <Category img={posts[1].postImg} category="DIY" />
        <Category img={posts[2].postImg} category="Music" />
        <Category img={posts[3].postImg} category="Art" />
        <Category img={posts[4].postImg} category="Gaming" />
        <Category img={posts[5].postImg} category="DIY" />
        <Category img={posts[6].postImg} category="Music" />
        <Category img={posts[7].postImg} category="Art" />
        <Category img={posts[8].postImg} category="Gaming" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
});

export default connect(mapStateToProps)(Categories);
