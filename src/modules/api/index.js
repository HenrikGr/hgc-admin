/**
 * Description: API module
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

import { authenticate, getMe, refreshToken } from "./auth";
import { createClient, getClientByName } from "./client";
import { createUser } from "./users";

// Export the whole API
const API = {
  authenticate,
  getMe,
  refreshToken,
  createUser,
  createClient,
  getClientByName,
};

export default API;