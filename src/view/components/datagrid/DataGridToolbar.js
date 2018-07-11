/**
 * Description: DataGridToolbar component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react';
import PropTypes from "prop-types";

// material-ui
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from "@material-ui/core/styles";

// custom components
import DataGridToolbarTitle from './DataGridToolbarTitle';
import DataGridFilterColumns from './DataGridFilterColumns';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
});

/**
 * DataGridToolbar
 */
class DataGridToolbar extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Classes property to customize the style
     */
    classes: PropTypes.object.isRequired,
    /**
     * Title to be displayed
     */
    title: PropTypes.string.isRequired,
    /**
     * Current column model
     */
    model: PropTypes.array.isRequired,
    /**
     *  Callback to change visible columns
     */
    onChangedColumns: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: 'Records',
  };


  render() {
    const { classes, title, model, onChangedColumns } = this.props;

    return (
      <Toolbar className={ classes.root }>
        <DataGridToolbarTitle title={ title }/>
        <div className={ classes.spacer }/>
        <DataGridFilterColumns
          model={ model }
          onChangedColumns={ onChangedColumns }
        />
      </Toolbar>
    )
  }
}

export default withStyles(toolbarStyles)(DataGridToolbar);
