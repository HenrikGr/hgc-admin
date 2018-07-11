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

// Redux components
import { connect } from "react-redux";

// Presentation layer
import ProfileForm from "../components/forms/ProfileForm";

// Action creators used to update profile state
import profileAction from "../../store/actions/ProfileActions";

// Map state to props
const mapStateToProps = state => ({
  profile: state.profile
});

// Map action creators to props
const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => {
      dispatch(profileAction.getProfile());
    },
    updateProfile: profile => {
      dispatch(profileAction.updateProfile(profile));
    }
  };
};

// Inject state and action creators to presentation layer
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);