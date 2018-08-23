import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCurrentProfile, editProfile } from '../../actions/profile2Actions';

class EditProfile extends Component {
    state = {
        description: '',
        profileImage: ''
    }
    componentDidMount () {
      this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.profile2.profile !== null ) {
            this.setState({ description: nextProps.profile2.profile.description, profileImage: nextProps.profile2.profile.profileImage})
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
    const { loading, profile } = this.props.profile2;
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

const mapStateToProps = state => ({
    profile2: state.profile2
})

export default connect(mapStateToProps, { getCurrentProfile, editProfile })(EditProfile);