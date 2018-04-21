/**
 * Description: Module exporting a withRoot function to set material ui theme provider,
 * css baseline and a palette used within tha application
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React
import React from 'react';

// material-ui theme provider and css baseline
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

// Colors to use
import indigo from 'material-ui/colors/indigo';
import pink from 'material-ui/colors/pink';
//import teal from 'material-ui/colors/teal';
//import deepOrange from 'material-ui/colors/deepOrange';

// A theme with custom primary and secondary color.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
    secondary: {
      light: pink[300],
      main: pink[500],
      dark: pink[700],
    },
  },
});

/**
 * MuiThemeProvider makes the theme available down the
 * React tree thanks to React context.
 * @param Component
 * @returns {function(*): *}
 */
function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kick start an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return WithRoot;
}

export default withRoot;
