import React, { Component } from 'react';
import ContentItem from './ContentItem';

class CreatePostContent extends Component {
  constructor(props) {
    super(props);

    this.onAddCurrentImg = this.onAddCurrentImg.bind(this);

    this.state = {
      currentImg:
        'https://images.pexels.com/photos/314378/pexels-photo-314378.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
    };
  }

  onAddCurrentImg(img) {
    this.setState({ currentImg: img });
  }
  render() {
    const { currentImg } = this.state;
    return (
      <div className="createPostContent">
        <div className="createPostMainContent">
          <img src={currentImg} alt="Main content" />
          <div className="mainContentIconsLeft">
            <div className="mainContentIcon">
              <i className="fas fa-expand" />
            </div>
          </div>
          <div className="mainContentIconsRight">
            <div className="mainContentIcon">
              <i className="fas fa-infinity" />
            </div>

            <div className="mainContentIcon">
              <i className="far fa-images" />
            </div>
            <div className="mainContentIconText">
              <i className="far fa-clone" /> <span>SELECT MULTIPLE</span>
            </div>
          </div>
        </div>
        <div className="createPostContentItems">
          <ContentItem
            img="https://images.pexels.com/photos/314378/pexels-photo-314378.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            onAddCurrentImg={this.onAddCurrentImg}
          />
          <ContentItem
            img="https://images.pexels.com/photos/1139483/pexels-photo-1139483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            onAddCurrentImg={this.onAddCurrentImg}
          />
          <ContentItem
            img="https://images.pexels.com/photos/144428/pexels-photo-144428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            onAddCurrentImg={this.onAddCurrentImg}
          />
          <ContentItem
            img="https://images.pexels.com/photos/1122411/pexels-photo-1122411.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            onAddCurrentImg={this.onAddCurrentImg}
          />
          <ContentItem
            img="https://images.pexels.com/photos/1210494/pexels-photo-1210494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            onAddCurrentImg={this.onAddCurrentImg}
          />
          <ContentItem
            img="https://images.pexels.com/photos/572689/pexels-photo-572689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            onAddCurrentImg={this.onAddCurrentImg}
          />
          <ContentItem
            img="https://images.pexels.com/photos/551853/pexels-photo-551853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            onAddCurrentImg={this.onAddCurrentImg}
          />
          <ContentItem
            img="https://images.pexels.com/photos/160426/lead-man-sun-sunglasses-160426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            onAddCurrentImg={this.onAddCurrentImg}
          />
        </div>
      </div>
    );
  }
}

export default CreatePostContent;
