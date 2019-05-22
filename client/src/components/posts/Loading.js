import React from "react";
import styled from "styled-components";
import loadingGif from "./Cube-1s-200px.gif";
//import {keyframes} from 'styled-components';
/*
const loadingLineAnim = keyframes`
    from {width: 1%}
    to {width: 100%}
`
const LoadingStyled = styled.div`
    width: 100%;
    height: ${props => props.height};
    background: #fff;
`

const LoadingLine = styled.div`
    height: 100%;
    background: rgba(128, 128, 128, 0.2);
    width: 1%
    animation: ${loadingLineAnim} 0.7s linear infinite;
`
*/

const LoadingStyled = styled.img`
  position: absolute;
  z-index: 1050;
  width: 50px !important;
  height: 50px !important;
  top: calc(50vh - 25px);
  left: calc(50vw - 25px);
`;
const Loading = ({ height }) => (
  /*<LoadingStyled height={height}>
        <LoadingLine />
    </LoadingStyled>*/
  <LoadingStyled src={loadingGif} />
);

export default Loading;
