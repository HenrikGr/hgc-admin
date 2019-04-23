/**
 * @prettier
 * @description: ToolbarActions component
 *
 * The component is a toolbar component that can contain different separate
 * actions to be performed such as displaying dialogs, etc.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Paper from '@material-ui/core/Paper/Paper'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import { withStyles } from '@material-ui/core/styles'

// custom component
import ClientSecretsDialog from '../dialogs/ClientSecretsDialog'
import ScopeDialog from '../dialogs/ScopeDialog'

const styles = {
  spacer: {
    flex: '1 1 100%'
  }
}

/**
 * ToolbarActions - render a material-ui toolbar with different actions component
 * @param classes
 * @param variant
 * @param entity
 * @returns {*}
 * @constructor
 */
function ToolbarActions({ classes, variant, entity }) {
  return (
    <Paper square={true}>
      <Toolbar variant={variant}>
        <div className={classes.spacer} />
        {entity._id ? (
          <ClientSecretsDialog
            client={entity}
          />
        ) : null}
        <ScopeDialog />
      </Toolbar>
    </Paper>
  )
}

ToolbarActions.propTypes = {
  /**
   * Used to style the component
   */
  classes : PropTypes.object.isRequired,
  /**
   * Variant of the material-ui toolbar
   */
  variant: PropTypes.oneOf(['regular', 'dense']),
  /**
   * Data services to be used for the ClientSecretsDialog
   */
  entity: PropTypes.object.isRequired,
}

ToolbarActions.defaultProps = {
  variant: 'regular'
}

export default withStyles(styles)(ToolbarActions)
