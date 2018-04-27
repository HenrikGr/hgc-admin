/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Module dependencies
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import {isEmpty} from '../../../../utils/helper';

// custom components
import DataGridFormToolbar from './DataGridFormToolbar';


function normalizeData(model, data) {
  let newData = {};
  console.log('normalizing....', data);
  // Data not selected
  if (!data || isEmpty(data)) {
    model.forEach(entry => {
      switch (entry.type) {
        case 'checkbox':
          newData[entry.id] = false;
          break;
        case 'password':
          newData[entry.id] = '';
          break;
        default:
          // entry.type = 'text'
          newData[entry.id] = '';
          break;
      }
    });
  } else {
    // Data selected
    model.forEach(entry => {
      switch (entry.type) {
        case 'checkbox':
          newData[entry.id] = data[entry.id];
          break;
        case 'password':
          newData[entry.id] = '';
          break;
        default:
          // entry.type='text'
          newData[entry.id] = data[entry.id];
          break;
      }
    });
  }
  return newData;
}


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
    flexDirection: 'column',
    padding: theme.spacing.unit * 3,
  },
  textField: {
    minWidth: 440,
  },
});

/**
 * ProfileForm component
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
    formLabel: PropTypes.string.isRequired,
    /**
     * Model data for columns in the table and the form
     */
    model: PropTypes.array.isRequired,
    /**
     * Data objects matching the model data for the columns
     */
    formData: PropTypes.object.isRequired,
    /**
     * Array of selected row ids
     */
    selectedIds: PropTypes.array,

    create: PropTypes.func,
    updateById: PropTypes.func,
    deleteById: PropTypes.func,
    updateByIds: PropTypes.func,
  };

  static defaultProps = {
    formLabel: "Selected",
    isMultiSelect: false,
  };

  state = {
    formData: {},
    model: {},
  };

  /**
   *
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if ( nextProps.model !== prevState.model || nextProps.formData !== prevState.formData ) {
      return { model: nextProps.model, formData: normalizeData(nextProps.model, nextProps.formData) };
    }
    return null;
  }


  /**
   * Event handler for checkboxes
   * @param prop
   * @returns {Function}
   */
  handleToggle = prop => event => {
    const {formData} = this.state;
    formData[prop] = event.target.checked;
    this.setState({formData});
  };

  /**
   * Event handler for text fields
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    const {formData} = this.state;
    formData[prop] = event.target.value;
    this.setState({formData});
  };

  /**
   * Event handler for crud actions
   * @param property
   * @returns {Function}
   */
  handleAction = property => event => {
    const { formData } = this.state;
    const { selectedIds } = this.props;
    event.preventDefault();

    switch (property) {
      case 'Save':
        if (selectedIds.length > 1) {
          this.props.updateByIds(selectedIds, formData);
        } else {
          this.props.updateById(selectedIds[0], formData);
        }
        break;

      case 'Create':
        this.props.create(formData);
        break;

      case 'Delete':
        if (selectedIds.length === 1) {
          this.props.deleteById(selectedIds[0]);
        }
        break;

      default:
        break;
    }
  };

  /**
   * Helper function to render a Checkbox component
   * @param entry
   * @returns {*}
   */
  getCheckBox = (entry) => {
    const { formData } = this.state;
    return(
      <FormControlLabel
        key={entry.id}
        control={
          <Checkbox
            checked={formData[entry.id]}
            onChange={this.handleToggle(entry.id)}
          />
        }
        label={entry.label}
      />
    )
  };

  /**
   *
   * @param entry
   * @returns {*}
   */
  getPasswordField = entry => {
    const { formData } = this.state;
    const { selectedIds } = this.props;
    const disabled = selectedIds.length > 0;

    return(
      <TextField
        fullWidth={true}
        disabled={disabled}
        key={entry.id}
        id={entry.id}
        label={entry.label}
        type="password"
        value={formData[entry.id]}
        onChange={this.handleChange(entry.id)}
        margin="dense"
      />
    )
  };

  /**
   * Helper function to render TextField component
   * @param entry
   * @returns {*}
   */
  getTextField = entry => {
    const { formData } = this.state;
    const { selectedIds } = this.props;
    const disabled = entry.unique && selectedIds.length > 1;

    return(
      <TextField
        fullWidth={true}
        disabled={disabled}
        key={entry.id}
        id={entry.id}
        label={entry.label}
        type="text"
        value={!disabled ? formData[entry.id] : ''}
        onChange={this.handleChange(entry.id)}
        margin="dense"
      />
    )
  };

  renderFields = () => {
    const { model } = this.state;
    let fields = [];

    model.map((entry => {
      switch (entry.type) {
        case 'checkbox':
          fields.push(this.getCheckBox(entry));
          break;

        case 'password':
          fields.push(this.getPasswordField(entry));
          break;

        // text is default
        default:
          fields.push(this.getTextField(entry));
          break;
      }
      return null;
    }));

    return fields;
  };

  render() {
    const { classes, selectedIds } = this.props;
    const { model } = this.state;

    return (
      <div className={classes.root}>
        <DataGridFormToolbar
          numSelected={selectedIds.length}
          onAction={this.handleAction}
        />
        <form className={classes.form}>
          <div className={classes.fieldContainer}>
            {!isEmpty(model) ? this.renderFields() : null}
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(DataGridForm);
