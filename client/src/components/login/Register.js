import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import LoginHeader from './LoginHeader';


class Register extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        password2: '',
        errors: {}
    }
    
    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
          this.props.history.push('/');
      }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }

        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors})
        }
    }
    
    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }



    onRegisterUser = e => {
        e.preventDefault();

        const { email, username, password, password2 } = this.state;

        const userData = {
            email,
            username,
            password,
            password2
        }

        this.props.registerUser(userData, this.props.history);
    }
  render() {
      const { email, username, password, password2, errors } = this.state;     
    return (
      <div className="login">
        <div className="loginContainer">
        <LoginHeader  />

       <form className="loginForm" onSubmit={this.onRegisterUser}>
                    <input type="email" name="email" value={email} onChange={this.onInputChange} placeholder="Email" />
                    <div className="errorContainer">
                    {errors.email ? (
                        <p className="errorText">{errors.email}</p>
                    ): null}
                    </div>
                        <input type="text" name="username" value={username} onChange={this.onInputChange} placeholder="Username" />
                        <div className="errorContainer">
                    {errors.username ? (
                        <p className="errorText">{errors.username}</p>
                    ): null} 
                    </div>
                    
                    <input type="password" name="password" value={password} onChange={this.onInputChange} placeholder="Password"/>
                    <div className="errorContainer">
                    {errors.password ? (
                        <p className="errorText">{errors.password}</p>
                    ): null} 
                        </div>
                        <input type="password" name="password2" value={password2} onChange={this.onInputChange} placeholder="Confirm password" />
                        <div className="errorContainer">
                    {errors.password2 ? (
                        <p className="errorText">{errors.password2}</p>
                    ): null} 
                    </div>
                    <button>Sign up</button>
                </form>

                
           
        </div>
      </div>
    )
  }
}

Register.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));