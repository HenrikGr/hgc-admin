/**
 * @prettier
 * @description: ClientToolbarActions component
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import { withStyles } from '@material-ui/core/styles/index'

// custom component
import ClientSecretsDialog from './ClientSecretsDialog'
import ScopeDialog from './ScopeDialog'

const styles = {
  spacer: {
    flex: '1 1 100%'
  }
}

/**
 * ClientToolbarActions - render a material-ui toolbar with different actions component
 * @param classes
 * @param variant
 * @param entity
 * @returns {*}
 * @constructor
 */
function ClientToolbarActions({ classes, variant, entity }) {
  return (
    <Toolbar variant={variant}>
      <div className={classes.spacer} />
      {entity._id ? <ClientSecretsDialog client={entity} /> : null}
      <ScopeDialog />
    </Toolbar>
  )
}

ClientToolbarActions.propTypes = {
  /**
   * Used to style the component
   */
  classes: PropTypes.object.isRequired,
  /**
   * Variant of the material-ui toolbar
   */
  variant: PropTypes.oneOf(['regular', 'dense']),
  /**
   * Data services to be used for the ClientSecretsDialog
   */
  entity: PropTypes.object.isRequired
}

ClientToolbarActions.defaultProps = {
  variant: 'dense'
}

export default withStyles(styles)(ClientToolbarActions)
