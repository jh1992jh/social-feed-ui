import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCurrentProfile, editProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import Loading from '../../utilities/Loading';

class EditProfile extends Component {
    state = {
        description: '',
        profileImage: null
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

    profileImageHandler = e => {
        this.setState({profileImage: e.target.files[0]})
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
    const { description } = this.state;
    
    let outputContent;

    if(loading === true || profile === null ) {
        outputContent = <Loading  />
    } else if (loading === false && profile !== null ) {
        outputContent = (
            <form className="editProfileForm" onSubmit={this.onFormSubmit}>
                <input type="text" name="description" value={description} onChange={this.onInputChange}
                placeholder="description" />
                <input type="file" name="profileImage" onChange={this.profileImageHandler} />
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