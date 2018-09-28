/**
 * @prettier
 * @description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import FormLabel from '@material-ui/core/FormLabel'
import { withStyles } from '@material-ui/core/styles'

// custom component
import MappedFields from './MappedFields'
import Form from '../../providers/context/Form'
import Button from '@material-ui/core/Button/Button'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '744px',
    padding: 24
  }
}

/**
 * SchemaForm component
 * @param classes
 * @returns {*}
 * @constructor
 */
function SchemaForm({ classes }) {
  return (
    <Form.Consumer>
      {({ formLabel, uiModel, entity, onSubmit, onChange }) => {
        return (
          <form className={classes.root} onSubmit={onSubmit}>
            <FormLabel component="legend">{formLabel}</FormLabel>
            <MappedFields uiModel={uiModel} entity={entity} onChange={onChange} />
            <Button type="submit" variant="raised" color="primary">
              Save
            </Button>
          </form>
        )
      }}
    </Form.Consumer>
  )
}

SchemaForm.propTypes = {
  classes: PropTypes.object.isRequired,
  formLabel: PropTypes.string,
  uiModel: PropTypes.object,
  entity: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
}

export default withStyles(styles)(SchemaForm)
