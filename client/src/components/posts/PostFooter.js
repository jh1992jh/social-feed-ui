import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { addComment, deleteComment } from '../../actions/postActions';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

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
      likes,
      comments,
      date,
      handle,
      text,
      auth,
      userId,
      profile
    } = this.props;
   
    let outputComments;

    if (this.props.match.params.postId && this.props.profile.profile !== null) {
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
                  
                  <span className="commentText">
                  {comment.text} {auth.user.id === comment.user ? (
                    <i className="far fa-trash-alt" onClick={() => this.props.deleteComment(this.props.match.params.postId, comment._id)} />
                  ) : null} </span>
                </p>
                <br />
              </div>
              <Moment fromNow className="commentTime">{comment.date}</Moment>
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
            {' '}
            {comments[0].text}
          </p>
        </Fragment>
      );
    }
    return (
      <div className="postFooter">
      
        {likes.length > 0 ? (
          <div className="postFooterLikes">
          <p>{likes.length} likes <br />
          </p>
        </div>
        ) : <div className="postFooterLikes"/> }
  
        <div className="postFooterText">
        {this.props.match.params.postId ? <Moment fromNow className="postFooterTime">{date}</Moment> : null}
        <p>
        <Link to={`/profile/${userId}`}>
        <span className="postFooterUserName">{handle}</span>
        </Link> {' '}
       <p>{text}</p> 
        
        
        </p>
        </div>
        <div className={this.props.match.params.postId ? "postFooterComments postFooterCommentsSingle" : "postFooterComments"}>
        {outputComments}
        <Moment fromNow className="forDesktop ago">{date}</Moment>
        <hr className="forDesktop" />
        </div>
        <div className={this.props.match.params.postId ? 'postFooterComment singlePostForm' : 'postFooterComment'}>
          <div className="roundedProfThumbVerySmall">
            {profile.profile !== null ? <img src={profile.profile.profileImage} alt="profPic " /> : null}
          </div>
          <form onSubmit={this.onCommentSubmit}>
            <input
              name="text"
              value={this.state.text}
              onChange={this.onCommentInputChange}
              type="text"
              placeholder="Add a comment..."
            />
          </form>
        </div>
        
        {this.props.match.params.postId ? null : <Moment fromNow className="postFooterTime">{date}</Moment>}
      </div>
    );
  }
}

PostFooter.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { addComment, deleteComment })(withRouter(PostFooter))
