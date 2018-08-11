import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  addCurrentProfile,
  clearCurrentProfile
} from '../../actions/profileActions';
import ProfileHeaderTop from './ProfileHeaderTop';
import ProfileHeaderBottom from './ProfileHeaderBottom';
import ProfileBodyTop from './ProfileBodyTop';
import ProfileBody from './ProfileBody';
import NavbarTop from '../navbars/NavbarTop';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.onToggleShowAccounts = this.onToggleShowAccounts.bind(this);
    this.onShowAccountsOff = this.onShowAccountsOff.bind(this);

    this.state = {
      showAccounts: false
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.match.params).length > 0) {
      const findCurrentUser = () => {
        console.log(this.props.match.params.userId);
        const currentUser = this.props.match.params.userId;
        return currentUser;
      };
      const currentUserId = findCurrentUser();
      console.log(`The current users id is ${currentUserId}`);
      const filterCurrentProfile = () => {
        const currentProfile = this.props.profile.profiles.filter(
          profile => profile.userId === currentUserId
        );
        return currentProfile;
      };
      let currentProfile = filterCurrentProfile();
      this.props.addCurrentProfile(currentProfile);
    }
  }

  componentWillUnmount() {
    if (Object.keys(this.props.profile.currentProfile).length > 0) {
      this.props.clearCurrentProfile();
    }
  }

  onToggleShowAccounts() {
    const { showAccounts } = this.state;
    this.setState({ showAccounts: !showAccounts });
  }

  onShowAccountsOff() {
    this.setState({ showAccounts: false });
  }

  render() {
    const { showAccounts } = this.state;
    const { authUser, posts, profile } = this.props;
    let outputProfile;

    if (
      Object.keys(this.props.match.params).length > 0 &&
      Object.keys(this.props.profile.currentProfile).length > 0
    ) {
      outputProfile = (
        <Fragment>
          <div className="forDesktop">
            <NavbarTop />
          </div>
          <ProfileHeaderTop
            showAccounts={showAccounts}
            onToggleShowAccounts={this.onToggleShowAccounts}
            profPic={profile.currentProfile[0].profPic}
            name={profile.currentProfile[0].name}
            show={false}
          />
          <ProfileHeaderBottom
            onShowAccountsOff={this.onShowAccountsOff}
            profPic={profile.currentProfile[0].profPic}
            name={profile.currentProfile[0].name}
            description={profile.currentProfile[0].description}
            show={false}
            showOtherProfileBtn={true}
            authUserId={authUser.userId}
            currentUserId={profile.currentProfile[0]}
          />
          <ProfileBodyTop onShowAccountsOff={this.onShowAccountsOff} />
          <ProfileBody
            onShowAccountsOff={this.onShowAccountsOff}
            posts={posts.posts}
            profile={profile.currentProfile[0]}
          />
        </Fragment>
      );
    } else {
      outputProfile = (
        <Fragment>
          <div className="forDesktop">
            <NavbarTop />
          </div>
          <ProfileHeaderTop
            showAccounts={showAccounts}
            onToggleShowAccounts={this.onToggleShowAccounts}
            profPic={authUser.profPic}
            name={authUser.name}
          />
          <ProfileHeaderBottom
            onShowAccountsOff={this.onShowAccountsOff}
            profPic={authUser.profPic}
            name={authUser.name}
            description={authUser.description}
            authUserId={authUser.userId}
          />
          <ProfileBodyTop onShowAccountsOff={this.onShowAccountsOff} />
          <ProfileBody
            onShowAccountsOff={this.onShowAccountsOff}
            posts={posts.posts}
            profile={authUser}
          />
        </Fragment>
      );
    }
    return <div className="profile">{outputProfile}</div>;
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser,
  posts: state.posts,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addCurrentProfile, clearCurrentProfile }
)(withRouter(Profile));
