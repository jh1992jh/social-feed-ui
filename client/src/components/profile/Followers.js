import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profileActions';
import PropTypes from 'prop-types';

class Followers extends Component {
    componentDidMount() {
        console.log(this.props.match.params.userId)
        this.props.getProfileById(this.props.match.params.userId)
    }
  render() {
    const { profile } = this.props;
    let outputFollowers;

    if(profile.loading === true || profile.profile === null) {
        outputFollowers = <h3>Loading</h3>
    } else if (profile.loading === false && Object.keys(profile.profile).length > 0 && profile.profile.followers.length > 0) {
        outputFollowers = profile.profile.followers.map(follow => (
            <Link to={`/profile/${follow.user}`} className="followItem">
                <img src={follow.profileImage} alt="profile pic"/>
                <span>{follow.handle}</span>
            </Link>
        ))
    } else {
        outputFollowers = <h3>User has no followers</h3> 
    }
    return (
      <div className="followersContainer">
        <div className="followersHeader"> 
        <i className="fas fa-arrow-left" onClick={() => this.props.history.go(-1)}/> 
      <h3>Followers</h3>
      </div>
      {outputFollowers}
      </div>
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