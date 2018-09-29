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
import SchemaForm from '../components/schemaform/SchemaForm'
import SchemaFormToolbar from '../components/schemaform/SchemaFormToolbar'
import SchemaFormToolbarNavigator from '../components/schemaform/SchemaFormToolbarNavigator'
import SchemaFormProvider from '../providers/SchemaFormProvider'

// Action creators used to update clients store
import clientAction from '../../store/actions/ClientsAction'

// JSON schema service
import clientSchemaService from '../../domain/schemas/Client'

/**
 * Client page component
 */
class ClientPage extends React.Component {
  /**
   * Props API
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
   * Update global state with edited entity
   * @param entity
   */
  handleChange = entity => {
    this.props.updateState(entity)
  }

  /**
   * Create a new or update entity
   * If the entity has an _id prop it should be updated otherwise it is a new entity
   * @param entity
   */
  handleSubmit = entity => {
    if (entity._id) {
      this.props.update(entity._id)
    } else {
      this.props.create(entity)
    }
  }

  /**
   * Remove entity by id
   * @param entity
   */
  handleRemove = entity => {
    this.props.remove(entity._id)
  }

  handleSelect = entity => {
    this.props.setSelected(entity)
  }

  /**
   * Reset selected entity with default entity from provider
   * @param defaultEntity
   */
  handleReset = defaultEntity => {
    this.props.resetSelected(defaultEntity)
  }

  /**
   * Render component
   * @returns {*}
   */
  render() {
    const { selectedId, entity, entities } = this.props
    return (
      <React.Fragment>
        <SchemaFormProvider
          formLabel="Client"
          schema={clientSchemaService.getSchema()}
          selectedId={selectedId}
          entity={entity}
          entities={entities}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onRemove={this.handleRemove}
          onReset={this.handleReset}
          onSelect={this.handleSelect}
        >
          <SchemaFormToolbar>
            <SchemaFormToolbarNavigator />
          </SchemaFormToolbar>
          <SchemaForm />
        </SchemaFormProvider>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  selectedId: state.clients.selectedId,
  entity: state.clients.entity,
  entities: state.clients.entities
})

const mapDispatchToProps = dispatch => {
  return {
    find: qp => {
      dispatch(clientAction.getClients(qp))
    },
    create: entity => {
      dispatch(clientAction.createClient(entity))
    },
    update: id => {
      dispatch(clientAction.updateClientById(id))
    },
    remove: id => {
      dispatch(clientAction.deleteClientById(id))
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
