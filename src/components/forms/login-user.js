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
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormLabel, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
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
 * LoginUserForm component
 */
class LoginUserForm extends React.Component {

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
    redirectToReferrer: false,
    username: '',
    password: '',
    showPassword: false,
    error: {},
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
   * Toggle if password characters is displayed
   */
  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  /**
   * Submit form event handler
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();

    API.authenticate(this.state.username, this.state.password).then((json) => {
      this.props.setUser(Object.assign({}, json.data, {isAuth: true}));
      this.setState({ redirectToReferrer: true })
    }).catch((error) => {
      this.setState({error});
    });

  };

  render() {
    const { classes } = this.props;
    const isError = !isEmpty(this.state.error);
    const emailMessage = isError && this.state.error.username ? this.state.error.username : '';
    const passwordMessage = isError && this.state.error.password ? this.state.error.password : '';
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
    if (this.state.redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    return (
      <div className={ classes.root }>
        <form className={ classes.form } onSubmit={ this.handleSubmit }>
          <FormLabel
            component="legend"
            error={ isError }
          >
            Authenticate
          </FormLabel>
          <FormControl
            className={ classes.formControl }
            error={ isError }
          >
            <InputLabel htmlFor="username">E-mail address</InputLabel>
            <Input
              id="username"
              inputRef={ (node) => { this.username = node} }
              value={ this.state.username }
              onChange={ this.handleChange('username') }
            />
            <FormHelperText>{ emailMessage }</FormHelperText>
          </FormControl>
          <FormControl
            className={ classes.formControl }
            error={ isError }
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              inputRef={ (node) => { this.password = node} }
              type={ this.state.showPassword ? 'text' : 'password' }
              value={ this.state.password }
              onChange={ this.handleChange('password') }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={ this.handleShowPassword }
                  >
                    { this.state.showPassword ? <VisibilityOff /> : <Visibility /> }
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{ passwordMessage }</FormHelperText>
          </FormControl>
          <Button type="submit" raised color="primary" className={ classes.button }>
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(LoginUserForm);