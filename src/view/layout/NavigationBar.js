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

// Material ui
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";

// custom components
import Header from "../components/header/Header";
import MenuList from "../components/lists/MenuList";

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    width: "240px"
  },
  toolbar: theme.mixins.toolbar
});

/**
 * NavigationBar
 * @param classes
 * @param session
 * @param removeSession
 * @param refreshSession
 * @returns {*}
 * @constructor
 */
function NavigationBar({ classes, session, removeSession, refreshSession }) {
  const { expires_in } = session;
  const expiresIn = expires_in ? expires_in : 0;

  return(
    <React.Fragment>
      <Header
        isAuth={expiresIn > 0}
        duration={expiresIn}
        refreshSession={refreshSession}
        removeSession={removeSession}
      />
      { expiresIn > 0 && (
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <MenuList />
        </Drawer>
      )}
    </React.Fragment>
  )
}

export default withStyles(styles)(NavigationBar);