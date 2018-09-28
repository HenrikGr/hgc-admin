/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import PropTypes from "prop-types";

// material-ui
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from "@material-ui/core/styles";

// custom components
import DataGridFormToolbar from './DataGridFormToolbar';

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: 'column',
  },
  form: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    marginTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    width: "100%",
  },
  fieldContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: theme.spacing.unit * 3,
  },
});

/**
 * DataGridForm component
 */
class DataGridForm extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Classes property to customize the style
     */
    classes: PropTypes.object.isRequired,
    /**
     * Form label
     */
    title: PropTypes.string.isRequired,
    /**
     * Model data for columns in the table and the form
     */
    model: PropTypes.array.isRequired,
    /**
     * Data objects matching the model data for the columns
     */
    selectedData: PropTypes.object.isRequired,
    /**
     * Array of selected row ids
     */
    selectedIds: PropTypes.array,
    /**
     * Callback for input changes
     */
    onChange: PropTypes.func.isRequired,
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
  };

  static defaultProps = {
    title: "Record",
  };

  handleToggle = prop => event => {
    this.props.onChange(prop, event.target.checked)
  };

  handleChange = prop => event => {
    this.props.onChange(prop, event.target.value);
  };

  handleCreate = event => {
    event.preventDefault();
    this.props.onCreate();
  };

  handleUpdate = event => {
    event.preventDefault();
    this.props.onUpdate();
  };

  handleDelete = event => {
    event.preventDefault();
    this.props.onDelete();
  };

  /**
   * Helper function to render a Checkbox component
   * @param entry
   * @returns {*}
   */
  renderCheckBox = entry => {
    const { selectedData } = this.props;

    return(
      <FormControlLabel
        key={ entry.id }
        control={
          <Checkbox
            checked={ selectedData[entry.id] }
            onChange={ this.handleToggle(entry.id) }
          />
        }
        label={ entry.label }
      />
    )
  };

  /**
   *
   * @param entry
   * @returns {*}
   */
  renderPasswordField = entry => {
    const { selectedData } = this.props;

    return(
      <TextField
        fullWidth={ true }
        key={ entry.id }
        id={ entry.id }
        label={ entry.label }
        type="password"
        value={ selectedData[entry.id] }
        onChange={ this.handleChange(entry.id) }
        margin="dense"
      />
    )
  };

  /**
   * Helper function to render TextField component
   * @param entry
   * @returns {*}
   */
  renderTextField = entry => {
    const { selectedIds, selectedData } = this.props;
    const disabled = entry.unique && selectedIds.length > 1;

    return(
      <TextField
        fullWidth={ true }
        key={ entry.id }
        id={ entry.id }
        label={ entry.label }
        disabled={ disabled }
        type="text"
        value={ !disabled ? selectedData[entry.id] : '' }
        onChange={ this.handleChange(entry.id) }
        margin="dense"
      />
    )
  };

  /**
   * Render form fields
   * @param model
   * @returns {Array}
   */
  renderFields = model => {
    let fields = [];

    model.forEach((entry => {
      if (entry.visible) {
        switch (entry.type) {
          case 'checkbox':
            fields.push(this.renderCheckBox(entry));
            break;

          case 'password':
            fields.push(this.renderPasswordField(entry));
            break;

          // text is default
          default:
            fields.push(this.renderTextField(entry));
            break;
        }
      }
    }));

    return fields;
  };

  render() {
    const { classes, title, selectedIds, model } = this.props;

    return (
      <div className={ classes.root }>
        <DataGridFormToolbar
          title={ title }
          numSelected={ selectedIds.length }
          onCreate={ this.handleCreate }
          onDelete={ this.handleDelete }
          onUpdate={ this.handleUpdate }
        />
        <form className={ classes.form }>
          <div className={ classes.fieldContainer }>
            { this.renderFields(model) }
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(DataGridForm);
