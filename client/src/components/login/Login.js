import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser, registerUser } from '../../actions/authActions';
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
       {/* <LoginForm onLoginUser={this.onLoginUser} onRegisterUser={this.onRegisterUser} email={email} username={username} password={password} password2={password2} onInputChange={this.onInputChange} showform={showForm} /> */}

       <form className="loginForm" onSubmit={this.onLoginUser}>
                    <input type="email" name="email" value={email} onChange={this.onInputChange} placeholder="Email" />
                    {errors.email ? (
                        <p className="errorText">{errors.email}</p>
                    ): null}
                    <input type="password" name="password" value={password} onChange={this.onInputChange} placeholder="Password"/>
                    {errors.password ? (
                        <p className="errorText">{errors.password}</p>
                    ): null} 
                    <button>Sign in</button>
                </form>
 
                
           
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login));