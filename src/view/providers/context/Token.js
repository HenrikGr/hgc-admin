/**
 * Description: Token context
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";

/**
 * Token context singleton
 */
const Token = React.createContext('token');

// Export auth context
export default Token;