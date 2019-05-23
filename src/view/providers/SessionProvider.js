/**
 * @prettier
 * @description: SessionProvider
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// SessionEntityMgr context
import Session from './context/Session'

// SessionEntityMgr action creators
import { refreshSession, logIn, logOut } from '../../store/actions/SessionActions'

/**
 * SessionProvider component
 * @param {React.Props} props - component properties
 * @param {SessionEntity} props.session - session state entity
 * @param {Function} props.refreshSession - refresh user session action creator
 * @param {Function} props.logIn - log in user action creator
 * @param {Function} props.logOut - log out user action creator
 * @param {React.Children} props.children - children components
 * @returns {React.Context.Provider}
 * @constructor
 */
function SessionProvider({ session, refreshSession, logIn, logOut, children }) {
  return (
    <Session.Provider
      value={{
        ...session,
        logIn: logIn,
        refreshSession: refreshSession,
        logOut: logOut
      }}
    >
      {children}
    </Session.Provider>
  )
}

/**
 * Component properties type check
 */
SessionProvider.propTypes = {
  session: PropTypes.shape({
    isAuth: PropTypes.bool.isRequired,
    expires_in: PropTypes.number.isRequired,
    expiresAt: PropTypes.instanceOf(Date)
  }),
  logIn: PropTypes.func.isRequired,
  refreshSession: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
}

/**
 * Map session entity state to props
 * @param {State} state - Global state tree
 * @returns {{SessionEntity}}
 */
const mapStateToProps = state => ({ session: state.session })

/**
 * Map session actions to component properties
 * @param {Function} dispatch - action creator dispatcher
 * @returns {{refreshSession: (function(): *), logIn: (function(*=): *), logOut: (function(): *)}}
 */
const mapDispatchToProps = dispatch => {
  return {
    refreshSession: () => dispatch(refreshSession()),
    logIn: credentials => dispatch(logIn(credentials)),
    logOut: () => dispatch(logOut())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionProvider)
