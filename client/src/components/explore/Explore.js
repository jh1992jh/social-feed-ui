import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post2Actions';
import { getProfiles } from '../../actions/profile2Actions';
import ExploreHeader from './ExploreHeader';
import Categories from './Categories';
import ExploreItem from './ExploreItem';
import NavbarTop from '../navbars/NavbarTop';
import SuggestedPeople from './SuggestedPeople';

class Explore extends Component {
  state = {
    filterCategory: 'All'
  }
componentDidMount() {
  this.props.getPosts();
  this.props.getProfiles();
}

onChooseFilterCategory = (category) => {
  this.setState({filterCategory: category})
}

 /*  onAddCurrentPost = post => {
    this.props.addCurrentPost(post);
  } */
  render() {
    const { posts, loading } = this.props.posts2;
    const { profiles } = this.props.profile2;
    const { filterCategory } = this.state;
    let outputContent;

    const filteredPosts = posts.filter(post => post.category === filterCategory);
    if(loading === true) {
      outputContent = <h1>Loading</h1>
    } else if (loading === false && posts.length > 0) {
      outputContent = filteredPosts.map((post, i) => (
       <Fragment key={i}>
         <ExploreItem post={post} />
       </Fragment>
      ));
    } else if (loading === false && posts.length === 0) {
      outputContent = <h3>There are no posts</h3>
    }
    return (
      <div className="explore">
        {/* <ExploreHeader /> */}
        <div className="forDesktop">
          <NavbarTop />
          {loading === false && profiles !== null ? <SuggestedPeople profiles={profiles} /> : null }
        </div>
        {loading === true ? null : <Categories onChooseFilterCategory={this.onChooseFilterCategory} posts={posts} /> }

        <div className="exploreItems">{outputContent}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
 // posts: state.posts,
 // profile: state.profile,
  auth: state.auth,
  profile2: state.profile2,
  posts2: state.posts2
});

export default connect(
  mapStateToProps,
  { getPosts, getProfiles }
)(Explore);
