/**
 * Description: User context
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";

/**
 * User singleton
 */
const User = React.createContext(null);

// Export auth context
export default User;