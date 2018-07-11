/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Typography from '@material-ui/core/Typography';

/**
 * ClientToolbarTitle
 * @param classes
 * @returns {*}
 * @constructor
 */
function ClientToolbarTitle({ title }) {
  return(<Typography type="title">{ title }</Typography>)
}

/**
 * Props API
 */
ClientToolbarTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

/**
 * Default props
 */
ClientToolbarTitle.defaultProps = {
  title: 'Client'
};

export default ClientToolbarTitle;