import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { addComment, deleteComment } from "../../actions/postActions";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

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
`;

const Username = styled.span`
  font-weight: 600;
`;

const DesktopHr = styled.hr`
  margin: 1em 0;
  min-height: 1px;
  background: #d0d0d0;
  border: none;
  max-width: 100% !important;

  @media (max-width: 980px) {
    display: none;
  }
`;

const Comments = styled.div`
  overflow-y: auto;
  max-height: 26vh;
  margin-bottom: 0.5em;
`;

const PostFooterComment = styled.div`
  display: flex;
  font-size: 0.8rem;
`;

const ProfileThumbnail = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 360px;
  border: 1px solid #808080;
  margin: -0.5em 0.3em 0.3em 0;
  position: relative;

  img {
    height: 20px;
    width: 20px;
    border-radius: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const CommentForm = styled.form`
  width: 100%;

  input {
    width: 100%;
    border: none;
  }
`;

const ViewAll = styled.p`
  color: #707070;
`;

const CommentName = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  margin: 0.2em;
  color: #222;
  margin: 0.2em 0;
`;

class PostFooter extends Component {
  state = {
    text: ""
  };

  onCommentInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCommentSubmit = e => {
    e.preventDefault();

    const { postId } = this.props.match.params;
    const { profile } = this.props.profile;
    const { text } = this.state;

    const commentData = {
      handle: profile.handle,
      profileImage: profile.profileImage,
      text
    };

    this.props.addComment(postId, commentData);
    this.setState({ text: "" });
  };
  render() {
    const {
      postlikes,
      comments,
      handle,
      text,
      postId,
      userId,
      profile
    } = this.props;

    let outputComments;

    if (comments.length > 0) {
      outputComments = (
        <Fragment>
          <Link to={`/post/${postId}`}>
            <ViewAll>View all {comments.length} comments</ViewAll>
          </Link>
          <p>
            <CommentName className="postCommentName">
              <Link to={`/profile/${comments[0].user}`}>
                {comments[0].handle}
              </Link>
            </CommentName>{" "}
            {comments[0].text}
          </p>
        </Fragment>
      );
    } else if (comments.length === 0) {
      outputComments = null;
    }
    return (
      <PostFooterStyled>
        <Likes>
          <p>{postlikes} likes </p>
        </Likes>

        <PostFooterText>
          <div>
            <Link to={`/profile/${userId}`}>
              <Username>{handle}</Username>
            </Link>{" "}
            <p>{text}</p>
          </div>
        </PostFooterText>
        <Comments>
          {outputComments}
          <DesktopHr />
        </Comments>
        <PostFooterComment>
          <ProfileThumbnail>
            {profile.profile !== null ? (
              <img src={profile.profile.profileImage} alt="profPic " />
            ) : null}
          </ProfileThumbnail>
          <Link to={`/post/${postId}`}>
            <CommentForm onSubmit={this.onCommentSubmit}>
              <input
                name="text"
                value={this.state.text}
                onChange={this.onCommentInputChange}
                type="text"
                placeholder="Add a comment..."
              />
            </CommentForm>
          </Link>
        </PostFooterComment>
      </PostFooterStyled>
    );
  }
}

PostFooter.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addComment, deleteComment }
)(withRouter(PostFooter));
