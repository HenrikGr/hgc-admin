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
import { SchemaFormContext } from './SchemaFormContext';

/**
 * SchemaFormProvider component
 */
class SchemaFormProvider extends React.Component {

  render() {
    const {
      model,
      uiModel,
      isFetching,
      error,
      onChange,
      onSubmit
    } = this.props;

    return(
      <SchemaFormContext.Provider value={{
        model,
        uiModel,
        isFetching,
        error,
        onChange,
        onSubmit
      }}>
        {this.props.children}
      </SchemaFormContext.Provider>
    )
  }
}

export default SchemaFormProvider;