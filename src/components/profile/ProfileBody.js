import React from 'react';

const ProfileBody = ({ onShowAccountsOff, posts, profile }) => {
  const profilePosts = posts.filter(post => profile.name === post.name);
  const outputContent = profilePosts.map((post, i) => (
    <div key={i} className="profileBodyItem">
      <img src={post.postImg} alt="postImg" />
    </div>
  ));
  return (
    <div className="profileBody" onClick={onShowAccountsOff}>
      {outputContent}
    </div>
  );
};

export default ProfileBody;
