import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addComment, getPost, addLike, removeLike  } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PostHeader from './PostHeader';
import SinglePostBody from './SinglePostBody';
import SinglePostFooter from './SinglePostFooter';
import Loading from '../../utilities/Loading';

const PostStyled = styled.div`
  margin: 0.8em 0;
  max-width: 100%;

  @media (min-width: 1000px) {
    margin: 5em auto !important;
    max-width: 45vw;
    margin: auto;
    max-height: 100vh;
    
    border-radius: 15px;
    background: #fff;
  }
`


class SinglePost extends Component {
    state = {
        postlikes: 0,
        liked: false
    }
  componentDidMount() {
  if (this.props.match.params.postId) {
    this.props.getPost(this.props.match.params.postId);
  }

  setTimeout(() => {
    if(this.props.profile.profile === null) {
        this.props.getCurrentProfile()
      }
  },10)

 
  }

  componentWillReceiveProps(nextProps) {

      if(nextProps.posts.post.likes) {
          this.setState({postlikes: nextProps.posts.post.likes.length}) 

            const { auth } = this.props;
       
            const checkLikes =  () => nextProps.posts.post.likes.filter(like => like.user === auth.user.id).length;
    
            if(checkLikes() === 1) {
                this.setState({liked: true})
            } 
      }

      
  }

  onAddLike = () => {
    const { postlikes } = this.state;
    this.props.addLike(this.props.match.params.postId)
    this.setState({postlikes: postlikes + 1, liked: true})

  }

  onRemoveLike = () => {
    const { postlikes } = this.state;
    this.props.removeLike(this.props.match.params.postId)
    this.setState({postlikes: postlikes - 1, liked: false})
  }

  render() {
    let postContent;

    const { post } = this.props.posts;
    const { postlikes, liked } = this.state;

    if (Object.keys(post).length > 0) {
      postContent = (
        <Fragment>
          <PostHeader
          showMenu={this.showMenu}
          onToggleMenu={this.onToggleMenu}
          profileImage={post.profileImage}
          handle={post.handle}
          postId={post.postId}
          userId={post.user}
          />
          <SinglePostBody
          postImage={post.postImage}
          filter={post.filter}
          postId={post.postId}
          profileImage={post.profileImage}
          onAddLike={this.onAddLike}
          onRemoveLike={this.onRemoveLike}
          handle={post.handle}
            text={post.text}
            likes={postlikes}
            liked={liked}
            date={post.date}
            comments={post.comments}
          />
          <SinglePostFooter
          handle={post.handle}
          text={post.text}
          date={post.date}
          profileImage={post.profileImage}
          postId={post.postId}
          likes={post.likes}
          postlikes={postlikes}
          comments={post.comments}
          userId={post.user}
          />
        </Fragment>
      );
    }  else if (
      this.props.match.params.postId && Object.keys(post).length === 0
    ) {
      postContent = <Loading />;
    }
    return (
      <Fragment>
        <PostStyled>{postContent}</PostStyled>
      </Fragment>
    );
  }
}

SinglePost.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addComment, getPost, addLike, removeLike, getCurrentProfile  }
)(withRouter(SinglePost));
