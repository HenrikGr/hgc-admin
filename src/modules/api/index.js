/**
 * Description: API module
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

import { getAccessToken, refreshAccessToken } from "./auth";
import { getProfile, updateProfile } from "./profile";

// Export the whole API
const API = {
  getAccessToken,
  refreshAccessToken,
  getProfile,
  updateProfile
};

export default API;
