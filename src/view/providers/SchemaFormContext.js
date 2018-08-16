/**
 * Description: SchemaFormContext component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";

export const schemaCtx = {
  model: {},
  uiModel: {},
  error: {},
  onChange: () => {},
  onSubmit: () => {},
  onReset: () => {}
};

export const SchemaFormContext = React.createContext(schemaCtx);