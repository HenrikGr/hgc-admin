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

// material-ui
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input"
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText"
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: "center",
    marginTop: "80px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: '680px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


/**
 * ClientForm component
 */
class ClientForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    formLabel: PropTypes.string.isRequired,
    schema: PropTypes.object.isRequired,
    defaultItem: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    selectedItem: PropTypes.object.isRequired,
    selectedId: PropTypes.string.isRequired,
    error: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    formLabel: "Label",
  };

  state = {};

  handleChange = id => event => {
    this.props.onChange(id, event.target.value);
    this.setState({ [id]: event.target.value});
  };


  renderSelectField = uiSchema => {
    const { classes } = this.props;

    return(
      <FormControl key={ uiSchema.id } className={ classes.formControl }>
        <InputLabel htmlFor={ uiSchema.id }>{ uiSchema.label }</InputLabel>
        <Select
          multiple
          value={ uiSchema.value }
          onChange={ this.handleChange(uiSchema.id) }
          input={<Input id={ uiSchema.id } />}
          renderValue={ selected => (
            <div className={ classes.chips }>
              {selected.map(value => <Chip key={ value } label={ value } className={ classes.chip } />)}
            </div>
          )}
          MenuProps={ MenuProps }
        >
          { uiSchema.choices.map(name => (
            <MenuItem key={ name } value={ name }>
              <Checkbox checked={ uiSchema.value.indexOf(name) > -1 } />
              <ListItemText primary={ name } />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  };

  renderTextField = uiSchema => {
    const { classes } = this.props;

    return(
      <TextField
        disabled={ uiSchema.readOnly }
        key={ uiSchema.id }
        className={ classes.formControl }
        fullWidth={ false }
        label={ uiSchema.label }
        type="text"
        value={ uiSchema.value }
        onChange={ this.handleChange(uiSchema.id) }
        margin="dense"
      />
    )

  };


  renderFields = () => {
    const { schema, defaultItem, selectedItem } = this.props;
    let fields = [];

    Object.keys(schema.properties).forEach(prop => {
      let uiSchema = {
        id: schema.properties[prop].$id.replace('/properties/', ''),
        readOnly: schema.properties[prop].readOnly,
        isRequired: schema.required.length > 0 ? schema.required.some(i => (i === prop)) : false,
        type: schema.properties[prop].type,
      };

      switch(schema.properties[prop].type) {
        case "array":
          uiSchema.label = schema.properties[prop].items.title;
          uiSchema.value = selectedItem[prop];
          uiSchema.choices = defaultItem[prop];
          fields.push(this.renderSelectField(uiSchema));
          break;

        case "boolean":
          break;

        // String is default
        default:
          uiSchema.label = schema.properties[prop].title;
          uiSchema.value = selectedItem[prop];
          fields.push(this.renderTextField(uiSchema));
          break;
      }
    });

    return fields;

  };

  render() {
    const { classes, formLabel, selectedId, isFetching } = this.props;
    const isError = false;
    const fields = this.renderFields();


    return (
      <div className={ classes.root }>

        <form className={ classes.form } onSubmit={ this.handleSubmit }>

          <FormLabel component="legend" error={ isError }>
            { formLabel }
          </FormLabel>

          { fields.map(field => (field)) }

          <div className={ classes.buttonContainer }>
            <Button
              className={ classes.button }
              variant="raised"
              color="secondary"
              onClick={ this.props.onReset }
            >
              Reset
            </Button>

            { selectedId === '' ? (
              <Button
                disabled={ isFetching }
                variant="raised"
                color="primary"
                className={ classes.button }
                onClick={ this.props.onCreate }
              >
                Save
              </Button>
              ) : (
              <React.Fragment>
                <Button
                  disabled={ isFetching }
                  variant="raised"
                  color="primary"
                  className={ classes.button }
                  onClick={ this.props.onRemove }
                >
                  Delete
                </Button>
                <Button
                  disabled={ isFetching }
                  variant="raised"
                  color="primary"
                  className={ classes.button }
                  onClick={ this.props.onUpdate }
                >
                  Save
                </Button>
              </React.Fragment>

            )}
          </div>
        </form>

      </div>
    );
  }
}

export default withStyles(styles)(ClientForm);
