import React from 'react'

 const LoginForm = ({onLoginUser, onRegisterUser, email, username, password, password2, onInputChange, showForm}) => {
  return (
    <form className="loginForm" onSubmit={showForm === 'signin' ? onLoginUser : onRegisterUser}>
                    <input type="email" name="email" value={email} onChange={onInputChange} placeholder="Email" />
                    {showForm === 'signup' ? (
                        <input type="text" name="username" value={username} onChange={onInputChange} placeholder="Username" />
                    ): null }
                    <input type="password" name="password" value={password} onChange={onInputChange} placeholder="Password"/>
                    {showForm === 'signup' ? (
                        <input type="password" name="password2" value={password2} onChange={onInputChange} placeholder="Confirm password" />
                    ): null }
                    <button type="submit">{showForm === 'signin' ? 'Sign in' : 'Sign up'}</button>
                </form>
  )
}

export default LoginForm