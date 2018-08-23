import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCurrentProfile, editProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';

class EditProfile extends Component {
    state = {
        description: '',
        profileImage: ''
    }
    componentDidMount () {
      this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.profile.profile !== null ) {
            this.setState({ description: nextProps.profile.profile.description, profileImage: nextProps.profile.profile.profileImage})
        }
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onFormSubmit = e => {
        e.preventDefault()

        const { description, profileImage } = this.state;

        const profileData = {
            description,
            profileImage
        }

        this.props.editProfile(profileData, this.props.history);
    }
    
  render() {
    const { loading, profile } = this.props.profile;
    const { description, profileImage } = this.state;
    
    let outputContent;

    if(loading === true || profile === null ) {
        outputContent = <h1>Loading</h1>
    } else if (loading === false && profile !== null ) {
        outputContent = (
            <form className="editProfileForm" onSubmit={this.onFormSubmit}>
                <input type="text" name="description" value={description} onChange={this.onInputChange} />
                <input type="text" name="profileImage" value={profileImage} onChange={this.onInputChange} />
                <button>Submit</button>
            </form>
        )
    }
    return (
      <div className="editProfile">
      <i className="fas fa-user-edit" />
        <h3>Edit Profile</h3>
        {outputContent}
      </div>
    )
  }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, editProfile })(EditProfile);