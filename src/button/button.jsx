/* !
 * button
 *
 * @author
 * @copyright
 */

import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { title } = props;

  return (
    <button type="button" className="button">
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
};

Button.defaultProps = {
  title: 'Button',
};

export default Button;
