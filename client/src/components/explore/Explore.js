import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { getProfiles } from "../../actions/profileActions";
import styled from "styled-components";
import PropTypes from "prop-types";
import Categories from "./Categories";
import ExploreItem from "./ExploreItem";
import SuggestedPeople from "./SuggestedPeople";
import Loading from "../posts/Loading";
// import Loading from '../../utilities/Loading';

const ExploreStyled = styled.div`
  .exploreItems {
    margin-bottom: 3.1em;
    margin-top: 0.1em;
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 980px) {
    .exploreItems img,
    .exploreItems a {
      width: 33vw;
      height: 33vw;
    }

    .exploreItems :nth-child(18n + 2),
    .exploreItems :nth-child(18n + 2) img {
      width: 66vw;
      height: 66vw;
    }

    .exploreItems :nth-child(18n + 10),
    .exploreItems :nth-child(18n + 10) img {
      width: 66vw;
      height: 66vw;
    }

    .exploreItems :nth-child(18n + 3) {
      margin-top: -33vw;
    }

    .exploreItems :nth-child(18n + 15) {
      margin-top: -33vw;
    }

    .exploreItems :nth-child(18n + 4) {
      margin-left: -33vw;
    }

    .exploreItems :nth-child(18n + 14) {
      margin-right: -33vw;
    }
  }

  @media (min-width: 1000px) {
    img {
      width: 20vw;
      height: 22vw;
      display: block;
    }
    .exploreItems {
      width: 90%;
      margin: auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 3vw;
      margin: auto;
    }
  }
`;

const ForDesktop = styled.div`
  @media (max-width: 1000px) {
    display: none;
  }
`;

class Explore extends Component {
  state = {
    filterCategory: "all"
  };
  componentDidMount() {
    this.props.getPosts();
    this.props.getProfiles();
  }

  onChooseFilterCategory = category => {
    this.setState({ filterCategory: category });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile !== null) {
      if (Object.keys(nextProps.profile.profile).length === 0) {
        this.props.history.push("/no-profile");
      }
    }
  }
  render() {
    const { posts, loading } = this.props.posts;
    const { profiles } = this.props.profile;
    const { filterCategory } = this.state;
    let outputContent;

    let filteredPosts = posts.filter(post => post.category === filterCategory);
    if (filterCategory === "all") filteredPosts = posts;
    if (loading === true) {
      outputContent = <Loading />;
    } else if (loading === false && posts.length > 0) {
      outputContent = filteredPosts.map((post, i) => (
        <Fragment key={i}>
          <ExploreItem post={post} />
        </Fragment>
      ));
    } else if (loading === false && posts.length === 0) {
      outputContent = <h3>There are no posts</h3>;
    }
    return (
      <ExploreStyled>
        {/* <ExploreHeader /> */}
        <ForDesktop>
          {loading === false && profiles !== null ? (
            <SuggestedPeople profiles={profiles} />
          ) : null}
        </ForDesktop>
        <Categories
          onChooseFilterCategory={this.onChooseFilterCategory}
          posts={posts}
        />

        <div className="exploreItems">{outputContent}</div>
      </ExploreStyled>
    );
  }
}

Explore.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getPosts, getProfiles }
)(Explore);
