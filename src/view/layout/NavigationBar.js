/**
 * Description: NavigationBar
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & React Router
import React from "react";
import PropTypes from "prop-types";

// Material ui
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";

// custom components
import Header from "../components/header/Header";
import MenuList from "../components/lists/MenuList";

// component styles
const styles = theme => ({
  drawerPaper: {
    position: "relative",
    width: "240px"
  },
  toolbar: theme.mixins.toolbar
});

/**
 * NavigationBar
 * @param {object} classes - style object used by material-ui withStyle HOC
 * @param {object} token - token if user is authenticated
 * @param {function} removeSession - function to remove session with token
 * @param {function} refreshSession - used to refresh token when expired
 * @returns {*}
 * @constructor
 */
function NavigationBar({ classes, token, removeSession, refreshSession }) {
  const { expires_in } = token;
  const expiresIn = expires_in ? expires_in : 0; // no token = 0

  return(
    <React.Fragment>
      <Header
        isAuth={ expiresIn > 0 }
        duration={ expiresIn }
        refreshSession={ refreshSession }
        removeSession={ removeSession }
      />
      { expiresIn > 0 && (
        <Drawer
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={ classes.toolbar } />
          <MenuList />
        </Drawer>
      )}
    </React.Fragment>
  )
}

/**
 * Props API
 * @type {{classes: *, token: *, removeSession: *, refreshSession: *}}
 */
NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  removeSession: PropTypes.func.isRequired,
  refreshSession: PropTypes.func.isRequired,
};

// Inject styles
export default withStyles(styles)(NavigationBar);