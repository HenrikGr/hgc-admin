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
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormLabel, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import validator from '../../modules/utils/validator'
import { logIn } from '../../modules/api/auth'
import { isEmpty } from '../../modules/utils/helper'

/*
xs, extra-small: 0dp or larger
sm, small: 600dp or larger
md, medium: 960dp or larger
lg, large: 1280dp or larger
xl, xlarge: 1920dp or larger
 */

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
 * LoginForm component
 */
class LoginForm extends React.Component {

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
    errors: {},
    message: 'Authenticate',
  };

  /**
   * Ensure the component is controlled by storing user input in local state
   * @param prop
   * @returns {function(*)}
   */
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
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

    // Client side validation
    validator.validate({ username: this.state.username, password: this.state.password }).then((data) => {

      // Authenticate
      logIn('/auth/login', data.username, data.password).then((data) => {

        // Store user information in global state (Redux)
        this.props.storeUser(data);

        // Set redirectFlag to true, will be used in next render
        this.setState({redirectToReferrer: true})

      }).catch((error) => {
        this.setState(error);         // Authentication error
      });

    }).catch((error) => {
      this.setState(error);             // Validation errors
    });
  };

  render() {
    const { classes } = this.props;
    const isError = !isEmpty(this.state.errors);
    const emailMessage = isError && this.state.errors.username ? this.state.errors.username : '';
    const passwordMessage = isError && this.state.errors.password ? this.state.errors.password : '';

    // The local state redirectToReferer is set after authentication success
    // We will redirect if authenticated and we will redirect to either the
    // location.state or to the dashboard
    // The location state is set by the PrivateRouter component if we are trying to access
    // a route that requires authentication.
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
            { this.state.message }
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
          <Button type="submit" raised color="accent" className={ classes.button }>
            Login
          </Button>
          <Button
            component={Link}
            to='/signup'
            color="accent"
            className={ classes.button }
          >
            Sign up
          </Button>

        </form>
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);