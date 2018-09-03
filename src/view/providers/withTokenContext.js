/**
 * Description: withTokenContext higher order components
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import React from 'react';
import Token from './context/Token';

/**
 * Higher order component to provide User to components
 * @param Component
 * @returns {function(*): *}
 */
export default function withTokenContext(Component) {
  return function WithTokenContext(props) {
    return (
      <Token.Consumer>
        { value => <Component
          {...props}
          context={ value }
        />}
      </Token.Consumer>
    );
  };
}
