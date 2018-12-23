import React from 'react';
import { connect } from 'react-redux';
import { addCurrentPost, addLike, removeLike } from '../../actions/postActions';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
 
`

const Icons = styled.div`
  display: flex;
  margin: 0.2em 0;
  padding: 0 1em;

  i {
    margin-right: 0.5em;
    font-size: 1.2rem;
  }
`

const PostBody = ({postImage, filter, postId, liked, onAddLike, onRemoveLike}) => (
  <PostBodyStyled>
        <PostImg>
          <img src={postImage} className={filter !== 'none' ? filter : null } alt="post" />
        </PostImg>
        {/* <div className={this.props.match.params.postId ? 'singlePostImage forDesktop' : 'postBodyImage forDesktop'}>
          <img src={postImage} alt="post" className={filter !== 'none' ? filter : null } />
</div> */}
        <Icons>
          
          <i className="far fa-heart" onClick={liked ? () => onRemoveLike() : () => onAddLike()} style={liked ? {color:'#dd0000'} : null}/>
            <Link to={`/post/${postId}`}>
              <i className="far fa-comment" onClick={this.onAddCurrentPost} />
        </Link>
          

          {/* <div className="postBodyIconsLeft forDesktop">
          <i className="far fa-heart" onClick={liked ? () => onRemoveLike() : () => onAddLike()} style={liked ? {color:'#dd0000'} : null}/>

            <Link to={`/post/${postId}`}>
            <i className="far fa-comment" onClick={this.onAddCurrentPost} />
      </Link>
</div> */}
          
        </Icons>
      </PostBodyStyled>
)


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
