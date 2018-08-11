import React, { Fragment } from 'react'

const LoginHeader = ({showSigninForm, showSingupForm, showForm}) => {
  return (
    <Fragment>
    <div className="loginHeader">
    <h3 onClick={() => showSigninForm()} className={showForm === 'signin' ? 'selected' : null}>Sing in</h3>
    <h3 onClick={() => showSingupForm()} className={showForm === 'signup' ? 'selected' : null}>Sign up</h3>
</div>

<div className="loginBrand">
    <i className="fas fa-camera" />
    <h1 className="brandText">
        SocialFeed
    </h1>
</div>
    </Fragment>
  )
}

export default LoginHeader;