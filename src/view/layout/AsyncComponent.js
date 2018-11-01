/**
 * @prettier
 * @description: Async component to load pages asynchronous
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React, { Component } from 'react'

/**
 * AsyncComponent
 * @param importComponent
 * @returns {AsyncComponent}
 */
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
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
