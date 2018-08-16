/**
 * Description: ProfileForm component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";

// Material-ui
import { withStyles } from "@material-ui/core/styles";

import { SchemaFormContext } from './SchemaFormContext';
import FieldRender from './FieldRender'
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  formWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  progress: {
    flexGrow: 1,
    height: "5px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "80px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "552px"
    }
  },
  button: {
    margin: theme.spacing.unit
  }
});

/**
 * ProfileForm
 */
class ProfileForm extends React.Component {

  render() {
    const { classes } = this.props;

    return(
      <SchemaFormContext.Consumer>
        {({model, uiModel, isFetching, error, onChange, onSubmit}) => (
          <div className={ classes.root }>
            <div className={ classes.progress }>
              { isFetching ? <LinearProgress color="secondary" /> : null}
            </div>
            <div className={ classes.formWrapper }>
              <form className={ classes.form }>

                <FieldRender
                  model={model}
                  uiModel={uiModel}
                  error={error}
                  onChange={onChange}
                />

                <Button
                  disabled={ isFetching }
                  type="submit"
                  variant="raised"
                  color="primary"
                  className={ classes.button }
                  onClick={onSubmit}
                >
                  Save
                </Button>

              </form>
            </div>
          </div>
        )}
      </SchemaFormContext.Consumer>
    )
  }
}

export default withStyles(styles)(ProfileForm);