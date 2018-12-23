import React, { Fragment } from 'react';
import styled from 'styled-components';
import Likes from '../likes/Likes';

const Triangle = styled.div`
width: 0px;
height: 0px;
border-left: 25px solid transparent;
border-right: 25px solid transparent;
border-bottom: 55px solid #efefef;
margin: 1.6em 4.6em;
position: absolute;
`

const NavtopLikesStyled = styled.div`
position: fixed;
display: inline-block;
right: 16em;
top: 3.8em;
max-height: 30vw;
width: 30vw;
max-width: 30vw;
z-index: 2050;
background-color: #fff;
overflow-y: auto;
box-shadow: 0 0 5px rgba(0, 0, 0, 0.0975);
border-radius: 5px;
font-size: 1rem;
opacity: 1;
animation: appear 0.2s;
`

const NavtopLikes = () => (
    <Fragment>
        <Triangle>
            <NavtopLikesStyled>
                <Likes />
            </NavtopLikesStyled>
        </Triangle>
    </Fragment>
)

export default NavtopLikes;