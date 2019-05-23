import React from "react";
import { connect } from "react-redux";
import { addCurrentPost, addLike, removeLike } from "../../actions/postActions";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { icons } from "../../images-and-icons";

const PostBodyStyled = styled.div`
  min-width: 100%;
  margin: 0.5em 0;
`;

const PostImg = styled.div`
  min-width: 100%;
  margin: 0.5em 0;

  img {
    height: auto;
    width: 100%;
  }

  @media (min-width: 1000px) {
    img {
      min-width: 100%;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  margin: 0.2em 0;
  padding: 0 1em;

  img {
    width: 30px;
    height: auto;
  }
`;

const Like = styled.div`
  margin-right: 0.5em;
`;

const PostBody = ({
  postImage,
  filter,
  postId,
  liked,
  onAddLike,
  onRemoveLike
}) => (
  <PostBodyStyled>
    <PostImg>
      <img
        src={postImage}
        className={filter !== "none" ? filter : null}
        alt="post"
      />
    </PostImg>
    <Icons>
      {liked ? (
        <Like>
          <img src={icons.liked} alt="unlike" onClick={() => onRemoveLike()} />
        </Like>
      ) : (
        <Like>
          <img src={icons.likes} alt="unlike" onClick={() => onAddLike()} />
        </Like>
      )}

      <Link to={`/post/${postId}`}>
        <img
          src={icons.comment}
          alt="comment"
          onClick={this.onAddCurrentPost}
        />
      </Link>
    </Icons>
  </PostBodyStyled>
);

PostBody.propTypes = {
  auth: PropTypes.object.isRequired,
  addCurrentPost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addCurrentPost, addLike, removeLike }
)(withRouter(PostBody));
