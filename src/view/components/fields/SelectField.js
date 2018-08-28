/**
 * Description: SelectField component
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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
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
 * SelectField component
 * @param {object} classes
 * @param {string} id
 * @param {string} value
 * @param {array} options
 * @param {string} label
 * @param {function} onChange
 * @returns {*}
 * @constructor
 */
function SelectField({ classes, id, value, options, label, onChange }) {

  return(
    <FormControl key={ id } className={ classes.formControl }>
      <InputLabel htmlFor={ id }>{ label }</InputLabel>
      <Select
        multiple
        value={ value }
        onChange={ onChange(id) }
        input={<Input id={ id } />}
        renderValue={ selected => (
          <div className={ classes.chips }>
            {selected.map(value => <Chip key={ value } label={ value } className={ classes.chip } />)}
          </div>
        )}
        MenuProps={ MenuProps }
      >
        { options.map(name => (
          <MenuItem key={ name } value={ name }>
            <Checkbox checked={ value.indexOf(name) > -1 } />
            <ListItemText primary={ name } />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

SelectField.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(SelectField);
