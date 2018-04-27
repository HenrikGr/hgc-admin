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
import PropTypes from "prop-types";
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import FilterListIcon from 'material-ui-icons/FilterList';
import {withStyles} from "material-ui/styles/index";
import Menu from 'material-ui/Menu';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';


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
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  listItem: {
    //width: '100%',
    //maxWidth: 360,
    //backgroundColor: theme.palette.background.paper,
  }
});

/**
 * DataGridToolbar
 * TODO: Add filter columns feature
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
    model: PropTypes.array,

    /**
     * TODO: Add feature to select visible columns
     */
    onChangedColumns: PropTypes.func,
  };

  /**
   * Default props
   */
  static defaultProps = {
    title: 'Records'
  };

  state = {
    anchorEl: null,
    model: [],
    checked: [],
    defaultChecked: [],
  };

  /**
   * Handle model array passed in to the component
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.model && (nextProps.model !== prevState.model)) {
      const visibleColumns = nextProps.model.filter(entry => entry.visible === true);
      const checked = [];
      visibleColumns.forEach(entry => {
        checked.push(entry.id)
      });

      return {
        model: nextProps.model,
        checked: checked,
        defaultChecked: checked
      };
    }

    return null;
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  isCheckedEqual = (defaultChecked, checked) => {
    return defaultChecked.length === checked.length && defaultChecked.every((v, i) => checked.includes(v));
  };

  handleClose = () => {
    const { checked, defaultChecked } = this.state;
    if (this.props.onChangedColumns && !this.isCheckedEqual(defaultChecked, checked)) {
      this.props.onChangedColumns(checked)
    }

    this.setState({ anchorEl: null });
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked });
  };

  render() {
    const { classes, title } = this.props;
    const { anchorEl, model } = this.state;


    return(
      <Toolbar className={classes.root}>
        <div className={classes.title}>
          <Typography type="title">{title}</Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
            <IconButton
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              aria-label="Filter list"
              onClick={this.handleClick}
            >
              <Tooltip title="Filter list">
                <FilterListIcon />
              </Tooltip>
            </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {model.map((entry, index) => (
                <ListItem
                  key={index}
                  role={undefined}
                  dense
                  button
                  onClick={this.handleToggle(entry.id)}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={this.state.checked.indexOf(entry.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={entry.label} />
                </ListItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    )
  }
}

export default withStyles(toolbarStyles)(DataGridToolbar);
