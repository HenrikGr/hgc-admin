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

// Custom components
import TextField from '../components/fields/TextField';

/**
 * FieldRender component
 * @param model
 * @param uiModel
 * @param error
 * @param onChange
 * @returns {Array}
 * @constructor
 */
function FieldRender({ model, uiModel, error, onChange }) {
  let fields = [];

  Object.keys(uiModel).forEach(key => {
    fields.push(<TextField
      key={key}
      id={key}
      value={model[key]}
      label={uiModel[key].label}
      error={error}
      onChange={onChange}
    />);
  });

  return fields;
}

export default FieldRender;