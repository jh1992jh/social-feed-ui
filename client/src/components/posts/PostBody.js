import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentPost, addLike, removeLike } from '../../actions/postActions';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios'
import PropTypes from 'prop-types';

class PostBody extends Component {
  state = {
    image: ''
  }
  componentDidMount() {
    console.log(typeof this.props.postImage)
  }
  onAddCurrentPost = () => {
    this.props.addCurrentPost(this.props);
  }

  onAddLike = () => {
    this.props.addLike(this.props.match.params.postId)
  }

  onRemoveLike = () => {
    this.props.removeLike(this.props.match.params.postId)
  }
  render() {
    const {
      postImage,
      postId,
      likes,
      auth
    } = this.props;
    const checkLikes =  () => likes.filter(like => like.user === auth.user.id).length
    return (
      <div className="postBody">
        <div className="postBodyImg">
          <img src={postImage} alt="post" />
        </div>
        <div
          className="postBodyIcons"
        >
          <div className="postBodyIconsLeft forMobile">
            <i className="far fa-heart" onClick={checkLikes() === 1 ? this.onRemoveLike : this.onAddLike} style={checkLikes() ? {color:'#dd0000'} : null}/>
            <Link to={`/post/${postId}`}>
              <i className="far fa-comment" onClick={this.onAddCurrentPost} />
        </Link>

            <i className="far fa-paper-plane" />
          </div>

          <div className="postBodyIconsLeft forDesktop">
            <i className="far fa-heart" />

            <i className="far fa-comment" />
          </div>
          <div className="postBodyIconsRight">
            <i className="far fa-bookmark" />
          </div>
        </div>
      </div>
    );
  }
}

PostBody.propTypes = {
  auth: PropTypes.object.isRequired,
  addCurrentPost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { addCurrentPost, addLike, removeLike }
)(withRouter(PostBody));
