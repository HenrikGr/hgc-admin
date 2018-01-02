/**
 * Description
 *
 * The Header component renders the application header that will contain
 * - home button that will route to either / or /dashboard
 * - menu button or login button depending on if user is authenticated or not.
 *
 * The login button will route the user to the login page.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 *
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

// React
import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

// custom components
import HomeButton from './home-button'
import MenuButton from './menu-button'
import LoginButton from './login-button'

// Component styles
const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  marginRight: {
    marginRight: '24px'
  }
};

/**
 * Header component
 * @param title
 * @param classes
 * @param userId
 * @returns {*}
 * @constructor
 */
function Header({ title, classes, userId }) {
  const isAuthenticated = userId !== '';

  return(
    <div className={ classes.root }>
      <AppBar position="static">
        <Toolbar>
          <HomeButton
            isAuthenticated={ isAuthenticated }
          />
          <Typography type="title" color="inherit" className={ classes.flex }>
            {title}
          </Typography>
          { isAuthenticated ? ( <MenuButton/> ) : ( <LoginButton/> )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

/**
 * Component props API
 * @type {{classes}}
 */
Header.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  userId: PropTypes.string,
};

/**
 * Default props
 * @type {{title: string}}
 */
Header.defaultProps = {
  title: 'HGC AB - ' + process.env.NODE_ENV,
};


/**
 * Export component
 */
export default withStyles(styles)(Header);