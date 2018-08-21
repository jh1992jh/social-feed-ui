import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile2Actions';

class Followers extends Component {
    componentDidMount() {
        console.log(this.props.match.params.userId)
        this.props.getProfileById(this.props.match.params.userId)
    }
  render() {
    const { profile2 } = this.props;
    let outputFollowers;

    if(profile2.loading === true || profile2.profile === null) {
        outputFollowers = <h3>Loading</h3>
    } else if (profile2.loading === false && Object.keys(profile2.profile).length > 0 && profile2.profile.followers.length > 0) {
        outputFollowers = profile2.profile.followers.map(follow => (
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

const mapStateToProps = state => ({
    profile2: state.profile2
})

export default connect(mapStateToProps, { getProfileById })(Followers);