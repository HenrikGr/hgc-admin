/**
 * Description
 *
 * Module that export a context for the application.
 * The context exported includes;
 *
 * - jss instance,
 * - theme instance created by createMuiTheme function
 * - sheetsManager,
 * - sheetRegistry instance.
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
import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { createMuiTheme } from 'material-ui/styles';
import { teal, pink } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

// Create the theme
const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
  },
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

// Make sheetsManager available
export const sheetsManager = new Map();

// function that returns jss, theme, style sheets manager and registry
export default function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}