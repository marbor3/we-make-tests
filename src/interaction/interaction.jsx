/*!
 * interaction
 *
 * @author Marcin Borowski
 * @copyright
 */

import React from 'react';
import PropTypes from 'prop-types';
import { commentsUrl } from './interactionInit';
import Icon from '../icon/icon';

const getLikeClass = liked => `interaction__likes${liked ? ' interaction__likes--active' : ''}`;

const Interaction = ({
  numberOfComments, numberOfLikes, liked, toggleLike, path,
}) => (
  <div className="interaction">
    <a href={commentsUrl(path)} data-testid="comments" className="interaction__comments">
      {numberOfComments}
      <Icon iconName="news-comments" />
    </a>
    <button type="button" data-testid="likes" onClick={toggleLike} className={getLikeClass(liked)}>
      {numberOfLikes}
      <span className="interaction__like-icon">
        <Icon iconName="news-like" />
      </span>
    </button>
  </div>
);

Interaction.propTypes = {
  path: PropTypes.string.isRequired,
  toggleLike: PropTypes.func.isRequired,
  numberOfComments: PropTypes.number,
  numberOfLikes: PropTypes.number,
  liked: PropTypes.bool,
};

Interaction.defaultProps = {
  numberOfComments: 0,
  numberOfLikes: 0,
  liked: false,
};

export default Interaction;
