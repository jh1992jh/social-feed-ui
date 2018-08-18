import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profile2Actions';

class CreateProfile extends Component {
    state = {
        handle: '',
        description: '',
        profileImage: ''
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onFormSubmit = e => {
        e.preventDefault()

        const { handle, description, profileImage } = this.state;

        const profileData = {
            handle,
            description,
            profileImage
        }

        this.props.createProfile(profileData, this.props.history)
    }
  render() {
      const { handle, description, profileImage } = this.state;

    return (
      <div className="createProfile">
      <i className="far fa-user-circle" />
        <h3>Create a Profile</h3>
      <form className="createProfileForm" onSubmit={this.onFormSubmit}>
        <input type="text" name="handle" value={handle} onChange={this.onInputChange} placeholder="Handle"/>
        <input type="text" name="description" value={description} onChange={this.onInputChange} placeholder="description" />
        <input type="text" name="profileImage" value={profileImage} onChange={this.onInputChange} placeholder="http://placehold.it/200x200/92c952" />
        <button>Submit</button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile2: state.profile2
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));