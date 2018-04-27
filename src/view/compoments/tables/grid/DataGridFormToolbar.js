/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// module dependencies
import React from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import SaveIcon from 'material-ui-icons/Save';
import {withStyles} from "material-ui/styles/index";

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.A700,
        backgroundColor: theme.palette.secondary.A100,
      }
      : {
        color: theme.palette.secondary.A100,
        backgroundColor: theme.palette.secondary.A700,
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

    onAction: PropTypes.func.isRequired,

  };

  static defaultProps = {
    title: 'Record',
  };

  render() {
    const { numSelected, classes, title, onAction } = this.props;

    return(
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography type="subheading">{numSelected} selected</Typography>
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
                  onClick={onAction('Save')}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="Delete"
                  onClick={onAction('Delete')}
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
                  onClick={onAction('Create')}
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

export default withStyles(toolbarStyles)(DataGridFormToolbar);
