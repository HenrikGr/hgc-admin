/**
 * Description: ApplicationLayout component
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
import { withStyles } from "@material-ui/core/styles";

// custom components
import NavigationBar from './NavigationBar';
import Main from './Main';

// Component styles
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: "56px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "64px"
    }
  }
});

/**
 * Application layout component
 * @param {object} classes - style object used by material-ui withStyle HOC
 * @returns {*}
 * @constructor
 */
function AppLayout({ classes }) {
  return(
    <div className={classes.root}>
      <NavigationBar/>
      <Main/>
    </div>
  )
}

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Inject state, actions and styles to component
export default withStyles(styles)(AppLayout);