import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
//import ForYou from './ForYou';
import Category from './Category';
import Loading from '../../utilities/Loading';
import all from './images/all.jpeg'
import diy from './images/diy.jpeg';
import music from './images/music.jpeg';
import art from './images/art.jpeg';
import gaming from './images/gaming.jpeg';
import fitness from './images/fitness.jpeg';
import tech from './images/tech.jpeg';

const ExploreCategories = styled.div`
    display: flex;
    padding: 0.5em;
    overflow-x: scroll;
    max-width: 100vw;
    height: 15vw;
    position: sticky;
    top: -2.5em;
    left: 0;
    right: 0;
    z-index: 1030;
    background: #fff;

    @media (min-width: 1000px) {
      display: none;
    }
`;

const Categories = ({posts, onChooseFilterCategory, profile}) => {
  let outputCategories;

  if(!posts) {
    outputCategories = null
  } else if (posts.loading === true) {
    outputCategories = <Loading />
  }
   else {
    outputCategories = (
      <Fragment>
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
    <ExploreCategories>
  {outputCategories}
    </ExploreCategories>
  );
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
