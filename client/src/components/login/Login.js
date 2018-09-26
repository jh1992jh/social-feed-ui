import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import LoginHeader from './LoginHeader';
    

class Login extends Component {
    state = {
        email: '',
        password: '',
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

    onLoginUser = e => {
        e.preventDefault();

        const { email, password } = this.state;

        const userData = {
            email,
            password
        }

        this.props.loginUser(userData);
    }

   
  render() {
      const { email, password, errors } = this.state;     
    return (
      <div className="login">
        <div className="loginContainer">
        <LoginHeader  />

       <form className="loginForm" onSubmit={this.onLoginUser}>
                    <input type="email" name="email" value={email} onChange={this.onInputChange} placeholder="Email" />
                    <div className="errorContainer">
                    {errors.email ? (
                        <p className="errorText">{errors.email}</p>
                    ): null}
                    </div>
                    <input type="password" name="password" value={password} onChange={this.onInputChange} placeholder="Password"/>
                    <div className="errorContainer">
                    {errors.password ? (
                        <p className="errorText">{errors.password}</p>
                    ): null} 
                    </div>
                    <button>Sign in</button>
                </form>
 
                
           
        </div>
      </div>
    )
  }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login));