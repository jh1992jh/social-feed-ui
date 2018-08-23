import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { addComment, deleteComment } from '../../actions/post2Actions';
import { Link, withRouter } from 'react-router-dom';

class PostFooter extends Component {
  state = {
    text: ''
  }
  
  onCommentInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCommentSubmit = e  => {
    e.preventDefault();

    const { postId } = this.props.match.params;
    const { profile } = this.props.profile2;
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
      likes,
      comments,
      date,
      handle,
      text,
     // profileImage,
     // postId,
      auth,
      userId,
      profile2
    } = this.props;
   
    const { commentInput } = this.state;
    let outputComments;

    if (this.props.match.params.postId) {
      outputComments = (
        <Fragment>
          {this.props.comments.map((comment, i) => (
            <Fragment key={comment._id}>
              <div className="commentContainer">
                <div className="roundedProfThumbSmall">
                  <img src={comment.profileImage} alt="profPic " />
                </div>
                <p>
                  <span className="postCommentName">
                  <Link to={`/profile/${comment.user}`}>
                  {comment.handle}
                  </Link>
                  </span>
                  {comment.text} {auth.user.id === comment.user ? (
                    <i className="far fa-trash-alt" onClick={() => this.props.deleteComment(this.props.match.params.postId, comment._id)} />
                  ) : null}
                </p>
                <br />
              </div>
              <p className="commentTime">{comment.date}</p>
            </Fragment>
          ))}
        </Fragment>
      );
    }  else if (comments.length === 0) {
      outputComments = null
    }  else if (comments.length > 0){
      outputComments = (
        <Fragment>
          <p className="viewAll">View all {comments.length} comments</p>
          <p>
            <span className="postCommentName">
            <Link to={`/profile/${comments[0].user}`}>
            {comments[0].handle} 
            </Link>
            </span>
            {comments[0].text}
          </p>
        </Fragment>
      );
    }
    return (
      <div className="postFooter">
        {likes.length > 0 ? (
          <div className="postFooterLikes">
          <p>{likes.length} likes</p>
        </div>
        ) : null }
        <div className="postFooterText">
          <p>
             <Link to={`/profile/${userId}`}>
              <span className="postFooterUserName">{handle}</span>
    </Link> {' '}

            {text}
          </p>
        </div>
        {outputComments}
        <div className="forDesktop ago">{date} HOURS AGO</div>
        <hr className="forDesktop" />
        <div className="postFooterComment">
          <div className="roundedProfThumbVerySmall">
            <img src={profile2.profile.profileImage} alt="profPic " />
          </div>
          <form onSubmit={this.onCommentSubmit}>
            <input
              name="text"
              value={this.state.text}
              onChange={this.onCommentInputChange}
              type="text"
              placeholder="Add a comment..."
            />
            <button>Submit</button>
          </form>
        </div>
        <div className="postFooterTime">{date.toString()} HOURS AGO</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile2: state.profile2
})

export default connect(mapStateToProps, { addComment, deleteComment })(withRouter(PostFooter))
