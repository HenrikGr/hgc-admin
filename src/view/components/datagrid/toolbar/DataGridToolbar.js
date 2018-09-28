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
import classNames from "classnames";

// material-ui
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from "@material-ui/core/styles";

// custom components
import DataGridToolbarTitle from './DataGridToolbarTitle'
import DataGridToolbarActions from './DataGridToolbarActions';
import DataGridFilterColumns from '../DataGridFilterColumns';

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 8,
    backgroundColor: theme.palette.background.paper,
  },
  highlight: {
    backgroundColor: theme.palette.secondary.lighter,
  },
  spacer: {
    flex: '1 1 100%',
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

    numSelected: PropTypes.number.isRequired,
    /**
     * Title to be displayed
     */
    title: PropTypes.string.isRequired,
    /**
     * Current column model
     */
    model: PropTypes.array.isRequired,
    /**
     * Callback fro create API
     */
    onCreate: PropTypes.func.isRequired,
    /**
     * Callback for updateById API
     */
    onUpdate: PropTypes.func.isRequired,
    /**
     * Callback for deleteById
     */
    onDelete: PropTypes.func.isRequired,
    /**
     *  Callback to change visible columns
     */
    onChangedColumns: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: 'Records',
  };


  render() {
    const {
      classes,
      numSelected,
      title,
      model,
      onCreate,
      onUpdate,
      onDelete,
      onChangedColumns
    } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <DataGridToolbarTitle
          numSelected={ numSelected }
          title={ title }
        />

        <div className={ classes.spacer }/>

        <DataGridToolbarActions
          numSelected={ numSelected }
          onUpdate={ onUpdate }
          onDelete={ onDelete }
          onCreate={ onCreate }
        />

        <DataGridFilterColumns
          model={ model }
          onChangedColumns={ onChangedColumns }
        />

      </Toolbar>
    )
  }
}

export default withStyles(styles)(DataGridToolbar);
