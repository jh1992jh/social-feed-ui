import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ForYou from './ForYou';
import Category from './Category';
import Loading from '../../utilities/Loading';
import all from './images/all.jpeg'
import diy from './images/diy.jpeg';
import music from './images/music.jpeg';
import art from './images/art.jpeg';
import gaming from './images/gaming.jpeg';
import fitness from './images/fitness.jpeg';
import tech from './images/tech.jpeg';

class Categories extends Component {
  render() {
    const { posts, auth, onChooseFilterCategory, profile } = this.props;
    let outputCategories;

    if(!posts) {
      outputCategories = null
    } else if (profile.loading === true) {
      outputCategories = <Loading />
    }
     else if (posts.length > 0 && profile.loading === false && profile.profile !== null ) {
      outputCategories = (
        <Fragment>
        <ForYou profileImage={profile.profile.profileImage} />
        <Category img={all} onChooseFilterCategory={onChooseFilterCategory} category="all" /> 
        <Category img={diy} onChooseFilterCategory={onChooseFilterCategory} category="diy" />
        <Category img={music} onChooseFilterCategory={onChooseFilterCategory} category="music" />
        <Category img={art} onChooseFilterCategory={onChooseFilterCategory} category="art" />
        <Category img={gaming} onChooseFilterCategory={onChooseFilterCategory} category="gaming" />
        <Category img={fitness} onChooseFilterCategory={onChooseFilterCategory} category="fitness" />
        <Category img={tech} onChooseFilterCategory={onChooseFilterCategory} category="tech" />
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

Categories.propTypes = {
  onChooseFilterCategory: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(Categories);
