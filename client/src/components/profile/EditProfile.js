import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import { getCurrentProfile, editProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loading from '../../utilities/Loading';

const EditProfileStyled = styled.div`
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

const EditProfileForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    input {
        box-shadow: 0 2px 0 -1px #808080;
        margin: 1.5em 0;
      }
`

class EditProfile extends Component {
    state = {
        description: '',
        profileImage: null,
        previewImage: null
    }
    componentDidMount () {
      this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.profile.profile !== null ) {
            this.setState({ description: nextProps.profile.profile.description, profileImage: nextProps.profile.profile.profileImage, previewImage: nextProps.profile.profile.profileImage})
        }
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    profileImageHandler = e => {
        this.setState({profileImage: e.target.files[0], previewImage: URL.createObjectURL(e.target.files[0])})
        
    }
    onFormSubmit = e => {
        e.preventDefault()

        const { description, profileImage } = this.state;

        /*const profileData = {
            description,
            profileImage
        }*/

        const fd = new FormData();

        fd.append('description', description)
        fd.append('profileImage', profileImage)

        this.props.editProfile(fd, this.props.history);
    }
    
  render() {
    const { loading, profile } = this.props.profile;
    const { description, previewImage } = this.state;
    
    let outputContent;

    if(loading === true || profile === null ) {
        outputContent = <Loading  />
    } else if (loading === false && profile !== null ) {
        outputContent = (
            <Fragment>
                <img src={previewImage} alt="profile"/>
                <EditProfileForm onSubmit={this.onFormSubmit}>
                    <input type="text" name="description" value={description} onChange={this.onInputChange}
                    placeholder="description" />
                    <input type="file" name="profileImage" onChange={this.profileImageHandler} />
                    <button>Submit</button>
                </EditProfileForm>
            </Fragment>
        )
    }
    return (
      <EditProfileStyled>
        <h3>Edit Profile</h3>
        {outputContent}
      </EditProfileStyled>
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