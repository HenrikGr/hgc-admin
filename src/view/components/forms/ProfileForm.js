/**
 * @prettier
 * @description: ProfileForm controlled component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import { withStyles } from '@material-ui/core/styles'
import TextField from '../fields/TextField'

const styles = theme => ({
  root: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 8
  },
  form: {
    display: 'inline-flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    margin: theme.spacing.unit * 3,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '552px'
    }
  },
  button: {
    margin: theme.spacing.unit
  }
})

/**
 * ProfileForm component
 * @param classes
 * @param formLabel
 * @param entity
 * @param disableSubmit
 * @param onChange
 * @param onSubmit
 * @returns {*}
 * @constructor
 */
function ProfileForm({ classes, formLabel, entity, disableSubmit, onChange, onSubmit }) {
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <FormLabel component="legend">{formLabel}</FormLabel>
        <TextField id="email" type="email" label="Email" value={entity.email} onChange={onChange} />
        <TextField id="firstName" label="First name" value={entity.firstName} onChange={onChange} />
        <TextField id="lastName" label="Last name" value={entity.lastName} onChange={onChange} />
        <TextField id="phone" type="tel" label="Phone" value={entity.phone} onChange={onChange} />
        <Button
          disabled={disableSubmit}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Save
        </Button>
      </form>
    </div>
  )
}

/**
 * Property type checks
 * @type {Object}
 */
ProfileForm.propTypes = {
  /**
   * Object to create or extend the styles
   * @private
   */
  classes: PropTypes.object.isRequired,
  /**
   * Form label
   * @public
   */
  formLabel: PropTypes.string.isRequired,
  /**
   * Data entity to be rendered
   * @public
   */
  entity: PropTypes.object.isRequired,
  /**
   * Boolean indicating if submit btn should be disabled
   * @public
   */
  disableSubmit: PropTypes.bool.isRequired,
  /**
   * Callback for input changes
   * @public
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback for form submit
   * @public
   */
  onSubmit: PropTypes.func.isRequired
}

// Inject styles into the form
export default withStyles(styles)(ProfileForm)
