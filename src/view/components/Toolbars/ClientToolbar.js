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
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

// Custom components
import ClientToolbarTitle from './ClientToolbarTitle';
import ClientToolbarTabs from './ClientToolbarTabs';
import ClientToolbarActions from './ClientToolbarActions';


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: theme.spacing.unit,
    backgroundColor: theme.palette.background.paper,
  },
});

/**
 * ClientToolbar
 * @param classes
 * @param title
 * @param items
 * @param selectedId
 * @param onSelect
 * @returns {*}
 * @constructor
 */
const ClientToolbar = ({ classes, title, items, selectedId, onSelect }) => (
  <Toolbar className={ classes.root }>
    <ClientToolbarTitle title={ title }/>
    <ClientToolbarTabs items={ items } selectedId={ selectedId } onSelect={ onSelect } />
    <ClientToolbarActions/>
  </Toolbar>
);

/**
 * Props API
 */
ClientToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(ClientToolbar);