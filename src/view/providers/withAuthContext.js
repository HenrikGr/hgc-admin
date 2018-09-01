/**
 * Description: withAuthContext HOC
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import React from 'react';
import AuthContext from './AuthContext';

/**
 * Higher order component to provide AuthContext to components
 * @param Component
 * @returns {function(*): *}
 */
export default function withAuthContext(Component) {
  return function WithAuthContext(props) {
    return (
      <AuthContext.Consumer>
        { value => <Component {...props} context={value} />}
      </AuthContext.Consumer>
    );
  };
}

/**
 * Higher order function to provide isAuth from AuthContext
 * @param Component
 * @returns {function(*): *}
 */
export function withAuthContextIsAuth(Component) {
  return function WithAuthContextIsAuth(props) {
    return (
      <AuthContext.Consumer>
        { ({ isAuth }) => <Component {...props} context={{isAuth}} />}
      </AuthContext.Consumer>
    );
  };
}


/**
 * Higher order component to provide the duration from AuthProvider context
 * @param Component
 * @returns {function(*): *}
 */
export function withAuthContextDuration(Component) {
  return function WithAuthContextDuration(props) {
    return (
      <AuthContext.Consumer>
        { ({ duration }) => <Component {...props} context={{duration}} />}
      </AuthContext.Consumer>
    );
  };
}

/**
 * Higher order function to provide for opening RefreshSessionDialog
 * @param Component
 * @returns {function(*): *}
 */
export function withAuthContextDialog(Component) {
  return function WithAuthContextDuration(props) {
    return (
      <AuthContext.Consumer>
        {({ openSessionDlg, refreshSession, removeSession }) => {
          return <Component
            {...props}
            context={{openSessionDlg, refreshSession, removeSession}}
          />
        }}
      </AuthContext.Consumer>
    );
  };
}
