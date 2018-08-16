import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ForYou from './ForYou';
import Category from './Category';

class Categories extends Component {
  render() {
    const { posts, auth } = this.props;
    let outputCategories;

    if(!posts) {
      outputCategories = null
    } else if (posts.length > 0) {
      outputCategories = (
        <Fragment>
        <ForYou img={auth.user.profileImage} profileImage={auth.user.profileImage} />
        <Category img={posts[1].postImage} category="DIY" />
        <Category img={posts[2].postImage} category="Music" />
        <Category img={posts[3].postImage} category="Art" />
        <Category img={posts[4].postImage} category="Gaming" />
        <Category img={posts[5].postImage} category="DIY" />
        <Category img={posts[6].postImage} category="Music" />
        <Category img={posts[7].postImage} category="Art" />
    <Category img={posts[8].postImage} category="Gaming" /> 
    </Fragment>
      )
    }
    return (
      <div className="exploreCategories">
    {outputCategories}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Categories);
