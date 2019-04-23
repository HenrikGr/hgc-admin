/**
 * @prettier
 * @description: Higher Order Component to provide code splitting, i.e asynchronous loading of components.
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

/**
 * Higher order function to import other components
 * @param {Function} fn - function that imports another component
 * @returns {AsyncComponent} - returns the imported component provided
 */
export default function withAsyncImport(fn) {

  /**
   * Async component that importing a component on mounting
   * @type {React.PureComponent}
   */
  class AsyncComponent extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      const { default: component } = await fn()
      this.setState({
        component: component
      })
    }

    render() {
      const LoadedComponent = this.state.component
      return LoadedComponent ? <LoadedComponent {...this.props} /> : null
    }
  }

  return AsyncComponent
}
