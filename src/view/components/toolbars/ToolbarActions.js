/**
 * @prettier
 * @description: ToolbarActions
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
import DisplaySecretsDialog from '../dialogs/DisplaySecretsDialog'

// API service
import clientAPI from '../../../domain/service/Client'

const styles = {
  spacer: {
    flex: '1 1 100%'
  }
}

/**
 * ToolbarActions
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
          <DisplaySecretsDialog
            entity={entity}
            getSecrets={clientAPI.findSecretsByName}
            generateSecrets={clientAPI.generateSecretsByName}
          />
        ) : null}
      </Toolbar>
    </Paper>
  )
}

ToolbarActions.propTypes = {
  variant: PropTypes.string
}

ToolbarActions.defaultProps = {
  variant: 'regular'
}

export default withStyles(styles)(ToolbarActions)
