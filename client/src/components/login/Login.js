import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LoginHeader from './LoginHeader';

const LoginStyled = styled.div`
    min-height: 100%;
    width: 100vw;
    position: relative;
    background-color: #f9f9f9;
`

const LoginContainer = styled.div`
    position: absolute;
    top: 5vh;
    left: 5vw;
    display: flex;
    flex-direction: column;
    padding: 1em;
    width: 80vw;
`
    
const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ErrorContainer = styled.div`
    min-height: 1rem;
`;
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
      <LoginStyled>
        <LoginContainer>
        <LoginHeader  />

       <LoginForm onSubmit={this.onLoginUser}>
                    <input type="email" name="email" value={email} onChange={this.onInputChange} placeholder="Email" />
                    <ErrorContainer>
                    {errors.email ? (
                        <p className="errorText">{errors.email}</p>
                    ): null}
                    </ErrorContainer>
                    <input type="password" name="password" value={password} onChange={this.onInputChange} placeholder="Password"/>
                    <ErrorContainer>
                    {errors.password ? (
                        <p className="errorText">{errors.password}</p>
                    ): null} 
                    </ErrorContainer>
                    <button>Sign in</button>
        </LoginForm>
 
                
           
        </LoginContainer>
      </LoginStyled>
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