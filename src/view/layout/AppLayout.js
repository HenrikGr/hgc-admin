/**
 * Description: ApplicationLayout
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & React Router
import React from "react";
import { connect } from "react-redux";

// Material ui
import { withStyles } from "@material-ui/core/styles";

// custom components
import NavigationBar from './NavigationBar';
import Main from './Main';

// Session store actions
import sessionActions from "../../store/actions/SessionAction";

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
};

/**
 * Application layout component
 * @param classes
 * @param session
 * @param removeSession
 * @param refreshSession
 * @returns {*}
 * @constructor
 */
function AppLayout({ classes, session, removeSession, refreshSession, ...props }) {
  return(
    <div className={classes.root}>
      <NavigationBar
        session={ session }
        removeSession={ removeSession }
        refreshSession={ refreshSession }
      />
      <Main/>
    </div>
  )
}

// Map session state to props
const mapStateToProps = state => {
  return {
    session: state.session,
  };
};

// Map session action creators as props
const mapDispatchToProps = dispatch => {
  return {
    removeSession: () => {
      dispatch(sessionActions.removeSession());
    },
    refreshSession: () => {
      dispatch(sessionActions.refreshSession());
    }
  };
};

// Connect Root with redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppLayout));