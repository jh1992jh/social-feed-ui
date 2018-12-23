import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LoginHeader from './LoginHeader';

const RegisterStyled = styled.div`
    min-height: 100%;
    width: 100vw;
    position: relative;
    background-color: #f9f9f9;
`

const RegisterContainer = styled.div`
    position: absolute;
    top: 5vh;
    left: 5vw;
    display: flex;
    flex-direction: column;
    padding: 1em;
    width: 80vw;
`
    
const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ErrorContainer = styled.div`
    min-height: 1rem;
`;

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
        <RegisterStyled>
        <RegisterContainer>
        <LoginHeader  />

       <RegisterForm onSubmit={this.onRegisterUser}>
                    <input type="email" name="email" value={email} onChange={this.onInputChange} placeholder="Email" />
                    <ErrorContainer>
                    {errors.email ? (
                        <p className="errorText">{errors.email}</p>
                    ): null}
                    </ErrorContainer>
                        <input type="text" name="username" value={username} onChange={this.onInputChange} placeholder="Username" />
                        <ErrorContainer>
                    {errors.username ? (
                        <p className="errorText">{errors.username}</p>
                    ): null} 
                    </ErrorContainer>
                    
                    <input type="password" name="password" value={password} onChange={this.onInputChange} placeholder="Password"/>
                    <ErrorContainer>
                    {errors.password ? (
                        <p className="errorText">{errors.password}</p>
                    ): null} 
                        </ErrorContainer>
                        <input type="password" name="password2" value={password2} onChange={this.onInputChange} placeholder="Confirm password" />
                        <ErrorContainer>
                    {errors.password2 ? (
                        <p className="errorText">{errors.password2}</p>
                    ): null} 
                    </ErrorContainer>
                    <button>Sign up</button>
                </RegisterForm>

                
           
        </RegisterContainer>
      </RegisterStyled>
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