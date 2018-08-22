import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ForYou from './ForYou';
import Category from './Category';

class Categories extends Component {
  render() {
    const { posts, auth, onChooseFilterCategory } = this.props;
    let outputCategories;

    if(!posts) {
      outputCategories = null
    } else if (posts.length > 0) {
      outputCategories = (
        <Fragment>
        <ForYou img={auth.user.profileImage} profileImage={auth.user.profileImage} />
        <Category img={posts[7].postImage} onChooseFilterCategory={onChooseFilterCategory} category="All" /> 
        <Category img={posts[1].postImage} onChooseFilterCategory={onChooseFilterCategory} category="DIY" />
        <Category img={posts[2].postImage} onChooseFilterCategory={onChooseFilterCategory} category="Music" />
        <Category img={posts[3].postImage} onChooseFilterCategory={onChooseFilterCategory} category="Art" />
        <Category img={posts[4].postImage} onChooseFilterCategory={onChooseFilterCategory} category="Gaming" />
        <Category img={posts[5].postImage} onChooseFilterCategory={onChooseFilterCategory} category="Fitness" />
        <Category img={posts[6].postImage} onChooseFilterCategory={onChooseFilterCategory} category="Tech" />
        <Category img={posts[7].postImage} onChooseFilterCategory={onChooseFilterCategory} category="Art" /> 
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
