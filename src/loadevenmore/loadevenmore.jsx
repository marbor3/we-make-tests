/* !
 * Loadmore
 *
 * @author
 * @copyright
 */

import React from 'react';
import PropTypes from 'prop-types';

const LoadMore = ({
  show, loadMore, fetching, title,
}) => {
  const buttonClasses = fetching
    ? 'button button--active'
    : 'button';

  if (!show) {
    return null;
  }

  return (
    <div className="loadmore">
      <button data-testid="button" disabled={fetching} type="button" className={buttonClasses} onClick={loadMore}>
        {title}
      </button>
    </div>
  );
};

LoadMore.propTypes = {
  show: PropTypes.bool,
  loadMore: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  title: PropTypes.string,
};

LoadMore.defaultProps = {
  show: false,
  fetching: false,
  title: 'Load More',
};

export default LoadMore;
