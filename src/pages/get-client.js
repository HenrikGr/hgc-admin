/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 *
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */
import { connect } from 'react-redux'
import { setClient } from "../modules/state/actions";
import GetClientForm from '../components/forms/get-client'

// Map state to props
const mapStateToProps = (state) => ({
  client: state.client,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setClient: (client) => {
      dispatch(setClient(client));
    }
  }
};

// Bind state and dispatch action to component.
const GetClientPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetClientForm);

export default GetClientPage;
