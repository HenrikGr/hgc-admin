/**
 * @prettier
 * @description: Container component for the client page
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2018 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Custom components
import Form from '../components/schemaform/Form'
import TabsNavigator from '../components/navigator/TabsNavigator'
import ToolbarActions from '../components/toolbars/ToolbarActions'

// context providers
import FormProvider from '../providers/FormProvider'
import NavigationProvider from '../providers/NavigationProvider'

// Action creators used to update clients store
import clientAction from '../../store/actions/ClientsAction'

// JSON schema service
import clientSchemaService from '../../domain/schemas/Client'

/**
 * Client page component
 */
class ClientPage extends React.PureComponent {
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
     * Find entities function
     */
    find: PropTypes.func.isRequired,
    /**
     * Create method
     */
    create: PropTypes.func.isRequired,
    /**
     * Update entity function
     */
    update: PropTypes.func.isRequired,
    /**
     * Remove entity function
     */
    remove: PropTypes.func.isRequired,
    /**
     * Set selected data
     */
    setSelected: PropTypes.func.isRequired,
    /**
     * Update selected data
     */
    updateState: PropTypes.func.isRequired,
    /**
     * Reset selected data
     */
    resetSelected: PropTypes.func.isRequired
  }

  /**
   * Fetch entities by query params
   */
  componentDidMount() {
    this.props.find({ page: 0, sort: 'name' })
  }

  /**
   * Update global state
   * @param prop
   * @param value
   */
  handleChange = (prop, value) => {
    let entity = { ...this.props.entity }
    entity[prop] = value
    this.props.updateState(entity)
  }

  /**
   * Create a new or update entity
   * If the entity has an _id prop it should be updated otherwise it is a new entity
   */
  handleSubmit = () => {
    if (this.props.entity._id) {
      this.props.update()
    } else {
      this.props.create()
    }
  }

  /**
   * Reset selected entity with default entity from provider
   * @param defaultEntity
   */
  handleReset = defaultEntity => {
    this.props.resetSelected(defaultEntity)
  }

  /**
   * Remove entity
   */
  handleRemove = () => {
    this.props.remove()
  }

  /**
   * Render component
   * @returns {*}
   */
  render() {
    const { selectedId, entity, entities } = this.props

    return (
      <React.Fragment>
        <NavigationProvider
          selectedId={selectedId}
          entity={entity}
          entities={entities}
          onSelect={this.props.setSelected}
        >
          <TabsNavigator variant="dense" />
        </NavigationProvider>

        <ToolbarActions entity={entity}/>

        <FormProvider
          formLabel="Client"
          entity={entity}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onRemove={this.handleRemove}
          onReset={this.handleReset}
          schema={clientSchemaService.getSchema()}
        >
          <Form />
        </FormProvider>
      </React.Fragment>
    )
  }
}

/**
 * Map state to properties
 * @param state
 * @returns {Object}
 */
const mapStateToProps = state => ({
  selectedId: state.clients.selectedId,
  entity: state.clients.entity,
  entities: state.clients.entities
})

/**
 * Map action creators to properties
 * @param dispatch
 * @returns {Object}
 */
const mapDispatchToProps = dispatch => {
  return {
    find: qp => {
      dispatch(clientAction.find(qp))
    },
    create: () => {
      dispatch(clientAction.create())
    },
    update: () => {
      dispatch(clientAction.update())
    },
    remove: () => {
      dispatch(clientAction.remove())
    },
    setSelected: entry => {
      dispatch(clientAction.setSelected(entry))
    },
    updateState: entity => {
      dispatch(clientAction.updateState(entity))
    },
    resetSelected: defaultEntity => {
      dispatch(clientAction.resetSelected(defaultEntity))
    }
  }
}

// Inject state and action creators to presentation layer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientPage)
