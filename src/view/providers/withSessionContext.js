/**
 * Description: withSessionContext higher order components
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import Session from './context/Session'

/**
 * Higher order component to provide Store context to components
 * @param Component
 * @returns {function(*): *}
 */
export default function withSessionContext(Component) {
  return function WithSessionContext(props) {
    return <Session.Consumer>{value => <Component {...props} context={value} />}</Session.Consumer>
  }
}

/**
 * Higher order component to provide Store context isAuth property to components
 * @param Component
 * @returns {function(*): *}
 */
export function withSessionState(Component) {
  return function WithSessionState(props) {
    return (
      <Session.Consumer>
        {value => <Component {...props} context={{ isAuth: value.isAuth }} />}
      </Session.Consumer>
    )
  }
}
