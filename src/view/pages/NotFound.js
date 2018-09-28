/**
 * @prettier
 * @description: Page not found component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import NotFoundImage from '../../../src/404.jpg'
import { DashboardLink } from '../components/links'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '80px'
  },
  card: {
    width: 800
  },
  media: {
    height: 400
  }
}

/**
 * NotFoundPage component
 * @param props
 * @returns {*}
 * @constructor
 */
function NotFoundPage(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={NotFoundImage} title="Contemplative Reptile" />
        <CardContent>
          <Typography variant="headline" component="h2">
            Ooops!
          </Typography>
          <Typography component="p">That is not an available resource.</Typography>
          <Typography component="p">Click the back button to continue.</Typography>
        </CardContent>
        <CardActions>
          <Button component={DashboardLink} size="small" color="primary">
            Back
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

/**
 * Property type check
 * @type {Object}
 * @public
 */
NotFoundPage.propTypes = {
  /**
   * Classes to extend the style of the component
   */
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotFoundPage)
