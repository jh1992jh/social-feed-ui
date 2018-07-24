import React, { Fragment, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class PostFooter extends Component {
  render() {
    const {
      postImg,
      likes,
      name,
      postText,
      time,
      profPic,
      postId,
      authUserProfPic,
      userId,
      comments,
      commentInput,
      onCommentInputChange,
      onCommentSubmit
    } = this.props;
    let outputComments;

    if (Object.keys(this.props.match.params).length > 0) {
      outputComments = (
        <Fragment>
          {this.props.comments.map((comment, i) => (
            <Fragment key={i}>
              <div className="commentContainer">
                <div className="roundedProfThumbSmall">
                  <img src={comment.profPic} alt="profPic " />
                </div>
                <p>
                  <span className="postCommentName">{comment.name} </span>
                  {comment.commentText}
                </p>
                <br />
              </div>
              <p className="commentTime">{comment.commentTime}</p>
            </Fragment>
          ))}
        </Fragment>
      );
    } else {
      outputComments = (
        <Fragment>
          <p className="viewAll">View all {comments.length} comments</p>
          <p>
            <span className="postCommentName">{comments[0].name} </span>
            {comments[0].commentText}
          </p>
        </Fragment>
      );
    }
    return (
      <div className="postFooter">
        <div className="postFooterLikes">
          <p>{likes} likes</p>
        </div>
        <div className="postFooterText">
          <p>
            <Link to={`/profile/${userId}`}>
              <span className="postFooterUserName">{name}</span>
            </Link>{' '}
            {postText}
          </p>
        </div>
        {outputComments}
        <div className="forDesktop ago">{time} HOURS AGO</div>
        <hr className="forDesktop" />
        <div className="postFooterComment">
          <div className="roundedProfThumbVerySmall">
            <img src={authUserProfPic} alt="profPic " />
          </div>
          <form onSubmit={onCommentSubmit}>
            <input
              name="commentInput"
              value={commentInput}
              onChange={onCommentInputChange}
              type="text"
              placeholder="Add a comment..."
            />
          </form>
        </div>
        <div className="postFooterTime">{time} HOURS AGO</div>
      </div>
    );
  }
}

export default withRouter(PostFooter);
