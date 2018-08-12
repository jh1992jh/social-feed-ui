import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser, registerUser } from '../../actions/authActions';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';

class Login extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        password2: '',
        showForm: 'signin',
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

    showSigninForm = () => {
        this.setState({showForm: 'signin'})
    }

    showSingupForm = () => {
        this.setState({showForm: 'signup'})
    } 

    onRegisterUser = e => {
        e.preventDefault();

        const { email, username, password, password2, showForm } = this.state;

        const userData = {
            email,
            username,
            password,
            password2
        }

        this.props.registerUser(userData, this.props.history);

        if(Object.keys(this.state.errors).length === 0 && email.length !== 0) {
        this.setState({email: '', username: '', password: '', password2: '', showForm: 'signin'});
        }
    }
  render() {
      const { email, username, password, password2, showForm, errors } = this.state;     
    return (
      <div className="login">
        <div className="loginContainer">
        <LoginHeader showSigninForm={this.showSigninForm} showSingupForm={this.showSingupForm} showForm={showForm} />
       {/* <LoginForm onLoginUser={this.onLoginUser} onRegisterUser={this.onRegisterUser} email={email} username={username} password={password} password2={password2} onInputChange={this.onInputChange} showform={showForm} /> */}

       <form className="loginForm" onSubmit={showForm === 'signin' ? this.onLoginUser : this.onRegisterUser}>
                    <input type="email" name="email" value={email} onChange={this.onInputChange} placeholder="Email" />
                    {errors.email ? (
                        <p className="errorText">{errors.email}</p>
                    ): null}
                    {showForm === 'signup' ? (
                        <input type="text" name="username" value={username} onChange={this.onInputChange} placeholder="Username" />
                    ): null }
                    {errors.username ? (
                        <p className="errorText">{errors.username}</p>
                    ): null} 
                    <input type="password" name="password" value={password} onChange={this.onInputChange} placeholder="Password"/>
                    {errors.password ? (
                        <p className="errorText">{errors.password}</p>
                    ): null} 
                    {showForm === 'signup' ? (
                        <input type="password" name="password2" value={password2} onChange={this.onInputChange} placeholder="Confirm password" />
                    ): null }
                    {errors.password2 ? (
                        <p className="errorText">{errors.password2}</p>
                    ): null} 
                    <button>{showForm === 'signin' ? 'Sign in' : 'Sign up'}</button>
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

export default connect(mapStateToProps, { loginUser, registerUser })(withRouter(Login));