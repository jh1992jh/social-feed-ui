import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import { getProfiles } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import Categories from './Categories';
import ExploreItem from './ExploreItem';
import NavbarTop from '../navbars/NavbarTop';
import SuggestedPeople from './SuggestedPeople';
import Spinner from '../../utilities/Spinner';

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

  render() {
    const { posts, loading } = this.props.posts;
    const { profiles } = this.props.profile;
    const { filterCategory } = this.state;
    let outputContent;

    const filteredPosts = posts.filter(post => post.category === filterCategory);
    if(loading === true) {
      outputContent = <Spinner width="360px" />
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

Explore.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getPosts, getProfiles }
)(Explore);
