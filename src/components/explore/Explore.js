import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addCurrentPost, clearCurrentPost } from '../../actions/postActions';
import ExploreHeader from './ExploreHeader';
import Categories from './Categories';
import ExploreItem from './ExploreItem';
import NavbarTop from '../navbars/NavbarTop';
import SuggestedPeople from './SuggestedPeople';

class Explore extends Component {
  constructor(props) {
    super(props);

    this.onAddCurrentPost = this.onAddCurrentPost.bind(this);
  }

  onAddCurrentPost(post) {
    this.props.addCurrentPost(post);
  }
  render() {
    const { posts } = this.props.posts;
    const { profiles } = this.props.profile;
    const outputContent = posts.map((post, i) => (
      <Fragment key={i}>
        <ExploreItem post={post} onAddCurrentPost={this.onAddCurrentPost} />
      </Fragment>
    ));
    return (
      <div className="explore">
        <ExploreHeader />
        <div className="forDesktop">
          <NavbarTop />
          <SuggestedPeople profiles={profiles} />
        </div>
        <Categories posts={posts} />

        <div className="exploreItems">{outputContent}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addCurrentPost, clearCurrentPost }
)(Explore);
