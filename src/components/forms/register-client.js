/**
 * Description
 *
 * The LoginForm component is a controlled component rendering 2 fields to
 * provide authentication service.
 *
 * The local state consists of
 * - redirectToReferer, a boolean flag indicating if redirection should be done
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
import { FormControl, FormLabel } from 'material-ui/Form';
import { isEmpty } from '../../modules/utils/helper'
import API from "../../modules/api";

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
 * RegisterClient component
 * url -X POST -H "Content-Type: application/json" -d '{ "user": "58c034da09d909d85c515537", "name": "admin", "redirectUris": ["http://localhost:8000/oauth/callback"] }' "http://localhost:8000/clients"
 */
class RegisterClient extends React.Component {

  /**
   * Default props
   */
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  /**
   * Initial state
   */
  state = {
    redirectToReferrer: false,
    name: '',
    errors: {},
    message: 'Register client',
  };

  /**
   * Ensure the component is controlled by storing user input in local state
   * @param prop
   * @returns {function(*)}
   */
  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
      errors: {},
      message: 'Register Client'
    });
  };

  /**
   * Submit form event handler
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();

    API.createClient('/api/clients', this.state.name, this.props.user.userId ).then((json) => {

      // Set redirectFlag to true, will be used in next render
      // to decide where to go.
      this.setState({ redirectToReferrer: true })

    }).catch((errors) => {
      this.setState(errors);
    });

  };

  render() {
    const { classes, user } = this.props;
    const isError = !isEmpty(this.state.errors);
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
    if (this.state.redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    console.log(this.props.user._id);
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
            <InputLabel htmlFor="name">Client name</InputLabel>
            <Input
              id="name"
              inputRef={ (node) => { this.name = node} }
              value={ this.state.name }
              onChange={ this.handleChange('name') }
            />
          </FormControl>
          { user.isAuth && (
            <Button type="submit" raised color="primary" className={ classes.button }>
              Register client
            </Button>
          )}
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterClient);