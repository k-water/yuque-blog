import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export default class Card extends Component {
  getReact() {
    const { cardHeight, active } = this.props;
    if (window.isMobile) {
      return {
        height: `${cardHeight}px`,
        width: `${cardHeight}px`,
      };
    }
    if (active) {
      return {
        height: `${cardHeight * 1.7}px`,
        width: `${cardHeight * 1.7}px`,
      };
    }
    return {
      height: `${cardHeight}px`,
      width: `${cardHeight}px`,
    };
  }

  getSummary() {
    const { post } = this.props;
    const { slug, tags = [], feature_image, title, updated_at, description } = post;
    const tagName = tags[0] && tags[0].name || '-';
    const date = new Date(updated_at)
      .toDateString()
      .replace(/ \w+/, '');
    return {
      slug,
      tagName,
      date,
      feature_image,
      title,
      desc: description,
    };
  }

  render() {
    const { post, active, cardHeight } = this.props;
    if (!post) {
      return null;
    }

    let { index } = this.props;
    index = index > 8 ? index + 1 : `0${index + 1}`;

    const { slug, title, feature_image, date, tagName, desc } = this.getSummary();
    const rectStyle = this.getReact();
    const url = `/post/${slug}`;
    let { className } = this.props;
    if (!Array.isArray(className)) {
      className = [className];
    }
    if (active && !window.isMobile) {
      className.push('active');
    }

    if (!active && !window.isMobile) {
      className.push('normal');
    }

    const mainHeight = cardHeight * (window.isMobile ? 1.3 : 1.7);
    return (
      <div
        className={['post-summary', ...className].join(' ')}
      >
        <div className="post-main" style={{ width: rectStyle.width, height: `${mainHeight}px` }}>
          <div className="post-meta">
            <div className="post-index">
              { index }
            </div>
            <div className="post-date">
              { date }
            </div>
            <div className="post-tag">
              { tagName }
            </div>
          </div>
          <Link to={url} className="background-container" style={rectStyle}>
            <div
              className="background-inner"
              style={feature_image && { backgroundImage: `url(${feature_image})` } || {}}
            />
          </Link>
        </div>
        <div className="intro" style={{ width: rectStyle.width }}>
          <h2 className="post-title">{title}</h2>
          <div className="post-desc">
            { desc }
          </div>
        </div>
      </div>
    );
  }
}
