/**
 * @prettier
 * @description: Higher Order Component to provide code splitting, i.e asynchronous loading of components.
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// Custom links for use with react router
export const HomeLink = React.forwardRef((props, ref) => <RouterLink to="/" {...props} />)
export const DashboardLink = React.forwardRef((props, ref) => <RouterLink to="/dashboard" {...props} />)
export const LogInLink = React.forwardRef((props, ref) => <RouterLink to="/login" {...props} />)
export const ProfileLink = React.forwardRef((props, ref) => <RouterLink to="/profile" {...props} />)
export const LogOutLink = React.forwardRef((props, ref) => <RouterLink to="/" {...props} />)


export function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
        // See https://github.com/ReactTraining/react-router/issues/6056
        <RouterLink to={to} {...itemProps} innerRef={ref} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

