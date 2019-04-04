/*!
 * interaction
 *
 * @author Marcin Borowski
 * @copyright
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './interactionActions';
import { subset } from '../core/utils';
import { getInteraction } from './interactionReducer';
import Interaction from './interaction';

const mapStateToProps = (state, props) => getInteraction(state, props);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export class InteractionContainer extends React.Component {
  constructor(props) {
    super(props);

    // Add new Interaction state to store
    props.actions.add(props);
  }

  componentDidMount() {
    const {
      fetched, path, id, actions,
    } = this.props;

    // On mount if not fetched, fetch interaction details
    if (!fetched) {
      actions.fetch(path, id);
    }
  }

  get displayProps() {
    return {
      ...subset(['path', 'numberOfComments', 'numberOfLikes', 'liked'], this.props),
      toggleLike: this.toggleLike,
    };
  }

  toggleLike = (e) => {
    e.preventDefault();

    const {
      id, path, liked, actions,
    } = this.props;

    actions.toggleLike(path, id, !liked);
  }

  render() {
    return (
      <Interaction {...this.displayProps} />
    );
  }
}

InteractionContainer.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    add: PropTypes.func.isRequired,
    toggleLike: PropTypes.func.isRequired,
  }).isRequired,
  fetched: PropTypes.bool,
  numberOfComments: PropTypes.number,
  numberOfLikes: PropTypes.number,
  liked: PropTypes.bool,
};

InteractionContainer.defaultProps = {
  fetched: false,
  numberOfComments: 0,
  numberOfLikes: 0,
  liked: false,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InteractionContainer);
