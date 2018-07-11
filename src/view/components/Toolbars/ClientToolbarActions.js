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

// material-ui
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

/**
 * ClientToolbarActions
 * @returns {*}
 * @constructor
 */
const ClientToolbarActions = () => (
    <Tooltip title="Filter list">
      <IconButton aria-label="Filter list">
        <FilterListIcon />
      </IconButton>
    </Tooltip>
);

export default ClientToolbarActions;