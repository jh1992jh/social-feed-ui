import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profileActions';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CreateProfileStyled = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 100vh;

h3 {
    justify-self: flex-start;
}

img {
    width: 80%;
    height: auto
    margin: 0 auto;
}

@media (min-width: 1000px) {
    img {
        width: auto;
        max-height: 50%;
    }
}
`;

const PlaceHolder = styled.div`
width: 30vh;
height: 30%;
border: 1px solid #222;
`

const CreateProfileForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    input {
        box-shadow: 0 2px 0 -1px #808080;
        margin: 1.5em 0;
      }
`

class CreateProfile extends Component {
    state = {
        handle: '',
        description: '',
        profileImage: null,
        previewImage: null
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    profileImageUpload = e => {
        this.setState({ profileImage: e.target.files[0], previewImage: URL.createObjectURL(e.target.files[0])})
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
      const { handle, description, previewImage } = this.state;

    return (
      <CreateProfileStyled>
        <h3>Create a Profile</h3>
        {previewImage !== null ? <img src={previewImage} alt="profile"/> : <PlaceHolder /> }
      <CreateProfileForm onSubmit={this.onFormSubmit}>
        <input type="text" name="handle" value={handle} onChange={this.onInputChange} placeholder="Handle"/>
        <input type="text" name="description" value={description} onChange={this.onInputChange} placeholder="description" />
        <input type="file" name="profileImage" onChange={this.profileImageUpload} placeholder="Profile image" />
        <button>Submit</button>
      </CreateProfileForm>
      </CreateProfileStyled>
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