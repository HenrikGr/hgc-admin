/**
 * Description: Page not found component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { Link } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "80px"
  },
  card: {
    maxWidth: 600
  },
  media: {
    height: 260
  }
};

/**
 * NotFoundPage component
 * @param props
 * @returns {*}
 * @constructor
 */
function NotFoundPage(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/404.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="headline" component="h2">
            Ooops!
          </Typography>
          <Typography component="p">
            That is not an available resource.
          </Typography>
          <Typography component="p">
            Click the back button to continue.
          </Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to="/" size="small" color="primary">
            Back
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

NotFoundPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFoundPage);
