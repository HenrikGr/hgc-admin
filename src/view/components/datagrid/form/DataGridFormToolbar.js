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
import PropTypes from "prop-types";
import classNames from 'classnames';

// material-ui
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight: {
    backgroundColor: theme.palette.secondary.lighter,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actionsWrapper: {
    display: 'flex',
  },
  actions: {
    display: 'inline-flex',
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

/**
 * DataGridFormToolbar
 */
class DataGridFormToolbar extends React.Component {
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
     * Number of selected rows
     */
    numSelected: PropTypes.number.isRequired,
    /**
     * Callback function
     */
    onCreate: PropTypes.func.isRequired,
    /**
     * Callback function
     */
    onDelete: PropTypes.func.isRequired,
    /**
     * Callback function
     */
    onUpdate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: 'Record',
  };

  render() {
    const {
      classes,
      title,
      numSelected,
      onCreate,
      onDelete,
      onUpdate
    } = this.props;

    return(
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography type="subheading">{numSelected} {title} selected</Typography>
          ) : (
            <Typography type="title">{title}</Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actionsWrapper}>
          {numSelected > 0 ? (
            <div className={classes.actions}>
              <Tooltip title="Save">
                <IconButton
                  aria-label="Save record"
                  onClick={onUpdate}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="Delete"
                  onClick={onDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
            ) : (
            <div className={classes.actions}>
              <Tooltip title="Create">
                <IconButton
                  aria-label="Create record"
                  onClick={onCreate}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      </Toolbar>
    )
  }
}

export default withStyles(styles)(DataGridFormToolbar);
