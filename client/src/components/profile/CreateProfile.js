import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';

class CreateProfile extends Component {
    state = {
        handle: '',
        description: '',
        profileImage: null
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    profileImageUpload = e => {
        this.setState({ profileImage: e.target.files[0]})
    }

    onFormSubmit = e => {
        e.preventDefault()

        const { handle, description, profileImage } = this.state;

        /* const profileData = {
            handle,
            description,
            profileImage
        } */

        const fd = new FormData();

        fd.append('handle', handle);
        fd.append('description', description);
        fd.append('profileImage', profileImage)

        this.props.createProfile(fd, this.props.history)
    }
  render() {
      const { handle, description } = this.state;

    return (
      <div className="createProfile">
      <i className="far fa-user-circle" />
        <h3>Create a Profile</h3>
      <form className="createProfileForm" onSubmit={this.onFormSubmit}>
        <input type="text" name="handle" value={handle} onChange={this.onInputChange} placeholder="Handle"/>
        <input type="text" name="description" value={description} onChange={this.onInputChange} placeholder="description" />
        <input type="file" name="profileImage" onChange={this.profileImageUpload} placeholder="Profile image" />
        <button>Submit</button>
      </form>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile2: state.profile
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));