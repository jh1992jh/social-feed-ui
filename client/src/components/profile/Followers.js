import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profileActions';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { icons } from '../../images-and-icons';

const FollowersStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5em;

    img {
        width: 30px;
        height: 30px;
        border-radius: 360px;
      }
`

const FollowersHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5em 0;

    h3 {
        margin: 0.5em
      }

    @media (min-width: 1000px) {
        margin-top: 5em;
    }
`;

const FollowItem = styled.div`
    display: flex;
    align-items: center;

    span {
        margin: 0.5em;
        font-weight: 600;
    }
`

const GoBack = styled.img`
    max-height: 1rem;
    max-width: 1rem;
`
class Followers extends Component {
    componentDidMount() {
        this.props.getProfileById(this.props.match.params.userId)
    }
  render() {
    const { profile } = this.props;
    let outputFollowers;

    if(profile.loading === true || profile.profile === null) {
        outputFollowers = <h3>Loading</h3>
    } else if (profile.loading === false && Object.keys(profile.profile).length > 0 && profile.profile.followers.length > 0) {
        outputFollowers = profile.profile.followers.map(follow => (
            <FollowItem key={follow._id}>
            <Link to={`/profile/${follow.user}`} className="followItem">
                <img src={follow.profileImage} alt="profile pic"/>
                <span>{follow.handle}</span>
            </Link>
            </FollowItem>
        ))
    } else {
        outputFollowers = <h3>User has no followers</h3> 
    }
    return (
      <FollowersStyled>
        <FollowersHeader> 
        <GoBack src={icons.goback} alt="go back" onClick={() => this.props.history.go(-1)}/> 
      <h3>Followers</h3>
      </FollowersHeader>
      {outputFollowers}
      </FollowersStyled>
    )
  }
}

Followers.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileById })(Followers);