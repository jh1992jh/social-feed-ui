import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { addComment, deleteComment } from '../../actions/postActions';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PostFooterStyled = styled.div`
  padding: 0.3em;
  font-size: 0.9rem;
`;

const Likes = styled.div`
  font-weight: 600;
  margin-top: -0.8em;
  min-height: 2rem;
`;

const PostFooterText = styled.div`
  margin-top: -1.3em;

  .postFooterTime {
    color: #707070;
    margin-top: 0;
    font-size: 0.5rem;
  }
`;

const Username = styled.span`
  font-weight: 600;
`

const Comments = styled.div`
  min-height: 28.5vh;
  max-height: 28.5vh;

  @media (min-width: 1000px) {
    width: 100%;
    max-height: 30vh;
    overflow-y: scroll;
  }
`

const CommentForm = styled.div`
  display: flex;
  font-size: 0.8rem;
  width: 100%;
  background: #fff;

  form {
    min-width: 100%;
  }

  input {
    width: 100%;
    margin-left: 2em;
  }

  @media (max-width: 980px) {
    position: fixed;
  bottom: 4em;
  left: 0;

  input {
    border: 2px solid #888;
  }
  }

  @media (min-width: 1000px) {
    position: static;
    bottom: 0;
    input {
      border: none;
      max-width: calc(100% - 30px)
    }
  }
`

const ProfileThumbnail = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 360px;
  border: 1px solid #808080;
  margin: -0.5em 0.3em 0.3em 0;
  position: relative;

  img {
    height: 30px;
    width: 30px;
    border-radius: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`

const CommentContainer = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
position: relative;
padding: 0.5em;
margin: 0.1em 0;

p {
  display: inline;
}

.fa-trash-alt {
  position: absolute;
  right: 1em;
  bottom: 50%
}
`

const CommentName = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  margin: 0.2em;
  color: #222;
  margin: 0.2em 0.5em;
`

const CommentTime = styled.div`
display: block;
color: #707070;
margin: -1.5em 0 1em 2.5em;
`

class SinglePostFooter extends Component {
  state = {
    text: ''
  }
  
  onCommentInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCommentSubmit = e  => {
    e.preventDefault();

    const { postId } = this.props.match.params;
    const { profile } = this.props.profile;
    const { text } = this.state;

    const commentData = {
      handle: profile.handle,
      profileImage: profile.profileImage,
      text
    }

    this.props.addComment(postId, commentData)
    this.setState({text: ''})
  }
  render() {
    const {
      postlikes,
      comments,
      date,
      handle,
      text,
      auth,
      userId,
      profile
    } = this.props;
   
    let outputComments;

    if (this.props.profile.profile !== null) {
      outputComments = (
        <Fragment>
          {this.props.comments.map((comment, i) => (
            <Fragment key={comment._id}>
              <CommentContainer>
                <ProfileThumbnail>
                  <img src={comment.profileImage} alt="profPic " />
                </ProfileThumbnail>
                <p>
                  <CommentName>
                  <Link to={`/profile/${comment.user}`}>
                  {comment.handle}
                  </Link>
                  </CommentName>
                  
                  <span className="commentText">
                  {comment.text} {auth.user.id === comment.user ? (
                    <i className="far fa-trash-alt" onClick={() => this.props.deleteComment(this.props.match.params.postId, comment._id)} />
                  ) : null} </span>
                </p>
                <br />
              </CommentContainer>
              <CommentTime>
                <Moment fromNow className="commentTime">{comment.date}</Moment>
              </CommentTime>
            </Fragment>
          ))}
        </Fragment>
      );
    }  else if (comments.length === 0) {
      outputComments = null
    }  
    
    return (
      <PostFooterStyled>
      
      
          <Likes>
            <p>{postlikes} likes <br />
            </p>
          </Likes>
        
  
        <PostFooterText>
             <Moment fromNow className="postFooterTime">{date}</Moment> 
        </PostFooterText>
        <Link to={`/profile/${userId}`}>
        <Username>{handle}</Username>
        </Link> {' '}
       <p>{text}</p> 
        
        
        
        
        <Comments>
        {outputComments}
        </Comments>
        <CommentForm>
          <ProfileThumbnail>
            {profile.profile !== null ? <img src={profile.profile.profileImage} alt="profPic " /> : null}
          </ProfileThumbnail>
          <form onSubmit={this.onCommentSubmit}>
            <input
              name="text"
              value={this.state.text}
              onChange={this.onCommentInputChange}
              type="text"
              placeholder="Add a comment..."
            />
          </form>
        </CommentForm>
        
        
      </PostFooterStyled>
    );
  }
}

SinglePostFooter.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { addComment, deleteComment })(withRouter(SinglePostFooter))
