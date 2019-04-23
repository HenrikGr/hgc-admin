/**
 * @prettier
 * @description: FormActions
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { withStyles } from '@material-ui/core/styles'

// custom component
import SaveButton from '../buttons/SaveButton'
import DeleteButton from '../buttons/DeleteButton'
import ResetButton from '../buttons/ResetButton'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
})

/**
 * Form component
 * @param classes
 * @param entity
 * @param onSubmit
 * @param onRemove
 * @param onReset
 * @returns {*}
 * @constructor
 */
function FormActions({ classes, entity, onSubmit, onRemove, onReset }) {
  const hasEntity = !!entity._id // Control visible buttons based on services exist or not
  return (
    <div className={classes.root}>
      {hasEntity ? (
        <React.Fragment>
          <DeleteButton
            message={'Delete ' + entity.name + ' ?'}
            onClick={onRemove}
          />
          <SaveButton onClick={onSubmit} />
          <ResetButton onClick={onReset} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <SaveButton onClick={onSubmit} />
          <ResetButton onClick={onReset} />
        </React.Fragment>
      )}
    </div>
  )
}

/**
 * Property type check
 * @type {Object}
 */
FormActions.propTypes = {
  /**
   * Classes, can be used to override css styles
   */
  classes: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
}

export default withStyles(styles)(FormActions)
