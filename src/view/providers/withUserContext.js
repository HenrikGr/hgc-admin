/**
 * Description: withUserContext higher order components
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import User from './context/User'

/**
 * Higher order component to provide User context to components
 * @param Component
 * @returns {function(*): *}
 */
export default function withUserContext(Component) {
  return function WithUserContext(props) {
    return <User.Consumer>{value => <Component {...props} context={value} />}</User.Consumer>
  }
}

/**
 * Higher order component to provide User context isAuth property to components
 * @param Component
 * @returns {function(*): *}
 */
export function withUserState(Component) {
  return function WithUserState(props) {
    return (
      <User.Consumer>
        {value => <Component {...props} context={{ isAuth: value.isAuth }} />}
      </User.Consumer>
    )
  }
}
