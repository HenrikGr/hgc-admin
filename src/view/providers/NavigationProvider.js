/**
 * @prettier
 * @description: NavigationProvider
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// Navigation context
import NavigationContext from './context/Navigation'

/**
 * NavigationProvider
 * @class NavigationProvider
 * @public
 */
class NavigationProvider extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   */
  static propTypes = {
    /**
     * Selected client id
     */
    selectedId: PropTypes.string.isRequired,
    /**
     * Selected entity
     */
    entity: PropTypes.object.isRequired,
    /**
     * Entity array
     */
    entities: PropTypes.array.isRequired,
    /**
     * onSelect callback
     */
    onSelect: PropTypes.func.isRequired
  }

  /**
   * Event handler to provide selected entity
   * @param event
   * @param value
   * @returns {Function}
   */
  handleSelect = (event, value) => {
    const { entities, onSelect } = this.props
    const selectedEntity = entities.filter(entity => entity._id === value)
    if (typeof onSelect === 'function') {
      onSelect(...selectedEntity)
    }
  }

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    return (
      <NavigationContext.Provider
        value={{
          selectedId: this.props.entity._id ? this.props.entity._id : '',
          entity: this.props.entity,
          entities: this.props.entities,
          onSelect: this.handleSelect
        }}
      >
        {this.props.children}
      </NavigationContext.Provider>
    )
  }
}

export default NavigationProvider
