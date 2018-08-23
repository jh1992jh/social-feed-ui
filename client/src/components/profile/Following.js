import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profileActions';
import PropTypes from 'prop-types';

class Following extends Component {
    componentDidMount() {
        console.log(this.props.match.params.userId)
        this.props.getProfileById(this.props.match.params.userId)
    }
  render() {
    const { profile } = this.props;
    let outputFollowing;

    if(profile.loading === true || profile.profile === null) {
        outputFollowing = <h3>Loading</h3>
    } else if (profile.loading === false && Object.keys(profile.profile).length > 0 && profile.profile.following.length > 0) {
        outputFollowing = profile.profile.following.map(follow => (
            <Link to={`/profile/${follow.user}`} className="followItem">
                <img src={follow.profileImage} alt="profile pic"/>
                <span>{follow.handle}</span>
            </Link>
        ))
    } else if (profile.profile === false && Object.keys(profile.profile).length < 0 && profile.profile.following.length === 0) {
        outputFollowing = <h3>User doesn't follow anyone</h3> 
    }
    return (
      <div className="followingContainer">
        <div className="followingHeader"> 
        <i className="fas fa-arrow-left" onClick={() => this.props.history.go(-1)}/> 
      <h3>Following</h3>
      </div>
      {outputFollowing}
      </div>
    )
  }
}

Following.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileById })(Following);