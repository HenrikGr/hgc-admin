/**
 * Description: Container component for the profile page
 *
 * The Profile container components supplies profile state trough props and basic CRUD operations
 * such to retrieve and update profile information.
 *
 * The profile state supplied to the presentation layer can hold the following states;
 * - isFetching, when a remote call to retrieve or update profile data is performed,
 * - error, if remote call or client validation fails.
 * - profile, if remote calls are successful.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2018 HGC AB
 * @license: The MIT License (MIT)
 */

// react & redux
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

// Material-ui
import Grid from '@material-ui/core/Grid';

// Custom components
import ClientToolbar from '../components/Toolbars/ClientToolbar';
import ClientForm from '../components/forms/ClientForm';
import ErrorSnackbar from '../components/error/ErrorSnackbar';

// Action creators used to update clients store
import actions from "../../store/actions/ClientsAction";

/**
 * Client page component
 */
class ClientPage extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Classes, can be used to override css styles
     */
    classes: PropTypes.object,
    /**
     * Data object schema
     */
    schema: PropTypes.object.isRequired,
    /**
     * Default data from schema
     */
    defaultItem: PropTypes.object.isRequired,
    /**
     * Data array
     */
    items: PropTypes.array.isRequired,
    /**
     * Loading indicator
     */
    isFetching: PropTypes.bool.isRequired,
    /**
     * Error object
     */
    error: PropTypes.object.isRequired,
    /**
     * Find method
     */
    find: PropTypes.func.isRequired,
    /**
     * Create method
     */
    create: PropTypes.func.isRequired,
    /**
     * Update method
     */
    update: PropTypes.func.isRequired,
    /**
     * Delete method
     */
    remove: PropTypes.func.isRequired,
    /**
     * Reset error method
     */
    resetError: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.find({page: 0, sort: 'createdAt'});
  }

  state = {
    selectedId: '',
    selectedItem: this.props.defaultItem,
  };

  handleSelect = (event, value) => {
    const selectedItem = this.props.items.filter(item => ( item._id === value));
    this.setState({
      selectedId: value,
      selectedItem: selectedItem[0],
    });
  };

  handleChange = (prop, value) => {
    let selectedItem = {...this.state.selectedItem};
    selectedItem[prop] = value;
    this.setState({ selectedItem });
  };

  handleReset = () => {
    const { defaultItem } = this.props;
    this.setState({ selectedId: '', selectedItem: Object.assign({}, defaultItem)});
  };

  handleCreate = () => {
    this.props.create(this.state.selectedItem)
  };

  handleUpdate = () => {
    this.props.update(this.state.selectedId, this.state.selectedItem)
  };

  handleRemove = id => {

  };

  handleResetError = () => {
    this.props.resetError();
  };

  render() {
    const { schema, defaultItem, items, isFetching, error } = this.props;
    const { selectedItem, selectedId } = this.state;

    return(
      <Grid container spacing={ 0 }>

        <Grid item xs={ 12 }>

          <ErrorSnackbar
            error={ error }
            onResetError={ this.handleResetError }
          />

          <ClientToolbar
            title="Clients"
            items={ items }
            selectedId={ selectedId }
            onSelect={ this.handleSelect }
          />

          <ClientForm
            formLabel="Client"
            schema={ schema }
            defaultItem={ defaultItem }
            isFetching={ isFetching }
            selectedItem={ selectedItem }
            selectedId={ selectedId }
            onChange={ this.handleChange }
            onReset={ this.handleReset }
            onCreate={ this.handleCreate }
            onUpdate={ this.handleUpdate }
            onRemove={ this.handleRemove }
          />

        </Grid>

      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  schema: state.clients.schema,
  defaultItem: state.clients.defaultClient,
  items: state.clients.docs,
  isFetching: state.clients.isFetching,
  error: state.clients.error,
});

const mapDispatchToProps = dispatch => {
  return {
    find: qp => {
      dispatch(actions.getClients(qp));
    },
    create: data => {
      dispatch(actions.createClient(data));
    },
    update: (id, data) => {
      dispatch(actions.updateClientById(id, data));
    },
    remove: id => {
      dispatch(actions.deleteClientById(id));
    },
    resetError: () => {
      dispatch(actions.resetError());
    }
  };
};

// Inject state and action creators to presentation layer
export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);





