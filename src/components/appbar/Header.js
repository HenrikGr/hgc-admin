/**
 * Description
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import PropTypes from "prop-types";

// material-ui components
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

// custom components
import Session from "../session/Session";

// helpers
import { isEmpty } from "../../modules/utils/helper";
import {Link} from "react-router-dom";

const styles = {
  root: {
    width: "100%"
  },
  flex: {
    flex: 1
  },
  button: {
    marginLeft: -12,
    marginRight: 20,
  },
  marginRight: {
    marginRight: "24px"
  }
};

/**
 * Header component
 * @param title
 * @param classes
 * @param session
 * @returns {*}
 * @constructor
 */
function Header({ title, classes, session }) {
  const isAuth = !isEmpty(session);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={ Link }
            to={ isAuth ? '/dashboard' : '/'}
            className={ classes.button }
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            {title}
          </Typography>
          <Session />
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
  session: PropTypes.object.isRequired
};

/**
 * Default props
 * @type {{title: string}}
 */
Header.defaultProps = {
  title: "HGC AB - " + process.env.NODE_ENV,
  session: {}
};

// Inject classes to the component
export default withStyles(styles)(Header);
