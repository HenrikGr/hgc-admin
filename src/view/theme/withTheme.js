/**
 * @prettier
 * @description: Higher order function to injects material-ui theme
 *
 * We are using the material-ui theme provider, css baseline and
 * creating a palette object to inject in the theme context
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import pink from '@material-ui/core/colors/pink'
import teal from '@material-ui/core/colors/teal'

/**
 * Create a theme palette to be injected in the material-ui theme context
 * @type {object} - custom palette
 */
const theme = createMuiTheme({
  /**
   * The material design specification changed concerning variant names and styles
   * display4 => h1
   * display3 => h2
   * display2 => h3
   * display1 => h4
   * headline => h5
   * title => h6
   * subheading => subtitle1
   * body2 => body1
   * body1 (default) => body2 (default)
   */
  typography: {
    useNextVariants: true,
  },
  palette: {
    //type: 'dark',
    primary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700]
    },
    secondary: {
      lighter: pink[200],
      light: pink[300],
      main: pink[500],
      dark: pink[700]
    }
  }
})

/**
 * MuiThemeProvider makes the theme available down the
 * React tree thanks to React context.
 * @param Component
 * @returns {function(*): *}
 */
function withTheme(Component) {
  function WithTheme(props) {
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kick start an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }
  return WithTheme
}

export default withTheme
