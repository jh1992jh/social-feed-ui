import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
        <Category img={null} onChooseFilterCategory={onChooseFilterCategory} category="All" /> 
        <Category img={null} onChooseFilterCategory={onChooseFilterCategory} category="DIY" />
        <Category img={null} onChooseFilterCategory={onChooseFilterCategory} category="Music" />
        <Category img={null} onChooseFilterCategory={onChooseFilterCategory} category="Art" />
        <Category img={null} onChooseFilterCategory={onChooseFilterCategory} category="Gaming" />
        <Category img={null} onChooseFilterCategory={onChooseFilterCategory} category="Fitness" />
        <Category img={null} onChooseFilterCategory={onChooseFilterCategory} category="Tech" />
        <Category img={null} onChooseFilterCategory={onChooseFilterCategory} category="Art" /> 
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
  auth: state.auth
});

export default connect(mapStateToProps)(Categories);
