/* !
 * Icon
 *
 * @author
 * @copyright
 */

import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
  const { iconName, className } = props;
  const icon = `${window.assetsBasePath}/clientlibs/redesign/img/base.svg#${iconName}`;

  return (
    <svg data-testid="svg" className={`${className} ric-icon`}>
      <use data-testid="use" xlinkHref={icon} />
    </svg>
  );
};

Icon.propTypes = {
  iconName: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  iconName: 'news-tag',
  className: '',
};

export default Icon;
