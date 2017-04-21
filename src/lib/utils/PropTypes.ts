import * as PropTypes from 'prop-types';

export const managerShape = PropTypes.shape({
  onComponentsChange: PropTypes.func.isRequired,
  removeOnComponentsChange: PropTypes.func.isRequired,
});

export const busShape = PropTypes.shape({
  emit: PropTypes.func.isRequired,
  on: PropTypes.func.isRequired,
  off: PropTypes.func.isRequired
});