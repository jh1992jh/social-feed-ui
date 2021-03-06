import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
//import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { toggleLikesMenu } from '../../actions/postActions';

const LikeInfoStyled = styled.div`
display: flex;
align-items: center;
padding: 0.5em;

@media (min-width: 1000px) {
  max-width: 28vw;
}
`

const LikeInfoContainer = styled.div`
display: flex

p {
  max-width: 75vw;
  width: 65vw;
}
@media (min-width: 1000px) {
  max-width: 28vw;
}
`;

const ProfilePicSmall = styled.div`
max-height: 30px;
min-width: 30px;
border-radius: 360px;
border: 1px solid #808080;
margin: 0.5em;

img {
  height: 30px;
  width: 30px;
  border-radius: 360px;
}
`;

const Username = styled.span`
  font-weight: 600;
`

const LikedPostPic = styled.div`
min-height: 30px;
min-width: 30px;
border: 1px solid #808080;
margin: 0.8em;
align-self: flex-start;
position: relative;

img {
  height: 30px;
  width: 30px;
  position: absolute;
  top: 0;
  left: 0;
}
`;
const LikeInfo = ({ post }) => {
  const { profileImage, handle, date, text, postId, postImage } = post;
      return (
        <LikeInfoStyled>
      <Link to={`/post/${postId}`} onClick={() => this.props.toggleLikesMenu()}>
      <LikeInfoContainer>
        <ProfilePicSmall>
          <img src={profileImage} alt="profPic" />
        </ProfilePicSmall>
        <p>
       
          <Username>{handle} </Username>

            <span>commented: {text}</span>
        
          {' '}
          <Moment fromNow className="ago">{date}</Moment>
         
        </p>
        <LikedPostPic>
          <img src={postImage} alt="postPic" />
          </LikedPostPic>
      </LikeInfoContainer>
      </Link>
    </LikeInfoStyled>
      )
     
};

/*LikeInfo.propTypes = {
  comments: PropTypes.array.isRequired,
  postImage: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired
}*/

export default connect(null, { toggleLikesMenu })(LikeInfo);
