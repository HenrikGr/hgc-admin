/**
 * Description
 *
 * The LoginForm component is a controlled component rendering 2 fields to
 * provide authentication service.
 *
 * The local state consists of
 * - redirectToReferer, a boolean flag indicating authentication success and redirection.
 * - username, a string variable keeping track of user input
 * - password, a string variable keeping track of user input
 * - showPassword, a boolean flag to toggle is password input should be visible
 * - errors, an object holding validation or authentication error messages
 * - message, a string holding general information
 *
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 *
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

/**
 * Module dependencies
 */
import React from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button'
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import API from '../../modules/api'
import { isEmpty } from '../../modules/utils/helper'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent:'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop:'80px',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '552px',
    },
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


/**
 * GetClientForm component
 */
class GetClientForm extends React.Component {

  /**
   * Default props
   */
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  /**
   * Initial state
   */
  state = {
    name: '',
    data: {},
    error: {},
    message: 'Get client',
  };

  /**
   * Ensure the component is controlled by storing user input in local state
   * @param prop
   * @returns {function(*)}
   */
  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
      error: {}
    });
  };

  /**
   * Submit form event handler
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();

    API.getClientByName(this.state.name).then((json) => {
      this.props.setClient(json.data);
      this.setState({ data: json.data});
    }).catch((error) => {
      this.setState({error});
    });

  };

  render() {
    const { classes } = this.props;
    const isError = !isEmpty(this.state.error);
    const nameMessage = isError ? this.state.error.name : '';
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
    if (this.state.redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    return (
      <div className={ classes.root }>
        <form className={ classes.form } onSubmit={ this.handleSubmit }>
          <FormControl
            className={ classes.formControl }
            error={ isError }
          >
            <InputLabel htmlFor="name">Client name</InputLabel>
            <Input
              id="name"
              inputRef={ (node) => { this.name = node} }
              value={ this.state.name }
              onChange={ this.handleChange('name') }
            />
            <FormHelperText>{ nameMessage }</FormHelperText>
          </FormControl>
          <Button type="submit" raised color="primary" className={ classes.button }>
            Get client data
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(GetClientForm);