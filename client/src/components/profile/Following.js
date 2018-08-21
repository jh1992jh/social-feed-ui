import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile2Actions';

class Following extends Component {
    componentDidMount() {
        console.log(this.props.match.params.userId)
        this.props.getProfileById(this.props.match.params.userId)
    }
  render() {
    const { profile2 } = this.props;
    let outputFollowing;

    if(profile2.loading === true || profile2.profile === null) {
        outputFollowing = <h3>Loading</h3>
    } else if (profile2.loading === false && Object.keys(profile2.profile).length > 0 && profile2.profile.following.length > 0) {
        outputFollowing = profile2.profile.following.map(follow => (
            <Link to={`/profile/${follow.user}`} className="followItem">
                <img src={follow.profileImage} alt="profile pic"/>
                <span>{follow.handle}</span>
            </Link>
        ))
    } else if (profile2.profile === false && Object.keys(profile2.profile).length < 0 && profile2.profile.following.length === 0) {
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

const mapStateToProps = state => ({
    profile2: state.profile2
})

export default connect(mapStateToProps, { getProfileById })(Following);