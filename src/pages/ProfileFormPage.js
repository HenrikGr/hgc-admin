/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Redux & app components
import { connect } from "react-redux";
import ProfileForm from "../components/forms/ProfileForm";

// Session action creators
import { getProfile, updateProfile } from "../modules/state/actions/profile";

// Map session state to props
const mapStateToProps = state => ({
  profile: state.profile
});

// Map session action creators to props
const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => {
      dispatch(getProfile());
    },
    updateProfile: (email, firstName, lastName, phone) => {
      dispatch(updateProfile(email, firstName, lastName, phone));
    }
  };
};

// Inject state and action creators
const ProfileFormPage = connect(mapStateToProps, mapDispatchToProps)(
  ProfileForm
);

// Export the page
export default ProfileFormPage;
